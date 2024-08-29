import { storefront } from "../../../utilis";

export const productsQuery = `query Products {
  products(first: 100) {
    edges {
      node {
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        description
        id
        productType
        variants(first: 10) {
          edges {
            node {
              id
              title
              product {
                      priceRange {
                        minVariantPrice {
                          amount
                        }
                      }
                    }
              image {
                url
              }
            }
          }
        }
      }
    }
  }
  collections(first: 10) {
    edges {
      node {
        id
        description
        products(first: 20) {
          edges {
            node {
              title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
            }
          }
        }
      }
    }
  }
}`;

export const collectionsQuery = `query MyQuery {
  collections(first: 10) {
    edges {
      node {
        id
        products(first: 100) {
          edges {
            node {
              id
              description
              title
              priceRange {
                minVariantPrice {
                  amount
                }
              }
                images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
            }
          }
        }
      }
    }
  }
}`;

export const testQuery = `
query Products {
  products(first: 30) {
    edges {
      node {
        title
        handle
        priceRange {
          minVariantPrice {
            amount
          }
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
          }
        }
        description
        id
        productType
        variants(first: 10) {
          edges {
            node {
              id
              title
              product {
                      priceRange {
                        minVariantPrice {
                          amount
                        }
                      }
                    }
              image {
                url
              }
            }
          }
        }
      }
    }
  }
  collections(first: 10) {
    edges {
      node {
        id
        description
        products(first: 20) {
          edges {
            node {
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                }
              }
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    image {
                      url
                      altText
                    }
                    title
                    product {
                      priceRange {
                        minVariantPrice {
                          amount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export default async function handler() {
  const { data } = await storefront(productsQuery);
  const { collections } = await storefront(collectionsQuery);
  const { test } = await storefront(testQuery);
  return { data, collections, testQuery };
}
