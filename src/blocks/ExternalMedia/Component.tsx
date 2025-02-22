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
}

const DEFAULT_IMAGE_STYLING = 'mx-auto rounded-2xl'

const mediaVariants = tv({
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
  const { url, alt = '', size = 'medium', className, priority = true, quality = 75 } = props

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

  return (
    <div className="relative w-full">
      <Image
        src={url}
        alt={alt}
        fill
        sizes={`(max-width: 768px) 100vw, ${relativeSize}`}
        className={cn(mediaVariants({ size }), className)}
        priority={priority}
        quality={quality}
      />
    </div>
  )
}
