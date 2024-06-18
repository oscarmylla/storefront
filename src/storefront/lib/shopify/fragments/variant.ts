const variantFragment = /* GraphQL */ `
  fragment variant on ProductVariant {
   id
   title
   availableForSale
   quantityAvailable
   selectedOptions {
      name
      value
   }
   unitPrice {
      amount
      currencyCode
   }
   unitPriceMeasurement {
      measuredType
      quantityUnit
      quantityValue
      referenceUnit
      referenceValue
   }
   price {
      amount
      currencyCode
   }
}
`;

export default variantFragment;
