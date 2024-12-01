'use client'

import { useState } from 'react'
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

  const handleListItemClick = (id: string) => {
    setSelectedService(id)
    setClientCookie('selectedService', id)
  }

  return (
    <div className="container-spacing z-10 relative" id="services-list">
      <div className="container-wrapper">
        <h2 className="text-6xl font-bold text-heading mb-20">{props.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10">
          <div className="col-span-2 flex flex-col gap-2 sticky top-26 max-h-fit">
            {props.services.map((service) => (
              <ListItem
                key={service.id}
                title={service.title}
                onClick={() => handleListItemClick(service.id)}
                isSelected={selectedService === service.id}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <div className="col-span-4">
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
      className="flex items-center justify-start text-left w-full data-[selected=true]:bg-astral-500 data-[selected=true]:text-astral-50 rounded-lg p-4 bg-astral-50 text-lg font-semibold text-astral-500 hover:bg-astral-100 hover:text-astral-600 transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 first:rounded-t-2xl last:rounded-b-2xl shadow "
    >
      <span>{props.title}</span>
    </button>
  )
}
