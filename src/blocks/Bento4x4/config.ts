import type { Block } from 'payload'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const Bento4x4: Block = {
  slug: 'bento4x4',
  interfaceName: 'Bento4x4',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      minRows: 4,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
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
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures]
            },
          }),
        },
      ],
    },
  ],
}
