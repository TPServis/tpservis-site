import React from 'react'
import RichText from '@/components/RichText'
import useEmblaCarousel from 'embla-carousel-react'
// import { RenderBlocks } from '../RenderBlocks'

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

const PlusMinus = (props: PlusMinusBlock) => {
  const [emblaRef] = useEmblaCarousel()

  return (
    <div>
      <h2>{props.heading}</h2>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {props.card.map((card) => (
            <div key={card.id} className="embla__slide">
              <h3>{card.value}</h3>
              <RichText content={card.content} className="text-shark-600 prose rich-text" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PlusMinus
