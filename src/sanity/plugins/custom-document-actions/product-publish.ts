import { useState, useEffect } from 'react'
import { useClient } from 'sanity'
import { useDocumentOperation } from 'sanity'
import { apiVersion } from '../../lib/api'
import { categoryPathQuery } from '../../lib/queries'
import { Category, CategoryPathQueryResult, Product } from '@/sanity.types'
import { CategoryActionProps, ProductActionProps } from './types'
import { nanoid } from 'nanoid'

export function ProductPublish(props: ProductActionProps) {
   const {
      draft,
      published,
   }: {
      draft: Product;
      published: Product;
   } = props;

   const { patch, publish } = useDocumentOperation(props.id, props.type)
   const [isPublishing, setIsPublishing] = useState(false)
   const client = useClient({ apiVersion })

   useEffect(() => {
      // if the isPublishing state was set to true and the draft has changed
      // to become `null` the document has been published
      if (isPublishing && !draft) {
         setIsPublishing(false)
      }
   }, [draft, isPublishing])

   return {
      disabled: !!publish.disabled,
      label: isPublishing ? 'Publishing...' : 'Publish & Update',
      onHandle: async () => {
         // This will update the button text
         setIsPublishing(true)

         if (draft && draft.category?._ref) {
            const parentPath: CategoryPathQueryResult = await client.fetch(categoryPathQuery, { id: draft.category?._ref ?? "" })
            const parentPathArray = parentPath?.path?.map(path => ({ _ref: path._ref, _type: path._type, _key: nanoid() })) ?? []

            // Set the path
            patch.execute([{ set: { categoryPath: parentPathArray } }])
         }

         if (draft && !draft.category?._ref) {
            // Set the path
            patch.execute([{ set: { categoryPath: [] } }])
         }

         // Perform the publish
         publish.execute()

         // Signal that the action is completed
         props.onComplete()
      },
   }
}