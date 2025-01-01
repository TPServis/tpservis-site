import React from 'react'
import RichText from '@/components/RichText'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { cva } from 'class-variance-authority'

export type PlusMinusBlock = {
  blockType: 'plusMinus'
  heading: string
  card: {
    value: 'plus' | 'minus'
    content: any
    id: string
  }[]
  id: string
}

const cardVariants = cva(['border rounded-lg p-4 flex-1 w-1/3 min-w-[200px]'], {
  variants: {
    value: {
      plus: 'border-green-500/20 bg-green-50',
      minus: 'border-red-500/20 bg-red-50',
    },
  },
})

const iconVariants = cva(['text-2xl font-semibold pb-4 pt-8'], {
  variants: {
    value: {
      plus: 'text-green-500',
      minus: 'text-red-500',
    },
  },
})

const PlusMinus = (props: PlusMinusBlock) => {
  return (
    <div className="!mb-8">
      <h3 className="text-2xl font-semibold text-text-heading pb-4 pt-8">{props.heading}</h3>
      <div className="flex flex-wrap gap-4">
        {props.card.map((card) => (
          <div key={card.id} className={cardVariants({ value: card.value })}>
            <h4 className={iconVariants({ value: card.value })}>
              {card.value === 'plus' ? <ThumbsUp /> : <ThumbsDown />}
            </h4>
            <RichText content={card.content} className="text-shark-600 prose rich-text" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PlusMinus
