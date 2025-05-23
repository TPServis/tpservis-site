import type { CollectionConfig } from 'payload'

import path from 'path'
import { fileURLToPath } from 'url'
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// test
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    disableLocalStorage: true,
    mimeTypes: ['image/*', 'video/*'],
    adapter: 'uploadthingStorage',
    adminThumbnail: 'thumbnail',
  },
  // hooks: {
  //   // beforeRead: [
  //   //   ({ doc }) => {
  //   //     console.log(doc)
  //   //   },
  //   // ],
  //   beforeChange: [
  //     ({ data }) => {
  //       console.log(data)
  //     },
  //   ],
  // },
}
