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
      name: 'container',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None (No Container)', value: 'none' },
        { label: 'Horizontal (Left & Right Spacing)', value: 'horizontal' },
        { label: 'Vertical (Top & Bottom Spacing)', value: 'vertical' },
        { label: 'Full (All around spacing)', value: 'full' },
      ],
      admin: {
        description: 'Align the image with the rest of the content',
      },
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
      name: 'aspectRatio',
      type: 'select',
      defaultValue: '16/9',
      options: [
        { label: '1:1', value: '1/1' },
        { label: '16:9', value: '16/9' },
        { label: '9:16', value: '9/16' },
        { label: '4:3', value: '4/3' },
        { label: '3:4', value: '3/4' },
        { label: '1:2', value: '1/2' },
        { label: '2:1', value: '2/1' },
        { label: 'Custom', value: 'custom' },
      ],
    },
    {
      name: 'customAspectRatio',
      type: 'text',
      admin: {
        description: 'Enter a custom aspect ratio (e.g. 16/9)',
        condition: (data, siblingData) => siblingData?.aspectRatio === 'custom',
        placeholder: '16/9',
      },
      validate: (value) => {
        if (!value) return true // Optional unless aspectRatio is 'custom'

        const parts = value.trim().split('/')
        if (parts.length !== 2) {
          return 'Aspect ratio must be in format "width/height" (e.g. 16/9)'
        }

        const [width, height] = parts.map((part) => parseInt(part.trim(), 10))

        if (!Number.isInteger(width) || width <= 0) {
          return 'Width must be a positive integer'
        }

        if (!Number.isInteger(height) || height <= 0) {
          return 'Height must be a positive integer'
        }

        return true
      },
    },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'full',
      options: [
        { label: 'Small (400px)', value: 'small' },
        { label: 'Medium (800px)', value: 'medium' },
        { label: 'Large (1200px)', value: 'large' },
        { label: 'Full', value: 'full' },
      ],
    },
  ],
}
