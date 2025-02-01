import React from 'react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import RichText from '@/components/RichText'

import { PlaneIcon, TrainFront, BusFront, Shuffle } from 'lucide-react'

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
    <div className="editorial-expanded-list">
      {props.list?.map((item: any, index: number) => (
        <div key={index} className="editorial-item my-8 p-4 border-b">
          <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
          {item.icon && (
            // Render the icon using the value from the select field.
            <span className={`icon icon-${item.icon} inline-block mr-2`} />
          )}
          {item.elements && item.elements.length > 0 && (
            <div className="elements">
              {item.elements.map((element: any, idx: number) => {
                // element.blockType is determined by the block slug from config
                switch (element.blockType) {
                  case 'richTextElement':
                    return (
                      <div key={idx} className="mb-4">
                        <RichText content={element.content} />
                      </div>
                    )
                  case 'imageElement':
                    return (
                      <div key={idx} className="mb-4">
                        <NextImage
                          src={element.image?.url || ''}
                          alt={element.image?.alt || 'Image'}
                          width={500}
                          height={300}
                          className="object-cover"
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
      ))}
    </div>
  )
}

export default EditorialExpandedListComponent
