'use client'

import { motion, useSpring, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { StaticImageData } from 'next/image'

import Image from 'next/image'

import React from 'react'

import { useScroll } from 'framer-motion'
import { useRef } from 'react'

interface ScrollingImagesProps {
  title: string
  images: {
    image: StaticImageData
    title: string
  }[]
}

export const ScrollingImages = (props: ScrollingImagesProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const dataRow1 = props.images.slice(0, 3)
  const dataRow2 = props.images.slice(3)

  return (
    <div ref={ref} className="pb-20">
      <div className="w-full container-spacing !pb-10">
        <div className="container-wrapper pb-0">
          <h2 className="text-6xl font-bold text-astral-900 pb-4">Популярні напрямки</h2>
        </div>
      </div>
      <HomeScrollingRow direction="left" items={dataRow1} scrollYProgress={scrollYProgress} />
      <HomeScrollingRow direction="right" items={dataRow2} scrollYProgress={scrollYProgress} />
    </div>
  )
}

type HomeScrollingRowProps = {
  direction: 'left' | 'right'
  items: HomeScrollingRowItem[]
  scrollYProgress: MotionValue<number>
}

export default function HomeScrollingRow(props: HomeScrollingRowProps) {
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
          <HomePopularDestinationItem key={item.title} title={item.title} image={item.image} />
        ))}
      </motion.div>
    </div>
  )
}

type HomeScrollingRowItem = {
  title: string
  image: StaticImageData
}

const HomePopularDestinationItem = (props: HomeScrollingRowItem) => {
  return (
    <div className="w-40vw aspect-video rounded-3xl overflow-hidden col-span-1 relative">
      <Image
        src={props.image}
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
