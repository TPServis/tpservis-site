import type { Block } from 'payload'

export const DownloadableFiles: Block = {
  slug: 'downloadableFiles',
  interfaceName: 'DownloadableFiles',
  fields: [
    {
      name: 'files',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'withLateralSpacing',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Label',
    },
  ],
}
