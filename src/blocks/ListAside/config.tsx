import type { Block } from 'payload'

export const ListAside: Block = {
  slug: 'listAside',
  interfaceName: 'ListAside',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'list',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'group',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: false,
            },
          ],
        },
      ],
    },
  ],
}
