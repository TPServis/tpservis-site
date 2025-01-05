'use client'

import NextImage from 'next/image'
import { useCallback, useEffect, useState, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'

import type { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'

import RichText from '@/components/RichText'

const glowKeyframes = `
  @keyframes glow {
    0% {
      opacity: 0.4;
      transform: scale(2.5) translateX(0);
    }
    100% {
      opacity: 0.6;
      transform: scale(3) translateX(5px);
    }
  }
`

type Bento4x4Props = {
  title: string
  cards: {
    image: Media
    title: string
    description: any
  }[]
}

type HomeDocumentsItemProps = {
  title: string
  description: any
  image: Media
  className?: string
}

const HomeDocumentsItem = (props: HomeDocumentsItemProps) => {
  const cls = 'bg-astral-700 rounded-3xl p-5 col-span-1 row-span-2 group ' + props.className

  return (
    <div className={cls}>
      <div className="rounded-lg overflow-hidden aspect-[2/1] mb-4">
        <NextImage
          src={props.image.url || ''}
          alt={props.title}
          width={800}
          height={500}
          sizes="20vw"
          priority={false}
          quality={60}
          className="h-full object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <h3 className="text-2xl font-bold text-astral-50 pb-2">{props.title}</h3>
      <RichText
        className="text-lg text-astral-200 pb-2 text-balance"
        content={props.description}
        enableGutter={false}
      />
    </div>
  )
}

const HomeDocumentsItemSmall = (props: HomeDocumentsItemProps) => {
  const cls =
    'bg-astral-700 rounded-3xl p-5 col-span-1 row-span-1 flex justify-between group ' +
    props.className

  return (
    <div className={cls}>
      <div className="">
        <h3 className="text-2xl font-bold text-astral-50 pb-2">{props.title}</h3>
        <RichText
          className="text-lg text-astral-200 pb-2 text-balance"
          content={props.description}
          enableGutter={false}
        />
      </div>
      <div className="rounded-lg h-full overflow-hidden">
        <NextImage
          src={props.image.url || ''}
          alt={props.title}
          width={200}
          height={200}
          sizes="20vw"
          priority={false}
          quality={50}
          className="h-full object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  )
}

export const Bento4x4 = (props: Bento4x4Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const prevIndex = useRef<number>(0)

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    prevIndex.current = selectedIndex
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi, selectedIndex])

  // Reset carousel when switching between mobile and desktop
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const isCurrentlyMobile = window.matchMedia('(max-width: 768px)').matches
        if (isCurrentlyMobile !== isMobile) {
          setIsMobile(isCurrentlyMobile)
          if (emblaApi) {
            emblaApi.scrollTo(0)
            setSelectedIndex(0)
            // Recompute scroll snaps after resize
            setScrollSnaps(emblaApi.scrollSnapList())
          }
        }
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [emblaApi, isMobile])

  useEffect(() => {
    if (!emblaApi) return

    // Initialize scroll snaps
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', () => {
      setScrollSnaps(emblaApi.scrollSnapList())
    })
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', () => {
        setScrollSnaps(emblaApi.scrollSnapList())
      })
    }
  }, [emblaApi, onSelect])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div ref={containerRef}>
      <style dangerouslySetInnerHTML={{ __html: glowKeyframes }} />
      <div className="container-spacing !pb-0 md:!pb-24">
        <div className="container-wrapper">
          <h2 className="text-3xl md:text-6xl font-bold text-heading pb-10">{props.title}</h2>
          <div className="grid md:grid-cols-2 grid-rows-3 gap-2 md:gap-8 hidden md:grid">
            {props.cards.map((card, index) => {
              if (index === 0 || index === 3) {
                return (
                  <HomeDocumentsItem
                    key={index}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    className={cn(
                      'row-span-2',
                      index === 0
                        ? 'md:col-start-1 md:row-start-1'
                        : 'md:col-start-2 md:row-start-2',
                    )}
                  />
                )
              } else {
                return (
                  <HomeDocumentsItemSmall
                    key={index}
                    title={card.title}
                    description={card.description}
                    image={card.image}
                    className={cn('row-span-1', index === 1 ? 'md:col-start-2' : 'md:col-start-1')}
                  />
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className="md:hidden pb-24 relative">
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="flex embla__container">
            {props.cards.map((card, index) => (
              <div key={index} className="px-8 h-full embla__slide shrink-0 w-[100vw]">
                <HomeDocumentsItem
                  key={index}
                  {...card}
                  className="!h-full min-h-[400px] mb-8 shadow-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons and Dots Container */}
        <div className="flex items-center justify-center gap-8 mt-6">
          {/* Previous Button */}
          <div
            className={cn(
              'transition-all duration-300',
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

          {/* Dot Indicators */}
          <div className="flex justify-center items-center gap-2">
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

          {/* Next Button */}
          <div
            className={cn(
              'transition-all duration-300',
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
        </div>
      </div>
    </div>
  )
}
