import React from 'react'
import Link from 'next/link'

type ListAsideItem = {
  item: {
    title: string
    url: string
  }
}

export type ListAsideProps = {
  title: string
  list: ListAsideItem[]
}

export const ListAside = (props: ListAsideProps) => {
  return (
    <div className="w-full container-spacing pt-48">
      <div className="container-wrapper grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10">
        <div className="md:col-span-3 row-span-1 w-[80%]">
          <h2 className="md:text-6xl text-3xl font-bold text-heading">{props.title}</h2>
        </div>
        <ul className="col-span-2 row-span-1">
          {props.list.map((item, index) => (
            <ListAsideItem key={index} item={item} number={String(index + 1)} />
          ))}
        </ul>
      </div>
    </div>
  )
}

interface ListAsideItemProps {
  item: ListAsideItem
  number: string
}

const ListAsideItem = (props: ListAsideItemProps) => {
  return (
    <Link
      href={props.item.item.url && props.item.item.url !== '/' ? props.item.item.url : '/'}
      prefetch={true}
    >
      <li className="flex items-center justify-between gap-4 w-full border-t border-shark-200 py-4 md:py-7 group">
        <span className="md:text-2xl text-xl font-bold text-astral-900 group-hover:ml-2 transition-all duration-300">
          {props.item.item.title}
        </span>
        <span className="text-2xl font-bold text-astral-900/20 group-hover:text-astral-900 transition-all duration-300">
          {props.number}
        </span>
      </li>
    </Link>
  )
}
