import { storefront } from "../../../utilis";
import { testQuery } from "../api/getProducts";

export const useFetch = async () => {
  try {
    const data = await storefront(testQuery);
    console.log(data);
  } catch (error) {
    console.error("Error fetching cart items:", error);
  }
};
