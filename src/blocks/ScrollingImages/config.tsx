import type { Block } from 'payload'

export const ScrollingImages: Block = {
  slug: 'scrollingImages',
  interfaceName: 'ScrollingImages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      minRows: 6,
      maxRows: 6,
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
      ],
    },
  ],
}
