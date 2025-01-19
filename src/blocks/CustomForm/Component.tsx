import { cn } from 'src/utilities/cn'
import React from 'react'
import { RenderBlocks } from '../RenderBlocks'
import { Contacts } from './Contacts'

import RichText from '@/components/RichText'

import { getPayload } from 'payload'
import config from '@payload-config'
import { FormBlock } from '@/payload-types'
import { cva } from 'class-variance-authority'

interface CustomFormBlockProps {
  heading: string
  description: any
  formBlock: FormBlock[]
  orderInverted: boolean
}

const ContactsBlockVariants = cva(['lg:w-1/3'], {
  variants: {
    orderInverted: {
      true: 'lg:order-1',
      false: 'order-2 lg:order-0',
    },
  },
})

const FormBlockVariants = cva(['lg:w-2/3'], {
  variants: {
    orderInverted: {
      true: 'lg:order-0',
      false: 'lg:order-1',
    },
  },
})

export const CustomForm = async (props: CustomFormBlockProps) => {
  const payload = await getPayload({ config })

  const contacts = await payload.findGlobal({
    slug: 'contacts',
  })

  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <section>
          <div className="lg:w-2/3 lg:ml-auto lg:pl-6 mb-10">
            <h2 className="text-heading text-4xl font-bold mb-10 text-balance">{props.heading}</h2>
            <RichText
              content={props.description}
              enableGutter={false}
              className="rich-text text-pretty"
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-10 ">
            <div className={ContactsBlockVariants({ orderInverted: props.orderInverted })}>
              <Contacts {...contacts} />
            </div>
            <div className={FormBlockVariants({ orderInverted: props.orderInverted })}>
              <RenderBlocks blocks={props.formBlock} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
