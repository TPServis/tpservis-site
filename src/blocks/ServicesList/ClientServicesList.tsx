'use client'

import { useState, useEffect, useRef } from 'react'
import { setClientCookie } from '@/utilities/setClientCookie'
import type { ServiceContentType } from './ServiceContent'

import ServiceContent from './ServiceContent'

import { motion, AnimatePresence } from 'motion/react'

// Utility function to get all focusable elements within a container
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )
  return Array.from(focusableElements)
}

export type ServiceListType = {
  id: string
  title: string
  services: ServiceContentType[]
}

type ServicesListProps = ServiceListType & {
  selectedService: string | null
}

export default function ClientServicesList(props: ServicesListProps) {
  const [selectedService, setSelectedService] = useState<string | null>(props.selectedService)
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToSelectedService = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleListItemClick = (id: string) => {
    setSelectedService(id)
    setClientCookie(`${props.id}-selectedService`, id)

    // Focus the content area for screen readers after selection
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus()
      }
    }, 100)

    scrollToSelectedService()
  }

  const handleNavigationWithHash = (index: number) => {
    let service = props.services[index]
    if (service) {
      setSelectedService(service.id)
      setClientCookie(`${props.id}-selectedService`, service.id)

      scrollToSelectedService()
    }
  }

  useEffect(() => {
    const currentPath = window.location.href.split('#')[1]

    if (currentPath != undefined && !isNaN(parseInt(currentPath))) {
      handleNavigationWithHash(parseInt(currentPath))
    }
  }, [handleNavigationWithHash])

  return (
    <div
      className="container-spacing z-10 relative"
      id="services-list"
      ref={sectionRef}
      role="region"
      aria-label={props.title}
    >
      <div className="container-wrapper">
        <h2 className="text-4xl md:text-6xl font-bold text-heading mb-8 md:mb-20">{props.title}</h2>
        <div className="lg:grid lg:grid-cols-6 gap-10 relative">
          <ServicesLabelsList
            services={props.services}
            handleListItemClick={handleListItemClick}
            selectedService={selectedService}
          />
          <AnimatePresence mode="wait">
            <div
              className="lg:col-span-4 relative z-1 pb-18"
              ref={contentRef}
              tabIndex={-1}
              aria-live="polite"
              role="region"
              aria-label="Selected service details"
            >
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 'auto' }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 'auto' }}
                  transition={{
                    duration: 0.3,
                    height: {
                      duration: 0,
                    },
                  }}
                  style={{ height: 'auto' }}
                  key={`service-${selectedService}`}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ServiceContent
                      {...props.services.find((service) => service.id === selectedService)!}
                    />
                  </motion.div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

type ServicesLabelsListProps = {
  services: ServiceContentType[]
  handleListItemClick: (id: string) => void
  selectedService: string | null
}

const ServicesLabelsList = (props: ServicesLabelsListProps) => {
  return (
    <>
      <div
        className="hidden lg:flex w-full lg:col-span-2 flex-col gap-2 sticky top-26 bottom-0 max-h-fit z-2"
        role="tablist"
        aria-label="Service options"
      >
        {props.services.map((service, index) => (
          <ListItem
            key={service.id}
            title={service.title}
            onClick={() => props.handleListItemClick(service.id)}
            isSelected={props.selectedService === service.id}
            index={index}
            totalItems={props.services.length}
          />
        ))}
      </div>
      <div className="lg:hidden w-full flex flex-col gap-2 sticky top-[calc(100dvh-100px)] bottom-0 max-h-fit z-2">
        <MobileListItems
          services={props.services}
          onClick={props.handleListItemClick}
          selectedService={props.selectedService}
        />
      </div>
    </>
  )
}

type MobileListItemsProps = {
  services: ServiceContentType[]
  onClick: (id: string) => void
  selectedService: string | null
}

