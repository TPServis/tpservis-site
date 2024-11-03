'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { use, useEffect } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import HeroFloating from '@/heros/HeroFloating'

import type { Page } from '@/payload-types'

import { useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef } from 'react'

export const HighImpactHero: React.FC<Page['hero']> = ({
  preTitle,
  title,
  subtitle,
  cta,
  mediaGroup,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  useEffect(() => {
    // setHeaderTheme('dark')
    mediaGroup
  })

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value < 0.7) {
      console.log('value is less than 0.5')
      // update the --color-background to white
      document.documentElement.style.setProperty('--color-background', 'var(--color-astral-100)')
    } else {
      console.log('value is greater than 0.5')
      // update the --color-background to black
      document.documentElement.style.setProperty('--color-background', 'var(--color-white)')
    }
  })

  return (
    <div
      className="min-h-screen w-full  container-spacing overflow-hidden flex items-center !py-0"
      ref={ref}
    >
      <div className="container-wrapper grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
        <div className="flex flex-col justify-center h-full md:col-span-3 relative z-10 md:z-0 h-screen">
          <h1 className="md:text-sm text-xs uppercase pb-6">{preTitle}</h1>
          <h2 className="text-2xl sm:text-4xl md:text-7xl font-bold text-heading text-pretty md:pb-9 pb-4">
            {title}
          </h2>
          <p className="text-shark-500 text-lg md:text-2xl md:pb-16 pb-8 text-balance md:w-[80%]">
            {subtitle}
          </p>
          {cta && cta.label && cta.url && (
            <a
              href={cta.url}
              className="items-center gap-4 group hover:gap-6 transition-all duration-300 flex"
            >
              <span className="text-xl rounded-full p-4 md:p-7 bg-jaffa-400 text-white group-hover:scale-110 transition-all duration-300">
                <FaArrowRightLong className="-rotate-45 w-5 h-5 group-hover:rotate-0 transition-all duration-300" />
              </span>
              <span className="text-xl font-semibold text-astral-900">{cta.label}</span>
            </a>
          )}
        </div>
        <HeroFloating mediaGroup={mediaGroup} />
      </div>
    </div>
  )
}
