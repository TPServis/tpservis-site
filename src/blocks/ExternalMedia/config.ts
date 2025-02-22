import type { Block } from 'payload'

export const ExternalMedia: Block = {
  slug: 'externalMedia',
  interfaceName: 'ExternalMedia',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'https://',
      },
    },
    {
      name: 'alt',
      type: 'text',
      admin: {
        description: 'Describe the image for accessibility',
      },
    },
    {
      name: 'priority',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'className',
      type: 'text',
      admin: {
        description: 'Add custom Tailwind classes to the image',
      },
    },
    {
      name: 'quality',
      type: 'number',
      defaultValue: 75,
      admin: {
        description: 'Quality of the image',
      },
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Small', value: 'small' },
        { label: 'Medium', value: 'medium' },
        { label: 'Large', value: 'large' },
        { label: 'Full', value: 'full' },
      ],
    },
  ],
}
