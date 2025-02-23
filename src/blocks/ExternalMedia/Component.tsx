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
  aspectRatio?: '1/1' | '16/9' | '9/16' | '4/3' | '3/4' | '1/2' | '2/1' | 'custom'
  customAspectRatio?: string
  container?: 'none' | 'horizontal' | 'vertical' | 'full'
}

const DEFAULT_IMAGE_STYLING = 'mx-auto rounded-2xl relative overflow-hidden h-full max-w-full'
const DEFAULT_IMAGE_ASPECT_RATIO = '16/9'

const containerVariants = tv({
  base: '',
  variants: {
    size: {
      small: 'max-w-[400px]',
      medium: 'max-w-[800px]',
      large: 'max-w-[1200px]',
      full: 'w-full',
    },
    container: {
      none: '',
      horizontal: 'container-spacing !py-0',
      vertical: 'container-spacing !px-0',
      full: 'container-spacing',
    },
  },
  defaultVariants: {
    size: 'full',
  },
})

const wrapperVariants = tv({
  base: DEFAULT_IMAGE_STYLING,
  variants: {
    container: {
      none: '',
      horizontal: 'container-wrapper',
      vertical: '',
      full: 'container-wrapper',
    },
  },
})

const validateAspectRatio = (ratio: string): { width: number; height: number } | null => {
  if (!ratio) return null

  const parts = ratio.trim().split('/')
  if (parts.length !== 2) return null

  const [width, height] = parts.map((part) => {
    const num = parseInt(part.trim(), 10)
    return Number.isInteger(num) && num > 0 ? num : null
  })

  if (!width || !height) return null

  return { width, height }
}

export const ExternalMedia: React.FC<ExternalMediaType> = (props) => {
  const {
    url,
    alt = '',
    size = 'medium',
    className,
    priority = true,
    quality = 75,
    aspectRatio = DEFAULT_IMAGE_ASPECT_RATIO,
    customAspectRatio,
    container = 'none',
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

  let aspectRatioStyle = { aspectRatio: DEFAULT_IMAGE_ASPECT_RATIO }

  if (aspectRatio === 'custom') {
    if (!customAspectRatio) {
      throw new Error('Custom aspect ratio is required when aspectRatio is set to "custom"')
    }

    const validRatio = validateAspectRatio(customAspectRatio)

    if (!validRatio) {
      console.error(
        `Invalid aspect ratio "${customAspectRatio}". Expected format: "width/height" with positive integers. Defaulting to ${DEFAULT_IMAGE_ASPECT_RATIO}`,
      )
      aspectRatioStyle = { aspectRatio: DEFAULT_IMAGE_ASPECT_RATIO }
    } else {
      aspectRatioStyle = { aspectRatio: `${validRatio.width}/${validRatio.height}` }
    }
  } else {
    aspectRatioStyle = { aspectRatio }
  }

  const containerClassName = containerVariants({ size, container })

  return (
    <div className={containerClassName}>
      <div className={wrapperVariants({ container, className })} style={aspectRatioStyle}>
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
    </div>
  )
}
