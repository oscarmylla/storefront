import cartFragment from '../fragments/cart';

export const addToCartMutation = /* GraphQL */ `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = /* GraphQL */ `
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = /* GraphQL */ `
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = /* GraphQL */ `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const updateAttributesCartMutation = /* GraphQL */ `
  mutation cartAttributesUpdate($cartId: ID!, $attributes: [AttributeInput!]!) @inContext(country: SE, language: SV){
    cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
      cart {
        ...cart
      }
      userErrors {
        field
        message
      }
    }
  }
  ${cartFragment}
`;


export const updateBuyerIdentityCartMutation = /* GraphQL */ `
  mutation updateBuyerIdentityCart($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) @inContext(country: SE, language: SV){
    cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;