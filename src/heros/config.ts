import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'preTitle',
      type: 'text',
      label: 'Pre Title',
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
    },

    {
      name: 'cta',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
        },
      ],
    },
    {
      name: 'mediaGroup',
      type: 'array',
      fields: [
        {
          name: 'media1',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'media2',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'media3',
          type: 'upload',

          relationTo: 'media',
          required: true,
        },
        {
          name: 'media4',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
  label: false,
}
