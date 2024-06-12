import {
  definePlugin,
  DocumentActionComponent,
  DocumentActionsResolver,
  NewDocumentOptionsResolver,
} from 'sanity'
import { ShopifyDelete } from './shopify-delete'
import { shopifyLink } from './shopify-link'

import { LOCKED_DOCUMENT_TYPES, SHOPIFY_DOCUMENT_TYPES } from '../../constants'
import { CategoryPublish } from './category-publish'
import { ProductPublish } from './product-publish'

export const resolveDocumentActions: DocumentActionsResolver = (prev, { schemaType }) => {
  if (LOCKED_DOCUMENT_TYPES.includes(schemaType)) {
    prev = prev.filter(
      (previousAction: DocumentActionComponent) =>
        previousAction.action === 'publish' || previousAction.action === 'discardChanges'
    )
  }

  if (SHOPIFY_DOCUMENT_TYPES.includes(schemaType)) {
    prev = prev.filter(
      (previousAction: DocumentActionComponent) =>
        previousAction.action === 'publish' ||
        previousAction.action === 'unpublish' ||
        previousAction.action === 'discardChanges'
    )

    const actions = [
      ...prev,
      ShopifyDelete as DocumentActionComponent,
      shopifyLink as DocumentActionComponent,
    ]

    if (schemaType === 'product') {
      return [
        ProductPublish as DocumentActionComponent,
        ...actions.filter((previousAction: DocumentActionComponent) => previousAction.action === 'publish')
      ]
    }

    return actions
  }

  if (schemaType === 'category') {
    prev = prev.filter((previousAction: DocumentActionComponent) => previousAction.action !== 'publish')

    return [
      CategoryPublish as DocumentActionComponent,
      ...prev,
    ]
  }

  return prev
}

export const resolveNewDocumentOptions: NewDocumentOptionsResolver = (prev) => {
  const options = prev.filter((previousOption) => {
    return (
      !LOCKED_DOCUMENT_TYPES.includes(previousOption.templateId) &&
      !SHOPIFY_DOCUMENT_TYPES.includes(previousOption.templateId)
    )
  })

  return options
}

export const customDocumentActions = definePlugin({
  name: 'custom-document-actions',
  document: {
    actions: resolveDocumentActions,
    newDocumentOptions: resolveNewDocumentOptions,
  },
})
