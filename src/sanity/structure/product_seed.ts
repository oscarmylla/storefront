import { InfoOutlineIcon } from '@sanity/icons'
import { ListItemBuilder } from 'sanity/structure'
import { defineStructure } from '@/sanity/utils/defineStructure'
import { apiVersion } from '../lib/api'

export const productSeed = defineStructure<ListItemBuilder>((S) =>
   S.listItem()
      .title('Products Seed')
      .schemaType('product')
      .id('productSeed')
      .child(
         S.documentTypeList('product')
            // .defaultLayout('detail')
            .filter('_type == "product" && store.status == "active" && !defined(category)')
      )
)
