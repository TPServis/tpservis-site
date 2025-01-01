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
      name: 'buttonLabel',
      type: 'text',
      label: 'Button Label',
    },
  ],
}
