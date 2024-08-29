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
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export const createCart = `mutation createCart {
    cartCreate {
        cart {
            checkoutUrl
            id
        }
    }
}`;

export const loadCart = `
query GetCart( $cartId: ID!) {
    cart(id: $cartId) {
        checkoutUrl
    estimatedCost {
      totalAmount {
        amount
      }
    }
    lines(first: 100) {
      edges {
        node {
          quantity
          estimatedCost {
            amount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                title
                images(first: 2) {
                  edges {
                    node {
                      url
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                  }
                }
              }
              image {
                url
              }
            }
          }
        }
      }
    }
}
}
`;

export const searchByName = ` query searchProducts($title: String!) {
  products(first: 10, query: $title) {
    edges {
      cursor
      node {
        id
        title
        handle
        descriptionHtml
        images(first: 1) {
          edges {
            node {
              originalSrc
              altText
            }
          }
        }
      }
    }
  }
}
`;

export const userQuery = `
query {
  customer {
    id
    firstName
    lastName
    email
    orders(first: 10) {
      edges {
        node {
          id
          orderNumber
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const customerCreate = `
mutation customerCreate($input: CustomerCreateInput!) {
  customerCreate(input: $input) {
    customerUserErrors {
      code
      field
      message
    }
    customer {
      id
      email
      firstName
      lastName
    }
  }
}

`;

export const customerAccessTokenCreate = `
mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
  customerAccessTokenCreate(input: $input) {
    customerUserErrors {
      code
      field
      message
    }
    customerAccessToken {
      accessToken
      expiresAt
    }
  }
}
`;
