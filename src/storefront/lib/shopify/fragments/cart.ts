import productFragment from './product';

const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    buyerIdentity{
      countryCode
      deliveryAddressPreferences{
        ... on MailingAddress {
            address1
            address2
            city
            company
            country
            firstName
            lastName
            phone
            province
            zip
        }
      }
      email
      phone
      walletPreferences
    }
    attributes {
      key
      value
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            compareAtAmountPerQuantity{
              amount
              currencyCode
            }
            amountPerQuantity{
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              availableForSale
              sku
              unitPriceMeasurement{
                measuredType
                quantityUnit
                quantityValue
                referenceUnit
                referenceValue
              }
              unitPrice {
                amount
                currencyCode
              }
              product {
                ...product
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${productFragment}
`;

export default cartFragment;
