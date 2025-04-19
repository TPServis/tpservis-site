'use client'
import clsx from 'clsx'

import Image from 'next/image'
import React from 'react'

import { motion } from 'motion/react'

import type { Media } from '@/payload-types'

interface HeroFloatingProps {
  mediaGroup: {
    media1: Media | null
  }[]
}

export default function HeroFloating({ mediaGroup }: HeroFloatingProps) {
  return (
    <div className="col-span-2 flex items-center justify-center relative md:translate-y-0 md:h-auto my-10 md:w-1/2 -translate-x-1/4 md:translate-x-0">
      <div className="grid md:gap-8 gap-2 grid-rows-5 w-full grid-[repeat(2, 10vw)] ">
        {mediaGroup[0]?.media1 && (
          <FloatingImage img={mediaGroup[0]?.media1} alt="Hero" className="row-start-1" delay={0} />
        )}
        {mediaGroup[1]?.media1 && (
          <FloatingImage
            img={mediaGroup[1]?.media1}
            alt="Hero"
            className=" row-start-2 animate-[float_10s_ease-in-out_1s_infinite]"
            delay={0.2}
          />
        )}
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
  const src = `https://utfs.io/f/${props.img?._key}` || props.img?.url || ''

  return (
    <motion.div
      className={clsx(
        'col-span-1 row-span-4 min-w-[250px] w-[60vw] md:w-[25vw] animate-float relative aspect-[3/4]',
        props.className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: props.delay, ease: 'easeInOut' }}
    >
      <Image
        src={src}
        alt={props.alt}
        className="w-full h-full object-cover rounded-3xl scale-105 blur-lg brightness-100 animate-pulse opacity-50"
        quality={10}
        sizes="20vw"
        width={100}
        height={100}
      />
      <Image
        src={src}
        alt={props.alt}
        className="w-full h-full object-cover rounded-3xl absolute inset-0"
        quality={70}
        sizes="20vw"
        width={100}
        height={100}
        priority
        loading="eager"
      />
    </motion.div>
  )
}
