'use client'

import { useRef } from 'react'
import { useScroll } from 'framer-motion'
import ScrollingRow from './ScrollingRow'
import type {
  Media,
  PopularDestinationsGallery as PopularDestinationsGalleryType,
} from '@/payload-types'

interface PopularDestinationsGalleryProps {
  title: string
  rows: {
    items: {
      image: Media
      title: string
    }[]
  }[]
}

export const PopularDestinationsGallery = (props: PopularDestinationsGalleryProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  return (
    <div ref={ref} className="pb-20">
      <div className="w-full container-spacing !pb-10">
        <div className="container-wrapper pb-0">
          <h2 className="text-6xl font-bold text-astral-900 pb-4">{props.title}</h2>
        </div>
      </div>
      {props.rows.map((row, index) => (
        <ScrollingRow
          key={index}
          items={row.items}
          scrollYProgress={scrollYProgress}
          direction={index % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </div>
  )
}
