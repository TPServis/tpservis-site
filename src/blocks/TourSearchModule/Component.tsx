import React from 'react'
import { TourSearchModule } from './ComponentClient'

import config from '@payload-config'
import { getPayload } from 'payload'

export const TourSearchModuleComponent = async () => {
  const payload = await getPayload({ config })
  const form = await payload.find({
    collection: 'forms',
    where: {
      title: {
        equals: 'room_order_form',
      },
    },
    limit: 1,
  })
  return <TourSearchModule form={form.docs[0]} />
}
