import { storefront } from "../../../../utilis";

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
                priceRange {
                  minVariantPrice {
                    amount
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
`;

export default async function handlerLoad(e) {
  try {
    let { cartId } = e.queryStringParameters;

    // Estrazione dell'ID dopo "gid://shopify/Cart/"
    if (cartId.includes("gid://shopify/Cart/")) {
      cartId = cartId.split("gid://shopify/Cart/")[1];
    }

    // Debug dell'ID estratto
    console.log("cartId estratto:", cartId);

    const { data } = await storefront(loadCart, { cartId });
    return { data };
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
