import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import { useCallback, useEffect, useState, useRef } from 'react'

interface CarouselState {
  selectedIndex: number
  scrollSnaps: number[]
  canScrollPrev: boolean
  canScrollNext: boolean
  isMobile: boolean
}

export const useCarousel = (options: EmblaOptionsType = {}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CarouselState>({
    selectedIndex: 0,
    scrollSnaps: [],
    canScrollPrev: false,
    canScrollNext: false,
    isMobile: false,
  })

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setState((prev) => ({
      ...prev,
      selectedIndex: emblaApi.selectedScrollSnap(),
      scrollSnaps: emblaApi.scrollSnapList(),
      canScrollPrev: emblaApi.canScrollPrev(),
      canScrollNext: emblaApi.canScrollNext(),
    }))
  }, [emblaApi])

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const isCurrentlyMobile = window.matchMedia('(max-width: 768px)').matches
        if (isCurrentlyMobile !== state.isMobile) {
          setState((prev) => ({ ...prev, isMobile: isCurrentlyMobile }))
          if (emblaApi) {
            emblaApi.scrollTo(0)
            setState((prev) => ({
              ...prev,
              selectedIndex: 0,
              scrollSnaps: emblaApi.scrollSnapList(),
              canScrollPrev: emblaApi.canScrollPrev(),
              canScrollNext: emblaApi.canScrollNext(),
            }))
          }
        }
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [emblaApi, state.isMobile])

  useEffect(() => {
    if (!emblaApi) return

    setState((prev) => ({
      ...prev,
      scrollSnaps: emblaApi.scrollSnapList(),
    }))

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', () => {
      setState((prev) => ({
        ...prev,
        scrollSnaps: emblaApi.scrollSnapList(),
      }))
    })
    onSelect()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', () => {
        setState((prev) => ({
          ...prev,
          scrollSnaps: emblaApi.scrollSnapList(),
        }))
      })
    }
  }, [emblaApi, onSelect])

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])

  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return {
    emblaRef,
    containerRef,
    ...state,
    scrollTo,
    scrollPrev,
    scrollNext,
  }
}
