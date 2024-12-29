import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const PlusMinus: Block = {
  slug: 'plusMinus',
  interfaceName: 'PlusMinus',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'card',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'select',
          options: ['plus', 'minus'],
          required: true,
          defaultValue: 'plus',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
            },
          }),
        },
      ],
    },
  ],
}
