'use client'

import { useState, type JSX } from 'react'

import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Room } from './types'

type RoomDrawerProps = {
  children: React.ReactNode
  room: Room
}

const RoomDrawer = ({ children, room }: RoomDrawerProps): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          aria-label="order"
          className="w-full bg-astral-600 text-astral-50 rounded-xl p-2 font-bold"
        >
          {children}
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <p>{room.title}</p>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default RoomDrawer
