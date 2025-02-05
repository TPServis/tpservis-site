import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

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
    // staticDir: path.resolve(dirname, '../../public/media'),
    // handlers: [
    //   async (req, { file, data }: any) => {
    //     const { payload } = req
    //     const { filename, mimetype, buffer } = file
    //     // Upload to UploadThing
    //     const upload = await (payload as any).cloudStorage.upload({
    //       filename,
    //       mimetype,
    //       buffer,
    //       collection: 'media',
    //     })
    //     const responsePayload = {
    //       ...data,
    //       url: upload.url,
    //       filename: upload.filename,
    //       mimeType: upload.mimeType,
    //       filesize: upload.filesize,
    //       width: upload.width,
    //       height: upload.height,
    //     }
    //     return new Response(JSON.stringify(responsePayload), {
    //       headers: { 'Content-Type': 'application/json' },
    //     })
    //   },
    // ],
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
  },
}
