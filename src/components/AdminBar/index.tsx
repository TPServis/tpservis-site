'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/utilities/cn'
import { usePathname, useSelectedLayoutSegments } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { PayloadAdminBar } from 'payload-admin-bar'
import React, { useState, useCallback, useRef, useEffect } from 'react'

import './index.scss'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = collectionLabels?.[segments?.[1]] ? segments?.[1] : 'pages'
  const router = useRouter()
  const pathname = usePathname()
  const refreshTimeout = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastRefreshPath = useRef<string>(pathname)
  const isRefreshing = useRef<boolean>(false)

  const onAuthChange = useCallback((user) => {
    setShow(user?.id)
  }, [])

  const debouncedRefresh = useCallback(() => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current)
    }
    if (isRefreshing.current) return

    refreshTimeout.current = setTimeout(() => {
      // Only refresh if we're still on the same path
      if (pathname === lastRefreshPath.current) {
        isRefreshing.current = true
        router.refresh()
        // Reset the refreshing flag after a delay
        setTimeout(() => {
          isRefreshing.current = false
        }, 2000)
      }
    }, 1000)
  }, [router, pathname])

  // Update lastRefreshPath when pathname changes
  useEffect(() => {
    lastRefreshPath.current = pathname
  }, [pathname])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={process.env.NEXT_PUBLIC_SERVER_URL}
          collection={collection}
          collectionLabels={{
            plural: collectionLabels[collection]?.plural || 'Pages',
            singular: collectionLabels[collection]?.singular || 'Page',
          }}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={async () => {
            await fetch('/next/exit-preview')
            router.push('/')
            debouncedRefresh()
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}
