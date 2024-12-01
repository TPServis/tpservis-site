import type { Block } from 'payload'

export const PopularDestinationsGallery: Block = {
  slug: 'popularDestinationsGallery',
  interfaceName: 'PopularDestinationsGallery',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'rows',
      type: 'array',
      fields: [
        {
          name: 'items',
          type: 'array',
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
    },
  ],
}
