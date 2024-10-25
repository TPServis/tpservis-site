'use client'
import clsx from 'clsx'

import React from 'react'
import Image from 'next/image'

import { motion } from 'framer-motion'

import type { Media } from '@/payload-types'

interface HeroFloatingProps {
  mediaGroup: Media[] | any
}

export default function HeroFloating({ mediaGroup }: HeroFloatingProps) {
  return (
    <div className="col-span-2 flex items-center justify-center">
      <div className="grid gap-8 grid-rows-5 w-full grid-[repeat(2, 10vw)] ">
        <FloatingImage img={mediaGroup[0].media1} alt="Hero" className="row-start-1" delay={0} />
        <FloatingImage
          img={mediaGroup[0].media2}
          alt="Hero"
          className=" row-start-2 animate-[float_10s_ease-in-out_1s_infinite]"
          delay={0.1}
        />
        <FloatingImage
          img={mediaGroup[0].media3}
          alt="Hero"
          className="animate-[float_10s_ease-in-out_2s_infinite]"
          delay={0.2}
        />
        <FloatingImage
          img={mediaGroup[0].media4}
          alt="Hero"
          className=" animate-[float_10s_ease-in-out_3s_infinite]"
          delay={0.3}
        />
      </div>
    </div>
  )
}

interface FloatingImageProps {
  img: Media | null
  alt: string
  className?: string
  delay?: number
}

const FloatingImage = (props: FloatingImageProps) => {
  return (
    <motion.div
      className={clsx('col-span-1 row-span-2 w-[25vw] animate-float relative', props.className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: props.delay, ease: 'easeInOut' }}
    >
      <Image
        src={props.img?.url ?? ''}
        alt={props.alt}
        className="w-full h-full object-cover rounded-3xl scale-105 blur-lg brightness-100 animate-pulse opacity-50"
        quality={100}
        sizes="100vw"
        width={100}
        height={100}
      />
      <Image
        src={props.img?.url ?? ''}
        alt={props.alt}
        className="w-full h-full object-cover rounded-3xl absolute inset-0"
        quality={100}
        sizes="100vw"
        width={100}
        height={100}
      />
    </motion.div>
  )
}
