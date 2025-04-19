import React from 'react'
import { cn } from 'src/utilities/cn'
import { RenderBlocks } from '../RenderBlocks'
import { Contacts } from './Contacts'

import RichText from '@/components/RichText'

import { FormBlock } from '@/payload-types'
import config from '@payload-config'
import { getPayload } from 'payload'
import { tv } from 'tailwind-variants'

interface CustomFormBlockProps {
  heading: string
  description: any
  formBlock: FormBlock[]
  orderInverted: boolean
}

const ContactsBlockVariants = tv({
  base: 'md:col-span-1 md:row-span-1 md:row-start-1 order-2',
  variants: {
    orderInverted: {
      true: 'md:col-start-3',
      false: 'md:col-start-1',
    },
  },
})

const FormBlockVariants = tv({
  base: 'md:col-span-2 md:row-span-1 md:row-start-1 order-1',
  variants: {
    orderInverted: {
      true: 'md:col-start-1',
      false: 'md:col-start-2',
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
          <div className="mb-10">
            <h2 className="text-heading text-4xl font-bold text-balance">{props.heading}</h2>
            <RichText
              content={props.description}
              enableGutter={false}
              className="rich-text text-pretty"
            />
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-1 gap-10 ">
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
