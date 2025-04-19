import { cookies } from 'next/headers'
import React from 'react'
import ClientServicesList from './ClientServicesList'

import type { ServiceListType } from './ClientServicesList'

export const ServicesList = async (props: ServiceListType) => {
  const cookieStore = await cookies()
  const cookieSelectedService = cookieStore.get(`${props.id}-selectedService`)

  return (
    <ClientServicesList
      {...props}
      selectedService={cookieSelectedService?.value ?? props.services[0].id}
    />
  )
}
