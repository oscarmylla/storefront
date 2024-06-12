import imageFragment from './image';
import seoFragment from './seo';
import variantFragment from './variant';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    totalInventory
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          ...variant
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${variantFragment}
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
