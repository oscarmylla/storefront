import { accordionGroup } from './objects/module/accordion-group'
import { accordion } from './objects/module/accordion'
import { callout } from './objects/module/callout'
import { callToAction } from './objects/module/call-to-action'
import { collectionGroup } from './objects/collection/collection-group'
import { collectionLinks } from './objects/collection/collection-links'
import { collectionReference } from './objects/module/collection-reference'
import { collectionRule } from './objects/shopify/collection-rule'
import { customProductOptionColorObject } from './objects/custom-product-option/custom-product-option-object'
import { customProductOptionColor } from './objects/custom-product-option/custom-product-option-color'
import { customProductOptionSizeObject } from './objects/custom-product-option/custom-product-option-size-object'
import { customProductOptionSize } from './objects/custom-product-option/custom-product-option-size'
import { footer } from './objects/global/footer'
import { gridItem } from './objects/module/grid-item'
import { grid } from './objects/module/grid'
import { hero } from './objects/module/hero'
import { imageCallToAction } from './objects/module/image-call-to-action'
import { imageFeatures } from './objects/module/image-features'
import { imageFeature } from './objects/module/image-feature'
import { imageWithProductHotspots } from './objects/hotspot/image-with-product-hotspots'
import { instagram } from './objects/module/instagram'
import { inventory } from './objects/shopify/inventory'
import { linkEmail } from './objects/link/link-email'
import { linkExternal } from './objects/link/link-external'
import { linkInternal } from './objects/link/link-internal'
import { linkProduct } from './objects/link/link-product'
import { menuLinks } from './objects/global/menu-links'
import { menu } from './objects/global/menu'
import { notFoundPage } from './objects/global/not-found-page'
import { option } from './objects/shopify/option'
import { placeholderString } from './objects/shopify/placeholder-string'
import { priceRange } from './objects/shopify/price-range'
import { productFeatures } from './objects/module/product-features'
import { productHotspots } from './objects/hotspot/product-hotspots'
import { productReference } from './objects/module/product-reference'
import { productWithVariant } from './objects/shopify/product-with-variant'
import { proxyString } from './objects/shopify/proxy-string'
import { seo } from './objects/seo'
import { shopifyCollection } from './objects/shopify/shopify-collection'
import { shopifyProduct } from './objects/shopify/shopify-product'
import { shopifyProductVariant } from './objects/shopify/shopify-product-variant'
import { spot } from './objects/hotspot/spot'

// Objects used as annotations must be imported first
const annotations = [linkEmail, linkExternal, linkInternal, linkProduct]

const objects = [
  accordionGroup,
  accordion,
  callout,
  callToAction,
  collectionGroup,
  collectionLinks,
  collectionReference,
  collectionRule,
  customProductOptionColorObject,
  customProductOptionColor,
  customProductOptionSizeObject,
  customProductOptionSize,
  footer,
  gridItem,
  grid,
  hero,
  imageCallToAction,
  imageFeatures,
  imageFeature,
  imageWithProductHotspots,
  instagram,
  inventory,
  menuLinks,
  menu,
  notFoundPage,
  option,
  placeholderString,
  priceRange,
  productFeatures,
  productHotspots,
  productReference,
  productWithVariant,
  proxyString,
  seo,
  shopifyCollection,
  shopifyProduct,
  shopifyProductVariant,
  spot,
]

import { portableText } from './arrays/portable-text'
import { portableTextSimple } from './arrays/portable-text-simple'

const blocks = [portableText, portableTextSimple]

import { collection } from './documents/collection'
import { colorTheme } from './documents/color-theme'
import { page } from './documents/page'
import { product } from './documents/product'
import { productVariant } from './documents/product-variant'
import { post } from './documents/post'
import { author } from './documents/author'
import { category } from './documents/category'

const documents = [collection, colorTheme, page, product, productVariant, post, author, category]

import { home } from './singletons/home'
import { settings } from './singletons/settings'

const singletons = [home, settings]

export const schemaTypes = [...annotations, ...objects, ...singletons, ...blocks, ...documents]
