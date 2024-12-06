'use client'

import { useState, useEffect, useRef } from 'react'
import { setClientCookie } from '@/utilities/setClientCookie'
import type { ServiceContentType } from './ServiceContent'

import ServiceContent from './ServiceContent'

import { motion, AnimatePresence } from 'framer-motion'

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

  const handleListItemClick = (id: string) => {
    setSelectedService(id)
    setClientCookie('selectedService', id)

    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="container-spacing z-10 relative" id="services-list" ref={sectionRef}>
      <div className="container-wrapper">
        <h2 className="text-4xl md:text-6xl font-bold text-heading mb-8 md:mb-20">{props.title}</h2>
        <div className="md:grid md:grid-cols-4 lg:grid-cols-6 gap-10 relative">
          <ServicesLabelsList
            services={props.services}
            handleListItemClick={handleListItemClick}
            selectedService={selectedService}
          />
          <AnimatePresence mode="wait">
            <div className="col-span-4 relative z-1 pb-18">
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 'auto' }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: -10, height: 'auto' }}
                  transition={{
                    duration: 0.3,
                    height: {
                      duration: 0, // Prevent height animation
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
      <div className="hidden md:flex w-full md:col-span-2 flex-col gap-2 sticky top-26 bottom-0 max-h-fit z-2">
        {props.services.map((service) => (
          <ListItem
            key={service.id}
            title={service.title}
            onClick={() => props.handleListItemClick(service.id)}
            isSelected={props.selectedService === service.id}
          />
        ))}
      </div>
      <div className="md:hidden w-full flex flex-col gap-2 sticky top-[90dvh] bottom-0 max-h-fit z-2">
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

  return (
    <div className="relative">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full w-full mb-2 backdrop-blur"
          >
            <div
              className="bg-white/60 rounded-lg shadow-lg border border-astral-100 overflow-hidden text-sm font-semibold text-shark-500 max-h-[50vh] overflow-y-auto"
              role="listbox"
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
                >
                  <span className="text-astral-500 text-xs font-normal mr-2">{index + 1}</span>
                  <span>{service.title}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-4 bg-astral-50/60 text-sm md:text-lg font-semibold text-astral-500 hover:bg-astral-100/60 hover:text-astral-600 transition-colors duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 shadow-lg backdrop-blur"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-astral-500 text-xs font-normal mr-2">
          {props.selectedService
            ? props.services.findIndex((service) => service.id === props.selectedService) + 1
            : ''}
        </span>
        <span>
          {props.selectedService
            ? props.services.find((service) => service.id === props.selectedService)?.title
            : 'Select a service'}
        </span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
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
}

const ListItem = (props: ListItemProps) => {
  return (
    <button
      onClick={props.onClick}
      data-selected={props.isSelected}
      className="flex items-center justify-start text-left w-full data-[selected=true]:bg-astral-500 data-[selected=true]:text-astral-50 rounded-lg p-4 bg-astral-50 text-sm md:text-lg font-semibold text-astral-500 hover:bg-astral-100 hover:text-astral-600 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 first:rounded-t-2xl last:rounded-b-2xl shadow "
    >
      <span>{props.title}</span>
    </button>
  )
}
