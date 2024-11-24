import React from 'react'
import ClientServicesList from './ClientServicesList'
import { cookies } from 'next/headers'

import type { ServiceListType } from './ClientServicesList'

export const ServicesList = async (props: ServiceListType) => {
  const cookieStore = await cookies()
  const cookieSelectedService = cookieStore.get('selectedService')

  return (
    <ClientServicesList
      {...props}
      selectedService={cookieSelectedService?.value ?? props.services[0].id}
    />
  )
}
