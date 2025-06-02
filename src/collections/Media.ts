import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { anyone } from "../access/anyone";


// test
export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: anyone,
    delete: anyone,
    read: anyone,
    update: anyone,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: false,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()];
        },
      }),
    },
  ],
  upload: {
    disableLocalStorage: true,
    adapter: "uploadthingStorage",
    adminThumbnail: "thumbnail",
  },
};
