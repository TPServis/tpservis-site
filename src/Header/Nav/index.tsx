'use client'

import { cn } from '@/utilities/cn'
import { useState, useEffect, useRef } from 'react'
import useTheme from '@/hooks/useTheme'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

import { Menu, X } from 'lucide-react'

import { motion, AnimatePresence, delay } from 'motion/react'

// Utility function to get all focusable elements within a container
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  return Array.from(focusableElements)
}

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const scrollBarWidth = useRef(0)
  const menuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const lastActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!window) return

    scrollBarWidth.current = window.innerWidth - document.body.clientWidth

    if (menuIsOpen) {
      document.body.style.overflow = 'hidden'
      lastActiveElement.current = document.activeElement as HTMLElement
      // Focus the first focusable element in the menu after animation
      setTimeout(() => {
        if (menuRef.current) {
          const focusableElements = getFocusableElements(menuRef.current)
          if (focusableElements.length > 0) {
            focusableElements[0].focus()
          }
        }
      }, 100)
    } else {
      document.body.style.overflow = 'auto'
      // Return focus to the menu button when closing
      if (lastActiveElement.current) {
        lastActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuIsOpen])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!menuIsOpen) return

    if (e.key === 'Escape') {
      e.preventDefault()
      setMenuIsOpen(false)
      return
    }

    if (e.key === 'Tab' && menuRef.current) {
      const focusableElements = getFocusableElements(menuRef.current)
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey) {
        // If shift + tab and on first element, move to last element
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        // If tab and on last element, move to first element
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }
  }

  return (
    <nav
      className="relative"
      {...(menuIsOpen ? { 'data-open': true } : {})}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={menuButtonRef}
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className={cn(
          'bg-jaffa-400 p-4 rounded-full transition shadow-lg hover:scale-105 hover:shadow-xl',
          {
            'bg-shark-200': menuIsOpen,
          },
        )}
        aria-expanded={menuIsOpen}
        aria-controls="navigation-menu"
        aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
      >
        {menuIsOpen ? (
          <X className="w-6 h-6 text-shark-900" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>
      <AnimatePresence>
        {menuIsOpen && (
          <MenuWindow ref={menuRef} navItems={navItems} closeMenu={() => setMenuIsOpen(false)} />
        )}
      </AnimatePresence>
    </nav>
  )
}

type MenuWindowProps = {
  navItems: HeaderType['navItems']
  closeMenu: () => void
}

const MenuWindow = React.forwardRef<HTMLDivElement, MenuWindowProps>(
  ({ navItems, closeMenu }, ref) => {
    const { setTheme } = useTheme()

    const handleNavigation = () => {
      closeMenu()
      setTheme('light')
    }

    return (
      <motion.div
        ref={ref}
        id="navigation-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
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
      >
        <div className="container-wrapper grid grid-cols-5 h-full">
          <ul
            className="col-span-3 flex flex-col md:gap-12 gap-4 justify-center h-full"
            role="menu"
          >
            {navItems?.map(({ link }, i) => {
              return (
                <motion.li
                  key={i}
                  role="menuitem"
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
  },
)

MenuWindow.displayName = 'MenuWindow'

{
  /* <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link> */
}
