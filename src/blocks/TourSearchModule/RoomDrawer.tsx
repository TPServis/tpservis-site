'use client'

import { useState, type JSX } from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer'
import { Room } from './types'

type RoomDrawerProps = {
  children: React.ReactNode
  room: Room
}

const RoomDrawer = ({ children, room }: RoomDrawerProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground={true}>
      <DrawerTrigger asChild>
        <button
          aria-label="order"
          className="w-full bg-astral-600 text-astral-50 rounded-xl p-2 font-bold"
        >
          {children}
        </button>
      </DrawerTrigger>
      <DrawerContent className="h-screen !bg-astral-50 border-none">
        <div>
          <DrawerHeader>
            <DrawerTitle className="text-astral-900 font-bold text-4xl">{room.title}</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col gap-8 p-4 h-screen">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Ціна за номер</p>
              <p className="text-3xl font-bold">{room.price_uah.toLocaleString('uk-UA')} грн</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Тип харчування</p>
              <p className="text-3xl font-bold">{room.meal_type}</p>
            </div>
          </div>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <button
                aria-label="close"
                className="w-full bg-astral-600 text-astral-50 rounded-xl p-2 font-bold"
              >
                Закрити
              </button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default RoomDrawer
