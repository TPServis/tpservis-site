import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'
import { Inter } from 'next/font/google'
import React from 'react'
import { cn } from 'src/utilities/cn'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { AdminBar } from '@/components/AdminBar'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ReactQueryProvider } from '@/components/Providers/ReactQueryProvider'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
})

import './globals.css'
import SiteClosed from '@/components/closed'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(inter.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>

      <body className="bg-background transition duration-[1s]">
        <ReactQueryProvider>
          <Toaster className="z-1000" />
          <Providers>
            {process.env.NEXT_PUBLIC_ENABLE_ADMIN_BAR !== 'false' && (
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
            )}
            {isEnabled && <LivePreviewListener />}

            {/* <Header /> */}
            <SiteClosed />
            {/* {children} */}
            {/* <Footer /> */}
          </Providers>
          <Analytics />
          <SpeedInsights />
        </ReactQueryProvider>
      </body>
    </html >
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://tpservise.com'),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@tymofyeyev',
  },
}
