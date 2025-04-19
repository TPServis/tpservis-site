import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { FormBlock } from '../Form/config'

export const CustomForm: Block = {
  slug: 'customForm',
  interfaceName: 'CustomForm',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Section Heading',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'orderInverted',
      type: 'checkbox',
      label: 'Order Inverted',
      defaultValue: false,
    },
    {
      name: 'formBlock',
      type: 'blocks',
      blocks: [FormBlock],
      required: true,
      maxRows: 1,
      labels: {
        singular: 'Form',
        plural: 'Forms',
      },
    },
  ],
  labels: {
    plural: 'Custom Form Blocks',
    singular: 'Custom Form Block',
  },
}
