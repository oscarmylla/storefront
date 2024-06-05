import type { PortableTextBlock } from '@portabletext/types'
import { ConfigContext } from 'sanity'
import { StructureBuilder } from 'sanity/structure'
import { DEFAULT_CURRENCY_CODE, SHOPIFY_STORE_ID } from '@/sanity/constants'
import { SlugRule } from 'sanity'

const defaults = { nonTextBehavior: 'remove' }

export function blocksToText(blocks: PortableTextBlock[] = [], opts = {}) {
   if (typeof blocks === 'string') {
      return blocks
   }

   const options = Object.assign({}, defaults, opts)
   return blocks
      .map((block) => {
         if (block._type !== 'block' || !block.children) {
            return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
         }

         return block.children.map((child) => child.text).join('')
      })
      .join('\n\n')
}

/**
 * Helper for creating and typing composable structure parts.
 */
export function defineStructure<StructureType>(
   factory: (S: StructureBuilder, context: ConfigContext) => StructureType
) {
   return factory
}

type PriceObject = {
   minVariantPrice: number
   maxVariantPrice: number
}

const formatNumber = (val: number) => {
   return new Intl.NumberFormat('en', {
      currency: DEFAULT_CURRENCY_CODE,
      style: 'currency',
   }).format(val)
}

export const getPriceRange = (price: PriceObject) => {
   if (!price || typeof price?.minVariantPrice === 'undefined') {
      return 'No price found'
   }
   if (price.maxVariantPrice && price.minVariantPrice !== price.maxVariantPrice) {
      return `${formatNumber(price.minVariantPrice)} – ${formatNumber(price.maxVariantPrice)}`
   }

   return formatNumber(price.minVariantPrice)
}

export const collectionUrl = (collectionId: number) => {
   if (!SHOPIFY_STORE_ID) {
      return null
   }
   return `https://admin.shopify.com/store/${SHOPIFY_STORE_ID}/collections/${collectionId}`
}

export const productUrl = (productId: number) => {
   if (!SHOPIFY_STORE_ID) {
      return null
   }
   return `https://admin.shopify.com/store/${SHOPIFY_STORE_ID}/products/${productId}`
}

export const productVariantUrl = (productId: number, productVariantId: number) => {
   if (!SHOPIFY_STORE_ID) {
      return null
   }
   return `https://admin.shopify.com/store/${SHOPIFY_STORE_ID}/products/${productId}/variants/${productVariantId}`
}

const MAX_LENGTH = 96

export const validateSlug = (Rule: SlugRule) => {
   return Rule.required().custom((value) => {
      const currentSlug = value && value.current
      if (!currentSlug) {
         return true
      }

      if (currentSlug.length >= MAX_LENGTH) {
         return `Must be less than ${MAX_LENGTH} characters`
      }

      return true
   })
}

