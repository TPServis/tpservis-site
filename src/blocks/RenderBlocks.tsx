import { cn } from 'src/utilities/cn'
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { TextAside } from '@/blocks/TextAside/Component'
import { ListAside } from '@/blocks/ListAside/Component'
import { ImageWithInfoGrid } from '@/blocks/ImageWithInfoGrid/Component'
import { HorizontalIconsGroup } from '@/blocks/HorizontalIconsGroup/Components'
import { PopularDestinationsGallery } from '@/blocks/PopularDestinationsGallery/Component'
import { SideListWithIcons } from '@/blocks/SideListWithIcons/Component'
import { Bento4x4 } from '@/blocks/Bento4x4/Component'
import { FAQ } from '@/blocks/FAQ/Component'
import { ServicesList } from '@/blocks/ServicesList/Component'
import { CustomForm } from '@/blocks/CustomForm/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  listAside: ListAside,
  textAside: TextAside,
  imageWithInfoGrid: ImageWithInfoGrid,
  horizontalIconsGroup: HorizontalIconsGroup,
  popularDestinationsGallery: PopularDestinationsGallery,
  sideListWithIcons: SideListWithIcons,
  bento4x4: Bento4x4,
  faq: FAQ,
  servicesList: ServicesList,
  customForm: CustomForm,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div key={index}>
                  <Block {...block} />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
