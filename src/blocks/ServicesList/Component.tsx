import { Media } from '@/payload-types'
import React from 'react'

import RichText from '@/components/RichText'
import Image from 'next/image'

import type { Media as MediaType } from '@/payload-types'

type ContentBlock = {
  blockType: 'contentBlock'
  description?: any
}

type ImageBlock = {
  blockType: 'imageBlock'
  media: {
    image?: MediaType
  }
}

type ServicesListProps = {
  title: string
  services: {
    title: string
    content: (ContentBlock | ImageBlock)[]
  }[]
}

export const ServicesList: React.FC<ServicesListProps> = (props: ServicesListProps) => {
  console.log(props.services)

  const blockRenderer = (block: ContentBlock | ImageBlock) => {
    switch (block.blockType) {
      case 'contentBlock':
        return <RichText content={block.description} />
      case 'imageBlock':
        return (
          <div className="relative">
            <Image
              src={block.media.image?.url ?? ''}
              alt={block.media.image?.alt ?? ''}
              width={block.media.image?.width ?? 0}
              height={block.media.image?.height ?? 0}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <h2 className="text-3xl font-bold text-heading">{props.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {props.services.map((service) => (
            <div key={service.title}>
              <h3 className="text-2xl font-bold text-heading">{service.title}</h3>
            </div>
          ))}
          <div className="col-span-2">
            {props.services.map((service) =>
              service.content.map((content, index) => (
                <div key={`${content.blockType}-${index}`}>{blockRenderer(content)}</div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
