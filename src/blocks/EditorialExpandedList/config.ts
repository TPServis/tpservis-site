import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const EditorialExpandedList: Block = {
  slug: 'editorialExpandedList',
  interfaceName: 'EditorialExpandedList',
  fields: [
    {
      name: 'list',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Plane',
              value: 'plane',
            },
            {
              label: 'Train',
              value: 'train',
            },
            {
              label: 'Bus',
              value: 'bus',
            },
            {
              label: 'Shuffle',
              value: 'shuffle',
            },
          ],
        },
        {
          name: 'elements',
          type: 'blocks',
          label: 'Content Elements',
          blocks: [
            {
              slug: 'richTextElement',
              labels: {
                singular: 'Text',
                plural: 'Texts',
              },
              fields: [
                {
                  name: 'content',
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
            {
              slug: 'imageElement',
              labels: {
                singular: 'Image',
                plural: 'Images',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
            },
            {
              slug: 'ctaElement',
              labels: {
                singular: 'Call To Action',
                plural: 'Calls To Action',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                },
                {
                  name: 'url',
                  type: 'text',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
