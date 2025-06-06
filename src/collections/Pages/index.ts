import type { CollectionConfig } from "payload";

import { Bento4x4 } from "@/blocks/Bento4x4/config";
import { CustomForm } from "@/blocks/CustomForm/config";
import { DownloadableFiles } from "@/blocks/DownloadableFiles/config";
import { EditorialExpandedList } from "@/blocks/EditorialExpandedList/config";
import { EditorialFullFrame } from "@/blocks/EditorialFullFrame/config";
import { ExternalMedia } from "@/blocks/ExternalMedia/config";
import { FAQ } from "@/blocks/FAQ/config";
import { HorizontalIconsGroup } from "@/blocks/HorizontalIconsGroup/config";
import { MapContacts } from "@/blocks/MapContacts/config";
import { PopularDestinationsGallery } from "@/blocks/PopularDestinationsGallery/config";
import { ServicesList } from "@/blocks/ServicesList/config";
import { SideListWithIcons } from "@/blocks/SideListWithIcons/config";
import { TourSearchModule } from "@/blocks/TourSearchModule/config";
import { TourSearchModuleITTour } from "@/blocks/TourSearchModuleITTour/config";
import { slugField } from "@/fields/slug";
import { hero } from "@/heros/config";
import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { Archive } from "../../blocks/ArchiveBlock/config";
import { CallToAction } from "../../blocks/CallToAction/config";
import { Content } from "../../blocks/Content/config";
import { FormBlock } from "../../blocks/Form/config";
import { ImageWithInfoGrid } from "../../blocks/ImageWithInfoGrid/config";
import { ListAside } from "../../blocks/ListAside/config";
import { MediaBlock } from "../../blocks/MediaBlock/config";
import { TextAside } from "../../blocks/TextAside/config";
import { populatePublishedAt } from "../../hooks/populatePublishedAt";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
import { revalidatePage } from "./hooks/revalidatePage";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
export const Pages: CollectionConfig = {
  slug: "pages",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "pages",
        });

        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
      },
    },
    preview: (data) => {
      const path = generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
      });

      return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`;
    },
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                TextAside,
                ListAside,
                ImageWithInfoGrid,
                HorizontalIconsGroup,
                PopularDestinationsGallery,
                SideListWithIcons,
                Bento4x4,
                FAQ,
                ServicesList,
                CustomForm,
                DownloadableFiles,
                MapContacts,
                EditorialFullFrame,
                EditorialExpandedList,
                TourSearchModule,
                TourSearchModuleITTour,
                ExternalMedia,
              ],
              required: true,
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
};
