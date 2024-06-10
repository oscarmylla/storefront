"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig, isDev } from "sanity";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { colorInput } from '@sanity/color-input'
import { media, mediaAssetSource } from 'sanity-plugin-media'

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { locate } from "@/sanity/plugins/locate";
import { singletonPlugin } from "@/sanity/plugins/settings";
import { assistWithPresets } from "@/sanity/plugins/assist";
import { settings } from "@/sanity/schemas/singletons/settings";
import { schemaTypes } from "@/sanity/schemas/types";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import { customDocumentActions } from "@/sanity/plugins/custom-document-actions";
import Navbar from "@/sanity/components/studio/navbar";
import { structure } from '@/sanity/structure'

// Vision lets you query your content with GROQ in the studio
// https://www.sanity.io/docs/the-vision-plugin
const devOnlyPlugins = [visionTool({ defaultApiVersion: apiVersion })]

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,

  schema: {
    types: schemaTypes,

    templates: (prev) => {
      const categoryChild = {
        id: 'category-child',
        title: 'Category: Child',
        schemaType: 'category',
        parameters: [{ name: `parentId`, title: `Parent ID`, type: `string` }],
        // This value will be passed-in from desk structure
        value: ({ parentId }: { parentId: string }) => ({
          parent: { _type: 'reference', _ref: parentId },
        }),
      }

      return [...prev, categoryChild]
    },
  },

  plugins: [
    structureTool({ structure }),
    presentationTool({
      locate,
      previewUrl: { previewMode: { enable: "/api/draft" } },
    }),
    // TODO
    // structureTool({ structure: pageStructure([settings]) }),

    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([settings.name]),

    // Add an image asset source for Unsplash
    unsplashImageAsset(),

    // Sets up AI Assist with preset prompts
    // https://www.sanity.io/docs/ai-assist
    assistWithPresets(),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : []),
  ].filter(Boolean) as PluginOptions[],

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource)
      },
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource)
      },
    },
  },

  studio: {
    components: {
      navbar: Navbar,
    },
  },
});
