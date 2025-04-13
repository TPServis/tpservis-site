import React from 'react'
import { Room, TourSearchResultType } from './types'
import RoomDrawer from './RoomDrawer'
import type { Form } from '@/payload-types'

type RoomCardProps = {
  room: Room
  hotel: TourSearchResultType
  form: Form
}

const RoomCard = ({ room, hotel, form }: RoomCardProps) => {
  const price = room.price_uah.toLocaleString('uk-UA')
  const title = room.title.length <= 3 ? hotel.title + ' ' + room.title : room.title

  return (
    <div className=" bg-astral-50 rounded-xl p-4 col-span-4 text-astral-900 font-light flex flex-col gap-2">
      <h3 className="font-bold text-2xl">{title}</h3>
      {/* <p>{room.price_usd}</p> */}
      <div className="flex flex-col gap-2 h-full">
        <p className="text-sm">
          Тип харчування: <span className="font-bold text-base">{room.meal_type}</span>
        </p>
        <div className="flex gap-2 justify-between *:items-baseline *:flex *:gap-1 *:text-sm *:[&>span]:font-bold *:[&>span]:text-base">
          <p>
            Ночей у турі:
            <span>{room.nights}</span>
          </p>
          <p>
            з<span>{room.date_from}</span>
            до
            <span>{room.date_till}</span>
          </p>
        </div>
        <div className="flex justify-end grow items-end">
          <p className="text-lg flex gap-1 items-baseline">
            <span className="text-sm">Ціна за номер</span>
            <span className="font-bold text-lg">{price}</span>
            <span className="text-sm">грн</span>
          </p>
        </div>
        <RoomDrawer room={room} form={form} hotel={hotel}>
          замовити
        </RoomDrawer>
      </div>
    </div>
  )
}

export default RoomCard
