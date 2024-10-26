import React from 'react'
import { MdSupportAgent } from 'react-icons/md'
import { BsPersonBoundingBox } from 'react-icons/bs'
import { FaRegRectangleList } from 'react-icons/fa6'

import RichText from '@/components/RichText'

interface HorizontalIconsGroupProps {
  pretitle: string
  title: string
  items: {
    icon: string
    title: string
    description: any
  }[]
}

export const HorizontalIconsGroup = (props: HorizontalIconsGroupProps) => {
  return (
    <div className="w-full container-spacing">
      <div className="container-wrapper">
        {props.pretitle && (
          <h3 className="text-sm font-bold text-shark-400 pb-6 uppercase">{props.pretitle}</h3>
        )}
        {props.title && (
          <h2 className="md:text-6xl text-3xl font-bold text-astral-900 pb-16">{props.title}</h2>
        )}
        <div className="grid md:grid-cols-3 gap-8 md:gap-16">
          {props.items &&
            props.items.map((item, index) => (
              <HomeWhyUsItem
                key={index}
                title={item.title}
                description={item.description}
                icon={
                  item.icon === 'MdSupportAgent' ? (
                    <MdSupportAgent className="w-6 h-6" />
                  ) : item.icon === 'BsPersonBoundingBox' ? (
                    <BsPersonBoundingBox className="w-6 h-6" />
                  ) : (
                    <FaRegRectangleList className="w-6 h-6" />
                  )
                }
              />
            ))}
        </div>
      </div>
    </div>
  )
}

type HomeWhyUsItemProps = {
  title: string
  description: Record<string, any>
  icon: React.ReactNode
}

const HomeWhyUsItem = (props: HomeWhyUsItemProps) => {
  return (
    <div className="md:border-l-2 border-shark-100 md:pl-10 py-4 md:py-10">
      <div className="bg-jaffa-400 rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl mb-4 md:mb-12 shadow-lg shadow-jaffa-400/50">
        {props.icon}
      </div>
      <h3 className="text-2xl font-bold text-astral-900 pb-6">{props.title}</h3>
      <RichText
        content={props.description}
        enableGutter={false}
        className="text-lg text-shark-500 text-balance"
      />
    </div>
  )
}
