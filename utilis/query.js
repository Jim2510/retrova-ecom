export const addToCartMutation = `
mutation AddToCart($cartId: ID!, $variantId: ID!) {
  cartLinesAdd(
    cartId: $cartId,
    lines: {merchandiseId: $variantId, quantity: 1}
  ) {
    cart {
      lines(first: 100) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                product {
                  title
                }
              }
            }
          }
        }
      }
    }
  }
}`;
