// pages/api/auth/login/login.js
import { storefront } from "../../../../../utilis";
import { customerAccessTokenCreate } from "../../../../../utilis/query";

export async function POST(req) {
  console.log("Request received"); // Log per confermare la richiesta
  const { email, password } = await req.json();

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

    const errors = data?.data?.customerAccessTokenCreate?.customerUserErrors;

    if (errors && errors.length > 0) {
      return new Response(JSON.stringify({ errors }), {
        status: 400,
      });
    }

    return new Response(
      JSON.stringify(data.data.customerAccessTokenCreate.customerAccessToken),
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
