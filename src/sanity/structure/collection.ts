import { ListItemBuilder } from 'sanity/structure'
import { defineStructure } from '@/sanity/utils/defineStructure'

export const collection = defineStructure<ListItemBuilder>((S) =>
  S.listItem().title('Collections').schemaType('collection').child(S.documentTypeList('collection'))
)
