import { ListItemBuilder } from 'sanity/structure'
import { defineStructure } from '@/sanity/utils'

export const collection = defineStructure<ListItemBuilder>((S) =>
  S.listItem().title('Collections').schemaType('collection').child(S.documentTypeList('collection'))
)
