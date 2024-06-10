import { DocumentsIcon } from '@sanity/icons'
import { ListItemBuilder } from 'sanity/structure';
import { defineStructure } from '@/sanity/utils/defineStructure'

export const page = defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Pages')
    .icon(DocumentsIcon)
    .schemaType('page')
    .child(S.documentTypeList('page'))
)
