'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link.js'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { cn } from '@/utilities/cn'
import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [isShown, setIsShown] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const THRESHOLD = 100
    let lastScrollTop = 0
    window.addEventListener('scroll', (e) => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      if (scrollTop <= 0) {
        setIsShown(true)
        return
      }

      if (scrollTop > lastScrollTop) {
        setIsShown(false)
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
      } else if (scrollTop < lastScrollTop - THRESHOLD) {
        setIsShown(true)
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
      }
    })
  }, [])

  return (
    <header
      className={cn(
        'w-full container-spacing z-20 sticky top-0 !py-0 -mb-[120px] transition-all duration-300 ',
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-background/5 backdrop-blur-md transition duration-300 -z-[1]',
          {
            'backdrop-blur-none opacity-0': !isShown,
          },
        )}
      />
      <div className="container-wrapper flex justify-between items-center md:py-5 py-3">
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: isShown ? 0 : -100, opacity: isShown ? 1 : 0 }}
        >
          <Link href="/">
            <Logo className="text-astral-600 text-xl md:text-3xl" />
          </Link>
        </motion.div>
        <HeaderNav header={header} />
      </div>
    </header>
  )
}
