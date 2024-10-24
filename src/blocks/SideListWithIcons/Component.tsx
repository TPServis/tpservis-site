import React from 'react'
import NextLink from 'next/link'

import { PiAirplaneTakeoff, PiBus, PiTrain } from 'react-icons/pi'
import RichText from '@/components/RichText'

type SideListWithIconsProps = {
  pretitle: string
  title: string
  subtitle: any
  cta: {
    url: string
    label: string
  }
  items: {
    icon: string
    title: string
    description: any
  }[]
}

export const SideListWithIcons = (props: SideListWithIconsProps) => {
  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <div className="grid grid-cols-5 gap-8 items-center">
          <div className="col-span-3">
            <h3 className="text-sm uppercase text-shark-500 pb-7 ">{props.pretitle}</h3>
            <h2 className="text-6xl font-bold text-astral-900 pb-6">{props.title}</h2>
            <RichText
              className="text-lg text-shark-500 pb-20 pt-4 text-balance"
              content={props.subtitle}
              enableGutter={false}
            />
            {props.cta && props.cta.url && props.cta.label && (
              <NextLink
                href={props.cta.url}
                className=" text-lg relative rounded-2xl px-8 py-4 text-white bg-jaffa-400 transition-all duration-300 gap-4 capitalize font-bold hover:bg-jaffa-500 hover:translate-y-1 block w-fit"
              >
                <span>{props.cta.label}</span>
              </NextLink>
            )}
          </div>
          <div className="col-span-2">
            {props.items.map((item, index) => (
              <SideListWithIconsItem key={index} title={item.title} description={item.description}>
                {item.icon === 'airplane' && (
                  <PiAirplaneTakeoff className="text-jaffa-400 text-4xl" />
                )}
                {item.icon === 'bus' && <PiBus className="text-jaffa-400 text-4xl" />}
                {item.icon === 'train' && <PiTrain className="text-jaffa-400 text-4xl" />}
              </SideListWithIconsItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

type SideListWithIconsItemProps = {
  children: React.ReactNode
  title: string
  description: any
}

const SideListWithIconsItem = (props: SideListWithIconsItemProps) => {
  return (
    <div className=" py-8 border-t border-shark-100">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">{props.children}</div>
        <div className="col-span-2">
          <h3 className="text-xl font-bold text-astral-900 pb-4">{props.title}</h3>
          <RichText
            className="text-lg text-shark-500"
            content={props.description}
            enableGutter={false}
          />
        </div>
      </div>
    </div>
  )
}
