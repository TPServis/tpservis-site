'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import HeroFloating from '@/heros/HeroFloating'

import type { Page } from '@/payload-types'

export const HighImpactHero: React.FC<Page['hero']> = ({
  preTitle,
  title,
  subtitle,
  cta,
  mediaGroup,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    // setHeaderTheme('dark')
    mediaGroup
  })

  return (
    <div className="h-screen w-full bg-astral-50 container-spacing overflow-hidden flex items-center !py-0">
      <div className="container-wrapper grid grid-cols-5">
        <div className="flex flex-col justify-center h-full col-span-3">
          <h1 className="text-sm uppercase pb-6">{preTitle}</h1>
          <h2 className=" text-7xl font-bold text-astral-900 text-balance pb-9">{title}</h2>
          <p className="text-shark-500 text-2xl pb-16 ">{subtitle}</p>
          {cta && cta.label && cta.url && (
            <a
              href={cta.url}
              className="flex items-center gap-4 group hover:gap-6 transition-all duration-300"
            >
              <span className="text-xl rounded-full p-7 bg-jaffa-400 text-white group-hover:scale-110 transition-all duration-300">
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
