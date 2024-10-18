import clsx from 'clsx'
import React from 'react'
import RichText from '@/components/RichText'

export type TextAsideProps = {
  className?: string
  introContent?: any
  title?: string
  subtitle?: string
  content?: any
}

export const TextAside = (props) => {
  return (
    <div className="w-full container-spacing pt-48">
      <div className="container-wrapper grid grid-cols-5">
        <div className="col-span-3 row-span-1 w-[80%]">
          <h2 className="text-6xl font-bold text-astral-900">{props.title}</h2>
        </div>
        <div className="col-span-2 row-span-1">
          <h3 className="text-3xl font-bold text-astral-900 pb-6">{props.subtitle}</h3>
          <RichText
            content={props.content}
            enableGutter={false}
            className="text-lg text-shark-400 pb-6"
          />
        </div>
      </div>
    </div>
  )
}
