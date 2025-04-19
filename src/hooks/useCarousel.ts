import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import debounce from 'lodash/debounce'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CarouselState {
  selectedIndex: number
  scrollSnaps: number[]
  canScrollPrev: boolean
  canScrollNext: boolean
  isMobile: boolean
}

const MOBILE_WIDTH = 768
const INITIAL_CAROUSEL_STATE: CarouselState = {
  selectedIndex: 0,
  scrollSnaps: [],
  canScrollPrev: false,
  canScrollNext: false,
  isMobile: false,
}

interface UseCarouselOptions extends EmblaOptionsType {
  mobileBreakpoint?: number
}

/**
 * Custom hook for managing a carousel component.
 *
 * This hook provides functionality for initializing an embla carousel,
 * handling mobile breakpoints, and managing the carousel's state.
 *
 * @param options - The options for the embla carousel.
 * @returns An object containing the carousel's state and functions for controlling it.
 */
export const useCarousel = (options: UseCarouselOptions = {}) => {
  const { mobileBreakpoint = MOBILE_WIDTH, ...emblaOptions } = options
  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions)
  const containerRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<CarouselState>(INITIAL_CAROUSEL_STATE)

  /**
   * Resets the carousel to a specific index.
   *
   * This function scrolls the carousel to the given index and updates the component's state
   * with the new selected index, scroll snaps, and scroll availability.
   *
   * @param resetIndex - The index to reset the carousel to. Defaults to 0.
   */
  const resetCarouselState = useCallback(
    (resetIndex = 0) => {
      if (!emblaApi) return

      try {
        if (resetIndex < 0) {
          console.warn('resetIndex is less than 0, resetting to 0')
          resetIndex = 0
        }

        emblaApi.scrollTo(resetIndex)
        setState((prev) => ({
          ...prev,
          selectedIndex: resetIndex,
          scrollSnaps: emblaApi.scrollSnapList(),
          canScrollPrev: emblaApi.canScrollPrev(),
          canScrollNext: emblaApi.canScrollNext(),
        }))
      } catch (error) {
        console.error('Error resetting carousel state:', error)
      }
    },
    [emblaApi],
  )

  /**
   * Handles the resize event to adjust the carousel's state based on the screen size.
   *
   * This function checks if the screen size matches the mobile breakpoint. If the mobile state
   * has changed, it resets the carousel to its initial state and updates the component's state
   * to reflect the new mobile state.
   */
  const handleResize = useCallback(() => {
    const isCurrentlyMobile = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`).matches

    setState((prev) => {
      if (isCurrentlyMobile === prev.isMobile) return prev

      if (emblaApi) {
        resetCarouselState()
      }

      return { ...prev, isMobile: isCurrentlyMobile }
    })
  }, [emblaApi, resetCarouselState, mobileBreakpoint])

  /**
   * Sets up a ResizeObserver to monitor the container element for changes in size.
   *
   * This effect creates a ResizeObserver that listens for changes in the size of the container element.
   * When a change is detected, it debounces the handleResize function to prevent excessive re-renders.
   * The observer is disconnected when the component unmounts.
   */
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

  /**
   * Handles the selection of a new slide in the carousel.
   *
   * This function updates the component's state with the new selected index, scroll snaps,
   * and scroll availability when a new slide is selected.
   */
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

  /**
   * Handles the reinitialization of the carousel.
   *
   * This function updates the component's state with the new scroll snaps when the carousel is reinitialized.
   */
  const handleReInit = useCallback(() => {
    if (!emblaApi) return
    setState((prev) => ({
      ...prev,
      scrollSnaps: emblaApi.scrollSnapList(),
    }))
  }, [emblaApi])

  /**
   * Sets up event listeners for the carousel.
   *
   * This effect attaches event listeners to the carousel API for handling slide selection and reinitialization.
   * It also triggers the initial selection and reinitialization of the carousel.
   */
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

  /**
   * Scrolls to a specific index in the carousel.
   *
   * This function scrolls the carousel to the given index if the index is within the valid range.
   * It also checks if the carousel API is available before attempting to scroll.
   *
   * @param index - The index to scroll to.
   */
  const scrollTo = useCallback(
    (index: number) => {
      if (index < 0 || index >= state.scrollSnaps.length) {
        console.warn(
          `index is out of range, index: ${index}, scrollSnaps: ${state.scrollSnaps.length}`,
        )
        return
      }

      if (!emblaApi) return

      try {
        emblaApi.scrollTo(index)
      } catch (error) {
        console.error('Error scrolling to index:', error)
      }
    },
    [emblaApi, state.scrollSnaps],
  )

  /**
   * Scrolls to the previous slide in the carousel.
   *
   * This function scrolls the carousel to the previous slide if the carousel API is available.
   */
  const scrollPrev = useCallback(() => {
    if (!emblaApi) return
    try {
      emblaApi.scrollPrev()
    } catch (error) {
      console.error('Error scrolling to previous slide:', error)
    }
  }, [emblaApi])

  /**
   * Scrolls to the next slide in the carousel.
   *
   * This function scrolls the carousel to the next slide if the carousel API is available.
   */
  const scrollNext = useCallback(() => {
    if (!emblaApi) return
    try {
      emblaApi.scrollNext()
    } catch (error) {
      console.error('Error scrolling to next slide:', error)
    }
  }, [emblaApi])

  return {
    emblaRef,
    containerRef,
    ...state,
    scrollTo,
    scrollPrev,
    scrollNext,
  }
}
