import { BusFront, Plane } from 'lucide-react'
import React from 'react'
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'flex items-center h-full shrink-0 w-1/2 justify-center items-center rounded-[calc(0.75rem_-_0.125rem)]',
  variants: {
    active: {
      true: 'bg-jaffa-950',
      false: '',
    },
  },
})

const buttonIcon = tv({
  base: 'size-5',
  variants: {
    active: {
      true: 'text-jaffa-50',
      false: 'text-jaffa-950',
    },
  },
})

type TransportSelectorProps = {
  transportType: string
  setTransportType: (transportType: string) => void
}

const TransportSelector = ({ transportType, setTransportType }: TransportSelectorProps) => {
  return (
    <div className="flex bg-jaffa-50 rounded-xl w-full md:min-w-17 h-9 shrink-0 justify-around overflow-hidden p-0.5">
      <div
        className={button({ active: transportType === '1' })}
        onClick={() => setTransportType('1')}
      >
        <Plane className={buttonIcon({ active: transportType === '1' })} />
        <span className="sr-only">Авіа</span>
      </div>
      <div
        className={button({ active: transportType === '2' })}
        onClick={() => setTransportType('2')}
      >
        <BusFront className={buttonIcon({ active: transportType === '2' })} />
        <span className="sr-only">Автобус</span>
      </div>
    </div>
  )
}

export default TransportSelector
