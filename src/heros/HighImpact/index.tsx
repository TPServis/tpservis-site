'use client'
import HeroFloating from '@/heros/HeroFloating'
import { ArrowRight } from 'lucide-react'
import { useEffect } from 'react'

import type { Page } from '@/payload-types'

import useTheme from '@/hooks/useTheme'

import { useMotionValueEvent, useScroll } from 'motion/react'
import { useRef } from 'react'

export const HighImpactHero: React.FC<Page['hero']> = ({
  preTitle,
  title,
  subtitle,
  cta,
  mediaGroup,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const { theme, setTheme } = useTheme()

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setTheme(value > 0.8 ? 'light' : 'blue')
  })

  useEffect(() => {
    return () => {
      setTheme('blue')
    }
  }, [setTheme])

  return (
    <div
      className="w-full container-spacing overflow-x-hidden !py-0 min-h-screen md:flex items-center"
      ref={ref}
    >
      <div className="container-wrapper flex flex-col md:flex-row gap-8 md:gap-10 justify-start ">
        <div className="flex flex-col justify-center md:col-span-3 relative z-10 md:z-0 md:w-1/2 mt-30 min-h-[50vh]">
          <h1 className="md:text-sm text-xs uppercase pb-6">{preTitle}</h1>
          <h2 className="text-4xl md:text-7xl font-bold text-heading text-pretty md:pb-9 pb-4">
            {title}
          </h2>
          <p className="text-shark-500 text-lg md:text-2xl md:pb-16 pb-8 text-balance md:w-[80%]">
            {subtitle}
          </p>
          {cta?.label && cta.url && (
            <a
              href={cta.url}
              className="items-center gap-4 group hover:gap-6 transition-all duration-300 flex"
            >
              <span className="text-xl rounded-full p-4 md:p-7 bg-jaffa-400 text-white group-hover:scale-110 transition-all duration-300">
                <ArrowRight className="-rotate-45 w-5 h-5 group-hover:rotate-0 transition-all duration-300" />
              </span>
              <span className="text-xl font-semibold text-astral-900">{cta.label}</span>
            </a>
          )}
        </div>
        <HeroFloating mediaGroup={mediaGroup as any} />
      </div>
    </div>
  )
}
