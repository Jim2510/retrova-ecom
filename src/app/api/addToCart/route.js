import { storefront } from "../../../../utilis";
import { NextResponse } from "next/server";
import { addToCartMutation } from "../../../../utilis/query";

// La mutation GraphQL direttamente all'interno della funzione POST

export async function POST(request) {
  try {
    const { cartId, variantId } = await request.json();

    // Debug degli ID estratti
    console.log("Cart ID estratto:", cartId);
    console.log("Variant ID estratto:", variantId);

    // Eseguire la mutation per aggiungere un prodotto al carrello
    const { data } = await storefront(addToCartMutation, {
      variables: { cartId, variantId },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export default { addToCartMutation };
