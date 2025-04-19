import Link from 'next/link'
import React from 'react'

type ListAsideItem = {
  item: {
    title: string
    url: string | null
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
          <h2 className="md:text-6xl text-3xl font-bold text-heading" id="list-aside-title">
            {props.title}
          </h2>
        </div>
        <nav aria-labelledby="list-aside-title" className="col-span-2 row-span-1">
          <ul className="list-none m-0 p-0">
            {props.list.map((item, index) => (
              <ListAsideItem key={index} item={item} number={String(index + 1)} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

interface ListAsideItemProps {
  item: ListAsideItem
  number: string
}

const ListAsideItem = (props: ListAsideItemProps) => {
  const url = props.item.item.url || '/'
  const { title } = props.item.item

  return (
    <li className="m-0 p-0">
      <Link
        href={url}
        prefetch={true}
        className="flex items-center justify-between gap-4 w-full border-t border-shark-200 py-4 md:py-7 group hover:bg-shark-50/50 focus:outline-none focus:ring-2 focus:ring-astral-400 focus:ring-offset-2 rounded px-2"
      >
        <span className="md:text-2xl text-xl font-bold text-astral-900 group-hover:ml-2 transition-all duration-300">
          {title}
        </span>
        <span
          className="text-2xl font-bold text-astral-900/20 group-hover:text-astral-900 transition-all duration-300"
          aria-hidden="true"
        >
          {props.number}
        </span>
      </Link>
    </li>
  )
}
