'use client'

import React from 'react'
import NextLink from 'next/link'
import { ChevronRight } from 'lucide-react'
import RichText from '@/components/RichText'

import Image from 'next/image'

import { useRef } from 'react'
import { useScroll, motion, useTransform, useSpring } from 'framer-motion'

interface ImageWithInfoGridProps {
  title: string
  subtitle: any
  cta: {
    url: string
    label: string
  }
  image: {
    url: string
    alt: string
  }
  items: {
    title: string
    description: any
  }[]
}
export const ImageWithInfoGrid = (props: ImageWithInfoGridProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const ySpring = useSpring(y, { stiffness: 200, damping: 40, mass: 1 })

  return (
    <div className="w-full container-spacing pt-48">
      <div className="container-wrapper grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 pb-6 md:pb-10">
        <div className="md:col-span-3 row-span-1 w-[80%]">
          <h2 className="md:text-6xl text-3xl font-bold text-heading">{props.title}</h2>
        </div>
        <div className="col-span-2 row-span-1">
          <RichText
            content={props.subtitle}
            enableGutter={false}
            className="text-lg text-shark-400 pb-6"
          />
          {props.cta && props.cta.url && (
            <NextLink
              href={props.cta.url}
              className="text-xl rounded-full py-7 text-jaffa-400 transition-all duration-300 flex items-center gap-4 uppercase font-bold hover:gap-6
            "
            >
              <span>{props.cta.label}</span>
              <ChevronRight className="w-7 h-7" />
            </NextLink>
          )}
        </div>
      </div>
      {props.image && (
        <div
          className="container-wrapper rounded-3xl overflow-hidden aspect-square md:aspect-[2/1] mb-16 relative"
          ref={ref}
        >
          <motion.div
            style={{ y: ySpring }}
            className="absolute w-full h-auto top-1/2 -translate-y-1/2"
          >
            <Image
              src={props.image.url}
              alt={props.image.alt}
              className="w-full h-full object-cover"
              sizes="100vw"
              width={2000}
              height={2000}
              priority
              quality={80}
            />
          </motion.div>
        </div>
      )}
      <div className="container-wrapper grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {props.items &&
          props.items.map((item, index) => (
            <div className="col-span-1" key={index}>
              <h3 className="text-2xl font-bold text-astral-900 pb-6">{item.title}</h3>
              <RichText
                content={item.description}
                enableGutter={false}
                className="text-lg text-shark-400"
              />
            </div>
          ))}
      </div>
    </div>
  )
}
