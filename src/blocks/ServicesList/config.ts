import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  BlockquoteFeature,
  BlockFields,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

export const ServicesList: Block = {
  slug: 'servicesList',
  interfaceName: 'ServicesList',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        // flexible content
        {
          name: 'content',
          type: 'blocks',
          blocks: [
            {
              slug: 'contentBlock',
              fields: [
                {
                  name: 'description',
                  type: 'richText',
                  required: true,
                  editor: lexicalEditor({
                    features: ({ rootFeatures }) => {
                      return [
                        ...rootFeatures,
                        HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                        FixedToolbarFeature(),
                        InlineToolbarFeature(),
                        BlockquoteFeature(),
                        OrderedListFeature(),
                        UnorderedListFeature(),
                      ]
                    },
                  }),
                },
              ],
            },
            {
              slug: 'ctaBlock',
              fields: [
                {
                  name: 'cta',
                  type: 'relationship',
                  relationTo: 'pages',
                  admin: {
                    description: 'The page to link to',
                  },
                },
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              slug: 'imageBlock',
              fields: [
                {
                  name: 'media',
                  type: 'group',
                  fields: [
                    {
                      name: 'image',
                      type: 'upload',
                      relationTo: 'media',
                      admin: {
                        description: 'The image of the service',
                      },
                    },
                    {
                      name: 'f',
                      label: 'Format',
                      type: 'select',
                      options: [
                        { label: 'Square', value: 'square' },
                        { label: 'Landscape', value: 'landscape' },
                      ],
                      defaultValue: 'landscape',
                      admin: {
                        description: 'The format of the media',
                      },
                    },
                    {
                      name: 'bR',
                      label: 'Border Radius',
                      type: 'select',
                      options: [
                        { label: 'None', value: 'none' },
                        { label: 'Small', value: 'small' },
                        { label: 'Medium', value: 'medium' },
                        { label: 'Large', value: 'large' },
                      ],
                      defaultValue: 'large',
                      admin: {
                        description: 'The border radius of the media',
                      },
                    },
                    {
                      name: 'w',
                      label: 'Width',
                      type: 'select',
                      options: [
                        { label: 'Full', value: 'full' },
                        { label: 'Half', value: 'half' },
                      ],
                      defaultValue: 'full',
                      admin: {
                        description: 'The width of the media',
                      },
                    },
                    {
                      name: 'align',
                      label: 'Alignment',
                      type: 'select',
                      options: [
                        { label: 'Left', value: 'left' },
                        { label: 'Right', value: 'right' },
                      ],
                      admin: {
                        description: 'The alignment of the media',
                        condition: (data, siblingData) => siblingData?.w !== 'full',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
