import { useCallback, useEffect, useState, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import debounce from 'lodash/debounce'

interface CarouselState {
  selectedIndex: number
  scrollSnaps: number[]
  canScrollPrev: boolean
  canScrollNext: boolean
  isMobile: boolean
}

const MOBILE_WIDTH = 768

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

  const resetCarouselState = useCallback(
    (resetIndex: number = 0) => {
      if (!emblaApi) return

      emblaApi.scrollTo(resetIndex)
      setState((prev) => ({
        ...prev,
        selectedIndex: resetIndex,
        scrollSnaps: emblaApi.scrollSnapList(),
        canScrollPrev: emblaApi.canScrollPrev(),
        canScrollNext: emblaApi.canScrollNext(),
      }))
    },
    [emblaApi],
  )

  const handleResize = useCallback(() => {
    const isCurrentlyMobile = window.matchMedia(`(max-width: ${MOBILE_WIDTH}px)`).matches
    if (isCurrentlyMobile !== state.isMobile) {
      setState((prev) => ({ ...prev, isMobile: isCurrentlyMobile }))
      if (emblaApi) {
        resetCarouselState()
      }
    }
  }, [state.isMobile, resetCarouselState])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const debouncedHandleResize = debounce(handleResize, 250)

    const observer = new ResizeObserver(() => {
      debouncedHandleResize()
    })

    observer.observe(element)

    handleResize()

    return () => {
      observer.disconnect()
      debouncedHandleResize.cancel()
    }
  }, [handleResize])

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

  const handleReInit = useCallback(() => {
    if (!emblaApi) return
    setState((prev) => ({
      ...prev,
      scrollSnaps: emblaApi.scrollSnapList(),
    }))
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', handleReInit)

    onSelect()
    handleReInit()

    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', handleReInit)
    }
  }, [emblaApi, onSelect, handleReInit])

  const scrollTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= state.scrollSnaps.length) return
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi, state.scrollSnaps],
  )

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
