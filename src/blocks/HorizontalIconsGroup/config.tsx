import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

export const HorizontalIconsGroup: Block = {
  slug: 'horizontalIconsGroup',
  interfaceName: 'HorizontalIconsGroup',
  fields: [
    {
      name: 'pretitle',
      type: 'text',
      required: false,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            {
              label: 'Support Agent',
              value: 'MdSupportAgent',
            },
            {
              label: 'Person Bounding Box',
              value: 'BsPersonBoundingBox',
            },
            {
              label: 'Rectangle List',
              value: 'FaRegRectangleList',
            },
          ],
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
          required: true,
        },
      ],
    },
  ],
}
