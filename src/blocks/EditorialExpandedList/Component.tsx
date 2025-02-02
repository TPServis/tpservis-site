import React from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import RichText from '@/components/RichText'

import { PlaneIcon, TrainFront, BusFront, Shuffle } from 'lucide-react'
import { Media } from '@/components/Media'

type EditorialExpandedListProps = {
  list: {
    title: string
    icon: string
    elements: {
      blockType: string
      content: string
    }[]
  }[]
}

export const EditorialExpandedListComponent = (props: EditorialExpandedListProps) => {
  console.log(props)
  // If "data" is not provided, simply render nothing.
  if (!props) return null

  // data.list is expected to be the array of list items from your block
  return (
    <div className="editorial-expanded-list container-spacing pb-48">
      {props.list?.map((item: any, index: number) => (
        <section
          key={index}
          className="editorial-item py-10 border-t border-shark-200 container-wrapper grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 not-first:mt-14"
        >
          <div className="flex items-start gap-4 col-span-2">
            {item.icon && (
              <div className="flex items-center bg-amber-500 w-10 h-10 rounded-full justify-center">
                <Icon icon={item.icon} className="w-6 h-6 text-white" />
              </div>
            )}
            <h3 className="text-4xl font-bold text-heading mb-2">{item.title}</h3>
          </div>
          <div className="col-span-3">
            {item.elements && item.elements.length > 0 && (
              <div className="elements">
                {item.elements.map((element: any, idx: number) => {
                  // element.blockType is determined by the block slug from config
                  switch (element.blockType) {
                    case 'richTextElement':
                      return (
                        <div key={idx} className="mb-4">
                          <RichText
                            content={element.content}
                            className="text-base md:text-lg text-secondary mx-0"
                          />
                        </div>
                      )
                    case 'imageElement':
                      return (
                        <div key={idx} className="mb-4 w-full overflow-hidden rounded-lg">
                          <Media
                            resource={element.image}
                            className="rounded-3xl overflow-hidden w-full h-[300px] md:h-[500px] *:w-full *:h-full *:object-cover *:object-center"
                          />
                        </div>
                      )
                    case 'ctaElement':
                      return (
                        <div key={idx} className="mb-4">
                          {element.url && element.label && (
                            <NextLink
                              href={element.url}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                            >
                              {element.label}
                            </NextLink>
                          )}
                        </div>
                      )
                    default:
                      return null
                  }
                })}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

const Icon = ({ icon, className }: { icon: string; className: string }) => {
  if (icon === 'plane') return <PlaneIcon className={className} />
  if (icon === 'train') return <TrainFront className={className} />
  if (icon === 'bus') return <BusFront className={className} />
  if (icon === 'shuffle') return <Shuffle className={className} />
}

export default EditorialExpandedListComponent
