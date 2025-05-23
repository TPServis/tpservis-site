import type { DownloadableFilesBlock } from '@/blocks/DownloadableFiles/Component'
import DownloadableFiles from '@/blocks/DownloadableFiles/Component'
import type { ExternalMediaType } from '@/blocks/ExternalMedia/Component'
import { ExternalMedia } from '@/blocks/ExternalMedia/Component'
import type { PlusMinusBlock } from '@/blocks/PlusMinus/Component'
import PlusMinus from '@/blocks/PlusMinus/Component'
import RichText from '@/components/RichText'
import Image from 'next/image'

import { cn } from '@/utilities/cn'
import { cva } from 'class-variance-authority'

import { Media } from '@/components/Media'
import type { Media as MediaType, Page as PageType } from '@/payload-types'
import Link from 'next/link'

type ContentBlock = {
  blockType: 'contentBlock'
  description?: any
}

type ImageBlock = {
  blockType: 'imageBlock'
  media: {
    image?: MediaType
    f?: 'square' | 'landscape'
    bR?: 'none' | 'small' | 'medium' | 'large'
    w?: 'full' | 'half'
    align?: 'left' | 'right'
  }
}

type CtaBlock = {
  blockType: 'ctaBlock'
  text: string
  cta: PageType
}

export type ServiceContentType = {
  id: string
  title: string
  content: (
    | ContentBlock
    | ImageBlock
    | CtaBlock
    | PlusMinusBlock
    | DownloadableFilesBlock
    | ExternalMediaType
  )[]
}

type ServiceContentProps = ServiceContentType

const ServiceContent = (props: ServiceContentProps) => {
  const blockRenderer = (
    block:
      | ContentBlock
      | ImageBlock
      | CtaBlock
      | PlusMinusBlock
      | DownloadableFilesBlock
      | ExternalMediaType,
  ) => {
    switch (block.blockType) {
      case 'contentBlock':
        return <RichText content={block.description} className="text-shark-600 prose rich-text" />
      case 'imageBlock':
        return <ImageContent {...block} />
      case 'ctaBlock':
        return <CtaContent {...block} />
      case 'plusMinus':
        return <PlusMinus {...block} />
      case 'downloadableFiles':
        return <DownloadableFiles {...block} />
      case 'externalMedia':
        return <ExternalMedia {...block} />
      default:
        return null
    }
  }

  return (
    <div>
      {props.content.map((block, index) => (
        <div key={`${block.blockType}-${index}`}>{blockRenderer(block)}</div>
      ))}
    </div>
  )
}

export default ServiceContent

const ImageContent = (props: ImageBlock) => {
  const imageVariants = cva('relative overflow-hidden', {
    variants: {
      f: {
        square: 'aspect-square',
        landscape: 'aspect-landscape',
      },
      bR: {
        none: 'rounded-none',
        small: 'rounded',
        medium: 'rounded-xl',
        large: 'rounded-3xl',
      },
      w: {
        full: 'w-full h-auto',
        half: 'w-1/2 h-auto',
      },
      align: {
        left: 'mr-auto',
        right: 'ml-auto',
      },
    },
  })

  return (
    <div className="relative w-full">
      <Media
        resource={props.media.image}
        className={imageVariants({
          f: props.media.f,
          bR: props.media.bR,
          w: props.media.w,
          align: props.media.align,
        })}
        alt={props.media.image?.alt ?? ''}
        size={props.media.w === 'full' ? '100%' : '50%'}
      />
    </div>
  )
}

const CtaContent = (props: CtaBlock) => {
  return (
    <Link
      href={`/${props.cta.slug}`}
      className="block text-white px-6 py-4 rounded-lg bg-jaffa-400 hover:bg-jaffa-500 transition-all duration-300 w-fit text-lg font-semibold min-w-max"
    >
      {props.text}
    </Link>
  )
}
