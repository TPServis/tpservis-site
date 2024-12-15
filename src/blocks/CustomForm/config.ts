import type { Block } from 'payload'
import { FormBlock } from '../Form/config'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const CustomFormBlock: Block = {
  slug: 'customFormBlock',
  interfaceName: 'CustomFormBlock',
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
  graphQL: {
    singularName: 'CustomFormBlock',
  },
  labels: {
    plural: 'Custom Form Blocks',
    singular: 'Custom Form Block',
  },
}
