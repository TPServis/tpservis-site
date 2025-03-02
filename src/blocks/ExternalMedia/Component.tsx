'use client'
import { tv } from 'tailwind-variants'
import Image from 'next/image'
import type { ExternalMediaType } from './types'
import { getValidAspectRatio } from './utils'
const DEFAULT_IMAGE_STYLING =
  'mx-auto rounded-2xl relative overflow-hidden h-full max-w-full custom-aspect-ratio-12'
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

    const validRatio = getValidAspectRatio(customAspectRatio)

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

  console.log(aspectRatioStyle)

  const containerClassName = containerVariants({ size, container })

  return (
    <div className={containerClassName}>
      <style>
        {`
          .custom-aspect-ratio-12 {
            aspect-ratio: ${aspectRatioStyle.aspectRatio}
          }

        `}
      </style>
      <div className={wrapperVariants({ container, className })}>
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
