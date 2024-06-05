import { ListItemBuilder } from 'sanity/structure'
import { defineStructure } from '@/sanity/utils'

export const settings = defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Settings')
    .schemaType('settings')
    .child(S.editor().title('Settings').schemaType('settings').documentId('settings'))
)
