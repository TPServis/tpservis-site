import { cn } from 'src/utilities/cn'
import React from 'react'
import { RenderBlocks } from '../RenderBlocks'
import { Contacts } from './Contacts'

import RichText from '@/components/RichText'

import { getPayload } from 'payload'
import config from '@payload-config'
import { FormBlock } from '@/payload-types'

interface CustomFormBlockProps {
  heading: string
  description: any
  formBlock: FormBlock[]
}

export const CustomForm = async (props: CustomFormBlockProps) => {
  const payload = await getPayload({ config })

  const contacts = await payload.findGlobal({
    slug: 'contacts',
  })

  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <section className={cn('py-10 px-4 md:py-16 md:px-6 lg:py-20')}>
          <div className="lg:w-2/3 lg:ml-auto">
            <h2 className="text-heading text-4xl font-bold mb-10">{props.heading}</h2>
            <RichText
              content={props.description}
              enableGutter={false}
              className="text-lg text-shark-400 pb-6"
            />
          </div>
          <div className="lg:flex lg:flex-row lg:gap-10 ">
            <div className="lg:w-1/3">
              <Contacts {...contacts} />
            </div>
            <div className="lg:w-2/3">
              <RenderBlocks blocks={props.formBlock} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
