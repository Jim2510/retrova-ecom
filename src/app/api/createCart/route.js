import { storefront } from "../../../../utilis";

export const createCart = `mutation createCart {
    cartCreate {
        cart {
            checkoutUrl
            id
        }
    }
}`;

export default async function handlerCreate() {
  const { data } = await storefront(createCart);
  return { data };
}
