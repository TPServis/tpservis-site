'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useRef } from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const refreshTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  const debouncedRefresh = useCallback(() => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current)
    }
    refreshTimeout.current = setTimeout(() => {
      router.refresh()
    }, 300)
  }, [router])

  return (
    <PayloadLivePreview
      refresh={debouncedRefresh}
      serverURL={process.env.NEXT_PUBLIC_SERVER_URL!}
    />
  )
}
