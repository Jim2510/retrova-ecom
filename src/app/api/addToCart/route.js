import { storefront } from "../../../../utilis";

// Definizione della mutation GraphQL
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

export default async function handler(req, res) {
  try {
    const { cartId, variantId } = JSON.parse(req.body);

    // Debug degli ID estratti
    console.log("Cart ID estratto:", cartId);
    console.log("Variant ID estratto:", variantId);

    // Eseguire la mutation per aggiungere un prodotto al carrello
    const { data } = await storefront(addToCartMutation, {
      variables: { cartId, variantId },
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(400).json({ error: error.message });
  }
}
