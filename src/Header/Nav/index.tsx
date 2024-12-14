'use client'

import { cn } from '@/utilities/cn'
import { useState } from 'react'
import useTheme from '@/hooks/useTheme'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import { Menu, X } from 'lucide-react'

import { motion, AnimatePresence, delay } from 'motion/react'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  const [menuIsOpen, setMenuIsOpen] = useState(false)

  React.useEffect(() => {
    if (menuIsOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuIsOpen])

  return (
    <nav
      className="relative"
      {...(menuIsOpen ? { 'data-open': true } : {})}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setMenuIsOpen(false)
      }}
    >
      <button
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className={cn(
          'bg-jaffa-400 p-4 rounded-full transition shadow-lg hover:scale-105 hover:shadow-xl',
          {
            'bg-shark-200': menuIsOpen,
          },
        )}
      >
        {menuIsOpen ? (
          <X className="w-6 h-6 text-shark-900" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
      <AnimatePresence>
        {menuIsOpen && <MenuWindow navItems={navItems} closeMenu={() => setMenuIsOpen(false)} />}
      </AnimatePresence>
    </nav>
  )
}

type MenuWindowProps = {
  navItems: HeaderType['navItems']
  closeMenu: () => void
}

const MenuWindow = ({ navItems, closeMenu }: MenuWindowProps) => {
  const { setTheme } = useTheme()

  const handleNavigation = () => {
    closeMenu()
    setTheme('light')
  }

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      animate={{
        opacity: 1,
        backdropFilter: 'blur(10px)',
        transition: { duration: 0.5, ease: 'circInOut' },
      }}
      exit={{
        opacity: 0,
        backdropFilter: 'blur(0px)',
        transition: { duration: 0.5, delay: 0.1 * (navItems?.length || 0) },
      }}
      className="fixed top-0 pt-[100px] left-0 w-full h-full bg-white/90 backdrop-blur-lg -z-10 container-spacing"
      onKeyDown={(e) => {
        if (e.key === 'Escape') closeMenu()
      }}
    >
      <div className="container-wrapper grid grid-cols-5 h-full">
        <ul className="col-span-3 flex flex-col md:gap-12 gap-4 justify-center h-full">
          {navItems?.map(({ link }, i) => {
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1 + 0.3,
                  ease: 'backOut',
                }}
                exit={{
                  opacity: 0,
                  y: 40,
                  filter: 'blur(10px)',
                  transition: { duration: 0.2, delay: -0.1 * i, ease: 'easeInOut' },
                }}
                onClick={handleNavigation}
              >
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-4xl md:text-6xl lg:text-6xl font-bold text-astral-950 hover:text-jaffa-400 transition duration-100 hover:!no-underline"
                />
              </motion.li>
            )
          })}
        </ul>
      </div>
    </motion.div>
  )
}

{
  /* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */
}
