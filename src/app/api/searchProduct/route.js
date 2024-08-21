import { storefront } from "../../../../utilis";
import { searchByName } from "../../../../utilis/query";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title");

  if (!title) {
    return new Response(
      JSON.stringify({ error: "Missing 'title' parameter" }),
      {
        status: 400,
      }
    );
  }

  try {
    const data = await storefront(searchByName, { title });
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Error fetching products" }), {
      status: 500,
    });
  }
}
