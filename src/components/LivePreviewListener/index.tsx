'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter, usePathname } from 'next/navigation'
import React, { useCallback, useRef, useEffect } from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const refreshTimeout = useRef<NodeJS.Timeout | undefined>(undefined)
  const lastRefreshPath = useRef<string>(pathname)

  const debouncedRefresh = useCallback(() => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current)
    }

    refreshTimeout.current = setTimeout(() => {
      // Only refresh if we're still on the same path
      if (pathname === lastRefreshPath.current) {
        router.refresh()
      }
    }, 1000) // Increased debounce time to 1 second
  }, [router, pathname])

  // Update lastRefreshPath when pathname changes
  useEffect(() => {
    lastRefreshPath.current = pathname
  }, [pathname])

  return process.env.NEXT_PUBLIC_ENABLE_ADMIN_BAR !== 'false' ? (
    <PayloadLivePreview
      refresh={debouncedRefresh}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL!}
    />
  ) : null
}
