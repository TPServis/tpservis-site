import NextImage from 'next/image'

import type { Media } from '@/payload-types'
import { cn } from '@/utilities/cn'

import RichText from '@/components/RichText'

type Bento4x4Props = {
  title: string
  cards: {
    image: Media
    title: string
    description: any
  }[]
}

export const Bento4x4 = (props: Bento4x4Props) => {
  return (
    <div className="container-spacing">
      <div className="container-wrapper">
        <h2 className="text-6xl font-bold text-astral-900 pb-10">{props.title}</h2>
        <div className="grid grid-cols-2 grid-rows-3 gap-8">
          {props.cards.map((card, index) => {
            if (index === 0 || index === 3) {
              return (
                <HomeDocumentsItem
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  className={cn(
                    'row-span-2',
                    index === 0 ? 'col-start-1 row-start-1' : 'col-start-2 row-start-2',
                  )}
                />
              )
            } else {
              return (
                <HomeDocumentsItemSmall
                  key={index}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  className={cn('row-span-1', index === 1 ? 'col-start-2' : 'col-start-1')}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

type HomeDocumentsItemProps = {
  title: string
  description: any
  image: Media
  className?: string
}

function HomeDocumentsItem(props: HomeDocumentsItemProps) {
  const cls = 'bg-astral-700 rounded-3xl p-5 col-span-1 row-span-2 group ' + props.className

  return (
    <div className={cls}>
      <div className="rounded-lg overflow-hidden aspect-[2/1] mb-4">
        <NextImage
          src={props.image.url || ''}
          alt={props.title}
          width={1000}
          height={1000}
          className=" h-full object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>
      <h3 className="text-2xl font-bold text-astral-50 pb-2">{props.title}</h3>
      <RichText
        className="text-lg text-astral-200 pb-2 text-balance"
        content={props.description}
        enableGutter={false}
      />
    </div>
  )
}

function HomeDocumentsItemSmall(props: HomeDocumentsItemProps) {
  const cls =
    'bg-astral-700 rounded-3xl p-5 col-span-1 row-span-1 flex justify-between group ' +
    props.className

  return (
    <div className={cls}>
      <div className="">
        <h3 className="text-2xl font-bold text-astral-50 pb-2">{props.title}</h3>
        <RichText
          className="text-lg text-astral-200 pb-2 text-balance"
          content={props.description}
          enableGutter={false}
        />
      </div>
      <div className="rounded-lg h-full overflow-hidden">
        <NextImage
          src={props.image.url || ''}
          alt={props.title}
          width={200}
          height={200}
          className=" h-full  object-cover group-hover:scale-110 transition-all duration-300"
        />
      </div>
    </div>
  )
}