const MobileListItems = (props: MobileListItemsProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const listboxRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Handle keyboard navigation in the listbox
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    const options = props.services
    const currentIndex = props.selectedService
      ? options.findIndex((service) => service.id === props.selectedService)
      : -1

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (currentIndex < options.length - 1) {
          props.onClick(options[currentIndex + 1].id)
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (currentIndex > 0) {
          props.onClick(options[currentIndex - 1].id)
        }
        break
      case 'Home':
        e.preventDefault()
        props.onClick(options[0].id)
        break
      case 'End':
        e.preventDefault()
        props.onClick(options[options.length - 1].id)
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        buttonRef.current?.focus()
        break
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (listboxRef.current && !listboxRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full w-full mb-2 backdrop-blur"
            ref={listboxRef}
          >
            <div
              className="bg-white/60 rounded-lg shadow-lg border border-astral-100 overflow-hidden text-sm font-semibold text-shark-500 max-h-[50vh] overflow-y-auto"
              role="listbox"
              aria-label="Select a service"
              tabIndex={-1}
            >
              {props.services.map((service, index) => (
                <div
                  key={service.id}
                  className={`p-4 cursor-pointer hover:bg-astral-50 transition-colors duration-200 ${
                    props.selectedService === service.id ? 'bg-astral-50' : ''
                  }`}
                  onClick={() => {
                    props.onClick(service.id)
                    setIsOpen(false)
                  }}
                  role="option"
                  aria-selected={props.selectedService === service.id}
                  tabIndex={0}
                  id={`service-option-${service.id}`}
                >
                  <span className="text-astral-500 text-xs font-normal mr-2" aria-hidden="true">
                    {index + 1}
                  </span>
                  <span>{service.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-astral-500/80 text-sm md:text-lg font-semibold text-astral-50 hover:bg-astral-600/80 hover:text-astral-600 transition-colors duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 shadow-lg backdrop-blur"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="services-listbox"
      >
        <span className="text-astral-50 text-xs font-normal mr-2" aria-hidden="true">
          {props.selectedService
            ? props.services.findIndex((service) => service.id === props.selectedService) + 1
            : ''}
        </span>
        <span className="text-astral-50 text-normal font-bold text-pretty">
          {props.selectedService
            ? props.services.find((service) => service.id === props.selectedService)?.title
            : 'Select a service'}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  )
}

type ListItemProps = {
  title: string
  onClick: () => void
  isSelected: boolean
  index: number
  totalItems: number
}

const ListItem = (props: ListItemProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault()
        props.onClick()
        break
      case 'ArrowDown':
        e.preventDefault()
        if (props.index < props.totalItems - 1) {
          const nextButton = e.currentTarget.nextElementSibling as HTMLButtonElement
          nextButton?.focus()
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (props.index > 0) {
          const prevButton = e.currentTarget.previousElementSibling as HTMLButtonElement
          prevButton?.focus()
        }
        break
      case 'Home':
        e.preventDefault()
        const firstButton = e.currentTarget.parentElement?.firstElementChild as HTMLButtonElement
        firstButton?.focus()
        break
      case 'End':
        e.preventDefault()
        const lastButton = e.currentTarget.parentElement?.lastElementChild as HTMLButtonElement
        lastButton?.focus()
        break
    }
  }

  return (
    <button
      onClick={props.onClick}
      onKeyDown={handleKeyDown}
      data-selected={props.isSelected}
      className="flex items-center justify-start text-left w-full data-[selected=true]:bg-astral-500 data-[selected=true]:text-astral-50 rounded-lg p-4 bg-astral-50 text-sm md:text-lg font-semibold text-astral-500 hover:bg-astral-100 hover:text-astral-600 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 first:rounded-t-2xl last:rounded-b-2xl shadow"
      role="tab"
      aria-selected={props.isSelected}
      aria-controls={`service-panel-${props.index}`}
      tabIndex={props.isSelected ? 0 : -1}
    >
      <span>{props.title}</span>
    </button>
  )
}
