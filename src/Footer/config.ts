import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Left Navigation',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'rightNavItems',
      label: 'Right Navigation',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
    {
      name: 'contactInfo',
      label: 'Contact Info',
      type: 'group',
      fields: [
        {
          name: 'telephoneLabel',
          label: 'Telephone Info',
          type: 'group',
          fields: [
            {
              name: 'telephone',
              label: 'Telephone Number',
              type: 'text',
              required: false,
            },
            {
              name: 'label',
              label: 'Label',
              type: 'text',
            },
          ],
        },
        {
          name: 'email',
          type: 'email',
          required: false,
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      type: 'group',
      admin: {
        description: 'Add links to your social media profiles here.',
      },
      fields: [
        {
          name: 'facebook',
          label: 'Facebook',
          type: 'text',
        },
        {
          name: 'instagram',
          label: 'Instagram',
          type: 'text',
        },
      ],
    },
    {
      name: 'copyright',
      label: 'Copyright Label',
      type: 'text',
    },
    {
      name: 'legalLinks',
      label: 'Legal Links',
      type: 'array',
      fields: [link()],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
