'use client'
import { motion, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'

import type { Media } from '@/payload-types'
import Image from 'next/image'

interface ScrollingRowProps {
  items: {
    image: Media
    title: string
  }[]
  scrollYProgress: MotionValue<number>
  direction: 'left' | 'right'
}

export default function ScrollingRow(props: ScrollingRowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const widthDifference = 400

  const x = useTransform(
    props.scrollYProgress,
    [0, 1],
    props.direction === 'left' ? [0, -widthDifference] : [-widthDifference, 0],
  )
  const xSpring = useSpring(x, { stiffness: 200, damping: 40, mass: 1 })

  return (
    <div className="w-full overflow-hidden pb-8" ref={ref}>
      <motion.div className="grid grid-cols-3 w-[130vw] gap-8" style={{ x: xSpring }}>
        {props.items.map((item) => (
          <ScrollingRowItem key={item.title} title={item.title} image={item.image} />
        ))}
      </motion.div>
    </div>
  )
}

type ScrollingRowItem = {
  title: string
  image: Media
}

const ScrollingRowItem = (props: ScrollingRowItem) => {
  return (
    <div className="w-40vw aspect-video rounded-3xl overflow-hidden col-span-1 relative">
      <Image
        src={props.image.url || ''}
        alt={props.title}
        className="w-full h-full object-cover"
        sizes="33vw"
        width={0}
        height={0}
      />
      <div className="absolute bottom-4 left-4 p-2 px-6 bg-white/80 rounded-lg backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-astral-900">{props.title}</h3>
      </div>
    </div>
  )
}
