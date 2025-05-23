'use client'
import { motion, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { useRef } from 'react'

import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

interface ScrollingRowProps {
  items: {
    image: MediaType
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
    <div className="w-full overflow-hidden pb-2 md:pb-8" ref={ref}>
      <motion.div
        className="grid grid-cols-[repeat(3,max(40vw,300px))] grid-flow-col gap-2 md:gap-8"
        style={{ x: xSpring }}
      >
        {props.items.map((item) => (
          <ScrollingRowItem key={item.title} title={item.title} image={item.image} />
        ))}
      </motion.div>
    </div>
  )
}

type ScrollingRowItem = {
  title: string
  image: MediaType
}

const ScrollingRowItem = (props: ScrollingRowItem) => {
  return (
    <div className="min-w-[300px] aspect-video rounded-3xl overflow-hidden col-span-1 relative">
      <Media
        resource={props.image}
        className="w-full h-full object-cover *:w-full *:h-auto *:object-cover *:object-center"
        size="33vw"
        quality={70}
      />
      <div className="absolute bottom-4 left-4 p-2 px-6 bg-white/80 rounded-lg backdrop-blur-sm">
        <h3 className="text-2xl font-bold text-astral-900">{props.title}</h3>
      </div>
    </div>
  )
}
