import type { Block } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const SideListWithIcons: Block = {
  slug: 'sideListWithIcons',
  interfaceName: 'SideListWithIcons',
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
      name: 'subtitle',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
      required: false,
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'label',
          type: 'text',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ['airplane', 'bus', 'train'],
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
              return [...rootFeatures]
            },
          }),
          required: true,
        },
      ],
    },
  ],
}
