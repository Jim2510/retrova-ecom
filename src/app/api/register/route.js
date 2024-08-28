import { storefront } from "../../../../utilis";
import { customerCreate } from "../../../../utilis/query";

export async function POST(req) {
  const { email, password, firstName, lastName } = await req.json();

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
        firstName,
        lastName,
      },
    };

    const data = await storefront(customerCreate, variables);

    const errors = data?.data?.customerCreate?.customerUserErrors;

    if (errors && errors.length > 0) {
      return new Response(JSON.stringify({ errors }), {
        status: 400,
      });
    }

    return new Response(JSON.stringify(data.data.customerCreate.customer), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating customer:", error);
    return new Response(JSON.stringify({ error: "Error creating customer" }), {
      status: 500,
    });
  }
}
