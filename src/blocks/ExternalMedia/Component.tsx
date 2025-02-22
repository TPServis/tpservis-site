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

const mediaVariants = tv({
  base: 'mx-auto',
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
  console.log('url', url)

  if (!url) {
    throw new Error('URL is required')
  }

  try {
    new URL(url)
  } catch (error) {
    throw new Error('Invalid URL')
  }

  return (
    <Image
      src={url}
      alt={alt}
      width={1000}
      height={1000}
      className={cn(mediaVariants({ size }), className)}
      priority={priority}
      quality={quality}
    />
  )
}
