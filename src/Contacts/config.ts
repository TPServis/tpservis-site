import type { GlobalConfig } from 'payload'

export const Contacts: GlobalConfig = {
  slug: 'contacts',
  fields: [
    {
      name: 'email',
      type: 'text',
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone',
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
        },
        {
          name: 'maps',
          type: 'text',
          label: 'Google Maps Link',
        },
      ],
    },
    {
      name: 'social',
      type: 'array',
      label: 'Social',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
        },
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook',
        },
      ],
      maxRows: 1,
    },
  ],
}
