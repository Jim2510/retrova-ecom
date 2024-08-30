import { storefront } from "../../../../../utilis";
import { customerOrdersQuery } from "../../../../../utilis/query";

export async function POST(req) {
  console.log("Request received"); // Debug: Verifica che la richiesta arrivi al server

  try {
    const { customerAccessToken } = await req.json();

    console.log("Customer Access Token:", customerAccessToken); // Debug: Verifica il token di accesso ricevuto

    if (!customerAccessToken) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }

    const variables = {
      customerAccessToken,
      first: 10, // Numero di ordini da recuperare (puoi renderlo dinamico)
    };

    const data = await storefront(customerOrdersQuery, variables);
    console.log("Storefront response data:", data); // Debug: Verifica i dati ricevuti dalla query

    // const orders = data?.data?.customer?.orders?.edges;

    if (!data) {
      return new Response(JSON.stringify({ error: "No orders found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching customer orders:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching customer orders" }),
      {
        status: 500,
      }
    );
  }
}
