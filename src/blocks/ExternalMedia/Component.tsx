import React from 'react'
import { cn } from '@/utilities/cn'
import { tv } from 'tailwind-variants'
import Image from 'next/image'
export type ExternalMediaType = {
  url: string
  alt?: string
  size?: 'small' | 'medium' | 'large' | 'full'
  className?: string
  priority?: boolean
  quality?: number
  blockType: 'externalMedia'
  aspectRatio?: '1/1' | '16/9' | '9/16' | '4/3' | '3/4' | '1/2' | '2/1' | 'custom' | any
  customAspectRatio?: string
}

const DEFAULT_IMAGE_STYLING = 'mx-auto rounded-2xl relative overflow-hidden'

const containerVariants = tv({
  base: DEFAULT_IMAGE_STYLING,
  variants: {
    size: {
      small: 'max-w-[400px]',
      medium: 'max-w-[800px]',
      large: 'max-w-[1200px]',
      full: 'w-full',
    },
  },
  defaultVariants: {
    size: 'full',
  },
})

export const ExternalMedia: React.FC<ExternalMediaType> = (props) => {
  const {
    url,
    alt = '',
    size = 'medium',
    className,
    priority = true,
    quality = 75,
    aspectRatio = '16/9',
    customAspectRatio,
  } = props

  if (!url) {
    throw new Error('URL is required')
  }

  try {
    new URL(url)
  } catch (error) {
    throw new Error('Invalid URL')
  }

  const relativeSize =
    size === 'small' ? '400px' : size === 'medium' ? '800px' : size === 'large' ? '1200px' : '100vw'

  let aspectRatioStyle = { aspectRatio: '16/9' }

  if (aspectRatio === 'custom') {
    if (!customAspectRatio) {
      throw new Error('Custom aspect ratio is required')
    } else {
      try {
        const ratio = customAspectRatio.split('/')
        if (
          ratio.length !== 2 ||
          !Number.isInteger(parseInt(ratio[0])) ||
          !Number.isInteger(parseInt(ratio[1]))
        ) {
          throw new Error('Invalid custom aspect ratio')
        }
        aspectRatioStyle = {
          aspectRatio: `${ratio[0]}/${ratio[1]}`,
        }
      } catch (error) {
        throw new Error('Invalid custom aspect ratio')
      }
    }
  } else {
    aspectRatioStyle = {
      aspectRatio: aspectRatio,
    }
  }

  const containerClassName = containerVariants({ size, className })

  return (
    <div className={containerClassName} style={aspectRatioStyle}>
      <Image
        src={url}
        alt={alt}
        fill
        sizes={`(max-width: 768px) 100vw, ${relativeSize}`}
        priority={priority}
        quality={quality}
        className="object-cover object-center"
      />
    </div>
  )
}
