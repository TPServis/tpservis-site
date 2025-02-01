'use client'

import type { StaticImageData } from 'next/image'
import NextImage from 'next/image'
import React from 'react'
import { cn } from 'src/utilities/cn'
import cssVariables from '@/cssVariables'
import type { Props as MediaProps } from '../types'

const { breakpoints } = cssVariables

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    onClick,
    onLoad: onLoadFromProps,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
  } = props

  const [isLoading, setIsLoading] = React.useState(true)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const {
      alt: altFromResource,
      filename: fullFilename,
      height: fullHeight,
      url,
      width: fullWidth,
      id,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const fileId = resource._key || id

    if (fileId) {
      src = `https://utfs.io/f/${fileId}`
    } else if (url) {
      src = url.startsWith('http') ? url : `${process.env.NEXT_PUBLIC_SERVER_URL}${url}`
    }
  }

  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${value}px`)
        .join(', ')

  if (!src) return null

  return (
    <NextImage
      alt={alt || ''}
      className={cn(imgClassName)}
      fill={fill}
      height={!fill ? height : undefined}
      onClick={onClick}
      onLoad={() => {
        setIsLoading(false)
        if (typeof onLoadFromProps === 'function') {
          onLoadFromProps()
        }
      }}
      priority={priority}
      quality={90}
      sizes={sizes}
      src={src}
      width={!fill ? width : undefined}
    />
  )
}
