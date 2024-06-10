import { ListItemBuilder } from 'sanity/structure';
import { defineStructure } from '@/sanity/utils/defineStructure'

export const categories = defineStructure<ListItemBuilder>((S) =>
   S.listItem()
      .title('Categories')
      .schemaType('category')
      .child(S.documentTypeList('category'))
)
