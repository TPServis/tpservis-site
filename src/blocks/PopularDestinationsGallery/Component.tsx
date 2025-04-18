'use client'

import type {
  Media,
  PopularDestinationsGallery as PopularDestinationsGalleryType,
} from '@/payload-types'
import { useScroll } from 'motion/react'
import { useRef } from 'react'
import ScrollingRow from './ScrollingRow'

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
          <h2 className="md:text-6xl text-3xl font-bold text-heading pb-4">{props.title}</h2>
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
