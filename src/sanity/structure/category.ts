
import { ItemChild, ListItemBuilder, StructureBuilder } from 'sanity/structure'
import { defineStructure } from '../utils/defineStructure'
import { apiVersion } from '../lib/api'
import { ConfigContext } from 'sanity'

const child = async (id: string, S: StructureBuilder, context: ConfigContext): Promise<ItemChild> => {
   const client = context.getClient({
      apiVersion
   })

   const children = await client.fetch(`*[_type == "category" && defined(parent) && parent._ref == $id]`, {
      id
   })

   if (children && children.length > 0) {
      return S.documentTypeList('category')
         .title('Category')
         .schemaType('category')
         .filter(`_type == "category" && defined(parent) && parent._ref == $id`)
         .params({
            id,
         })
         .child((id) => child(id, S, context))
         .canHandleIntent(
            (intentName, params) =>
               intentName === 'create' && params.template === 'category-child'
         )
         .initialValueTemplates([
            S.initialValueTemplateItem('category-child', {
               parentId: id,
            }),
         ])
   } else {
      return S.document()
         .schemaType('category')
         .documentId(id)
   }
}

export const category = defineStructure<ListItemBuilder>((S, context) =>
   S.listItem()
      .title('Category')
      .schemaType('category')
      .child(
         S.documentTypeList('category')
            .title('Category')
            .schemaType('category')
            .filter(`_type == "category" && !defined(parent) && !(_id in path("drafts.**"))`)
            .apiVersion(apiVersion)
            .child((id) => child(id, S, context))
      )
)
