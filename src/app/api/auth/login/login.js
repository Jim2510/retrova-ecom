import { storefront } from "../../../../../utilis";
import { customerAccessTokenCreate } from "../../../../../utilis/query";

export async function POST(req) {
  console.log("Request received"); // Debug: Verifica che la richiesta arrivi al server

  const { email, password } = await req.json();

  console.log("Email:", email); // Debug: Verifica che l'email sia stata ricevuta correttamente
  console.log("Password:", password); // Debug: Verifica che la password sia stata ricevuta correttamente

  if (!email || !password) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  try {
    const variables = {
      input: {
        email,
        password,
      },
    };

    const data = await storefront(customerAccessTokenCreate, variables);
    console.log("Storefront response data:", data); // Debug: Verifica i dati ricevuti dal query

    const errors = data?.data?.customerAccessTokenCreate?.customerUserErrors;

    if (errors && errors.length > 0) {
      console.log("Customer user errors:", errors); // Debug: Verifica eventuali errori utente
      return new Response(JSON.stringify({ errors }), {
        status: 400,
      });
    }

    const { accessToken, expiresAt } =
      data.data.customerAccessTokenCreate.customerAccessToken;
    console.log("Access token:", accessToken); // Debug: Verifica il token di accesso ricevuto
    console.log("Expires at:", expiresAt); // Debug: Verifica la data di scadenza ricevuta

    return new Response(
      JSON.stringify({ accessToken, expiresAt }), // Assicurati che questi siano i dati inviati
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error logging in customer:", error);
    return new Response(
      JSON.stringify({ error: "Error logging in customer" }),
      {
        status: 500,
      }
    );
  }
}
