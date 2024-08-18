import { NextResponse } from "next/server";
import { storefront } from "../../../../utilis";
import { loadCart } from "../../../../utilis/query";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const cartId = url.searchParams.get("cartId");

    // Verifica che l'ID del carrello sia presente e valido
    if (!cartId || !cartId.includes("gid://shopify/Cart/")) {
      throw new Error("Invalid cartId");
    }

    // Estrazione dell'ID dopo "gid://shopify/Cart/"
    const extractedCartId = cartId.split("gid://shopify/Cart/")[1];

    // Debug dell'ID estratto
    console.log("cartId estratto:", extractedCartId);

    // Richiesta per caricare il carrello
    const { data } = await storefront(loadCart, { cartId: extractedCartId });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
