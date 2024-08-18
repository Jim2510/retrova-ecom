import { storefront } from "../../../../utilis";
import { createCart } from "../../../../utilis/query";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await storefront(createCart);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating cart:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
