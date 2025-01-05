'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link.js'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/utilities/cn'
import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const [isShown, setIsShown] = useState(true)
  const pathname = usePathname()
  const lastPathRef = useRef(pathname)

  useEffect(() => {
    if (pathname !== lastPathRef.current) {
      lastPathRef.current = pathname
      setHeaderTheme(null)
    }
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme !== theme && headerTheme !== undefined) {
      setTheme(headerTheme)
    }
  }, [headerTheme, theme])

  const handleScroll = useCallback(() => {
    const THRESHOLD = 100
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop <= 0) {
      setIsShown(true)
      return
    }

    const lastScrollTop = Number(document.documentElement.getAttribute('data-last-scroll') || '0')

    if (scrollTop > lastScrollTop) {
      setIsShown(false)
    } else if (scrollTop < lastScrollTop - THRESHOLD) {
      setIsShown(true)
    }

    document.documentElement.setAttribute(
      'data-last-scroll',
      String(scrollTop <= 0 ? 0 : scrollTop),
    )
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

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
