'use client'

import { FormBlock } from '@/blocks/Form/Component'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import type { Form } from '@/payload-types'
import { type JSX, useState } from 'react'
import { Stars } from './Stars'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Room, TourSearchResultType } from './types'

type RoomDrawerProps = {
  children: React.ReactNode
  room: Room
  form: Form
  hotel: TourSearchResultType
}

const RoomDrawer = (props: RoomDrawerProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  // TODO: structure this into a function
  const hotelData = Object.entries(props.hotel)
    .filter(([key]) => key !== 'rooms')
    .map(([key, value]) => {
      if (key === 'title') return ['hotel_name', value]
      return [key, value]
    })

  const entries = Object.entries({
    ...props.room,
  })

  // TODO: fix this any
  entries.push(...(hotelData as any))

  const customData = entries.map(([key, value]) => {
    return {
      [key]: value,
    }
  })

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerTrigger asChild>
        <button
          aria-label="order"
          className="w-full bg-astral-600 text-astral-50 rounded-xl p-2 font-bold"
        >
          {props.children}
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-screen bg-white border-none text-shark-900">
        <div className="flex flex-col h-full container-wrapper mt-0">
          <DrawerHeader>
            <div>
              <DrawerTitle className="font-bold text-2xl lg:text-4xl">
                {props.hotel.title} · {props.room.title}
                <div className="inline-block ml-2 align-middle">
                  <Stars number={props.hotel.stars} />
                </div>
              </DrawerTitle>
            </div>
            <DrawerDescription>{props.hotel.location}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto flex-1 flex flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-8 w-full lg:w-1/2">
              <RoomData room={props.room} />
            </div>
            <div className="w-full lg:w-1/2 pb-10">
              <FormBlock enableIntro={false} form={props.form as any} customData={customData} />
              <p className="text-sm pt-4 text-shark-500">
                Наш менеджер-консультант зв&apos;яжеться з вами, щоб обговорити деталі вашої
                подорожі, способи оплати та отримання документів. Під час розмови ви зможете внести
                зміни до замовлення, якщо знайдете вигідніший варіант. <br /> <br />
                <span className="font-bold">
                  Надсилання замовлення не зобов&apos;язує вас бронювати тур.
                </span>
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default RoomDrawer

const RoomData = ({ room }: { room: Room }) => {
  const [isUSD, setIsUSD] = useState(false)
  const price = isUSD
    ? room.price_usd.toLocaleString('en-US')
    : room.price_uah.toLocaleString('uk-UA')
  return (
    <div className="flex flex-col gap-2">
      <div className="border-b border-shark-200 pb-4">
        <div className="flex justify-between">
          <p className="text-sm">Ціна за номер</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="text-sm font-bold text-shark-500 bg-shark-100 rounded-lg px-2 py-1"
                  onClick={() => setIsUSD(!isUSD)}
                >
                  {isUSD ? 'грн' : '$'}
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-jaffa-200 text-jaffa-900 font-bold">
                <p>Змінити валюту</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xl lg:text-3xl font-bold" onClick={() => setIsUSD(!isUSD)}>
          {price} {isUSD ? '$' : 'грн'}
        </p>
      </div>
      <div className="border-b border-shark-200 pb-4">
        <p className="text-sm">Тип харчування</p>
        <p className="text-xl lg:text-3xl font-bold">{room.meal_type}</p>
      </div>
      <p className="text-sm">Ночей у турі:</p>
      <div className="flex justify-between">
        <span className="font-bold text-xl lg:text-3xl">{room.nights}</span>
        <p className="text-sm flex gap-2 items-baseline">
          з<span className="font-bold text-xl lg:text-3xl">{room.date_from}</span>
          до<span className="font-bold text-xl lg:text-3xl">{room.date_till}</span>
        </p>
      </div>
    </div>
  )
}
