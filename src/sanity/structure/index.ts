import { ListItemBuilder, StructureResolver } from 'sanity/structure';
import { collection } from './collection'
import { colorTheme } from './color-theme'
import { home } from './home'
import { page } from './page'
import { product } from './product'
import { settings } from './settings'
import { category } from './category';
import { categories } from './categories';

/**
 * Structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schema types progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'collection',
    'colorTheme',
    'home',
    'media.tag',
    'page',
    'product',
    'productVariant',
    'settings',
    'category',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      home(S, context),
      page(S, context),
      S.divider(),
      collection(S, context),
      product(S, context),
      S.divider(),
      colorTheme(S, context),
      S.divider(),
      settings(S, context),
      S.divider(),
      category(S, context),
      categories(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
