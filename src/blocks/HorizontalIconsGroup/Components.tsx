'use client'

import { Award, ChevronLeft, ChevronRight, CircleUser, Shield } from 'lucide-react'
import React, { useCallback, useEffect, useState, useRef } from 'react'

import useEmblaCarousel from 'embla-carousel-react'

import { cn } from '@/utilities/cn'

import RichText from '@/components/RichText'
import { useCarousel } from '@/hooks/useCarousel'

interface HorizontalIconsGroupProps {
  pretitle: string
  title: string
  items: {
    icon: string
    title: string
    description: any
  }[]
}

export const HorizontalIconsGroup = (props: HorizontalIconsGroupProps) => {
  const {
    emblaRef,
    containerRef,
    selectedIndex,
    scrollSnaps,
    canScrollPrev,
    canScrollNext,
    isMobile,
    scrollTo,
    scrollPrev,
    scrollNext,
  } = useCarousel()

  return (
    <div ref={containerRef}>
      <div className="w-full container-spacing !pb-0 md:!pb-16">
        <div className="container-wrapper">
          {props.pretitle && (
            <h3 className="text-sm font-bold text-shark-400 pb-6 uppercase">{props.pretitle}</h3>
          )}
          {props.title && (
            <h2 className="md:text-6xl text-3xl font-bold text-heading pb-16">{props.title}</h2>
          )}
          <div className=" grid-cols-3 gap-16 hidden md:grid">
            {props.items &&
              props.items.map((item, index) => (
                <HomeWhyUsItem
                  key={index}
                  title={item.title}
                  description={item.description}
                  icon={
                    item.icon === 'MdSupportAgent' ? (
                      <Award className="w-6 h-6" />
                    ) : item.icon === 'BsPersonBoundingBox' ? (
                      <CircleUser className="w-6 h-6" />
                    ) : (
                      <Shield className="w-6 h-6" />
                    )
                  }
                />
              ))}
          </div>
        </div>
      </div>
      <div className="md:hidden pb-24 relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="flex embla__container">
            {props.items.map((item, index) => (
              <div key={index} className="px-8 w-[100vw] embla__slide shrink-0">
                <HomeWhyUsItem
                  {...item}
                  align="center"
                  icon={
                    item.icon === 'MdSupportAgent' ? (
                      <Award className="w-6 h-6" />
                    ) : item.icon === 'BsPersonBoundingBox' ? (
                      <CircleUser className="w-6 h-6" />
                    ) : (
                      <Shield className="w-6 h-6" />
                    )
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300',
            canScrollPrev
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-4 pointer-events-none',
          )}
        >
          <button
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            onClick={scrollPrev}
          >
            <ChevronLeft className="w-6 h-6 text-shark-500" />
          </button>
        </div>
        <div
          className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 transition-all duration-300',
            canScrollNext
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-4 pointer-events-none',
          )}
        >
          <button
            className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
            onClick={scrollNext}
          >
            <ChevronRight className="w-6 h-6 text-shark-500" />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-300',
                index === selectedIndex ? 'bg-jaffa-400 w-6' : 'bg-shark-200 hover:bg-shark-300',
              )}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

type HomeWhyUsItemProps = {
  title: string
  description: Record<string, any>
  icon: React.ReactNode
  className?: string
  align?: 'left' | 'center'
}

const HomeWhyUsItem = (props: HomeWhyUsItemProps) => {
  return (
    <div
      className={cn(
        'md:border-l-2 border-shark-100 md:pl-10 py-4 md:py-10',
        props.className,
        props.align === 'center' && 'flex flex-col items-center',
      )}
    >
      <div className="bg-jaffa-400 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mb-4 md:mb-12 shadow-lg shadow-jaffa-400/50">
        {props.icon}
      </div>
      <h3 className="text-2xl font-bold text-astral-900 pb-6">{props.title}</h3>
      <RichText
        content={props.description}
        enableGutter={false}
        className={cn(
          'text-lg text-shark-500 text-balance',
          props.align === 'center' && 'text-center',
        )}
      />
    </div>
  )
}
