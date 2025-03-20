import Client from "shopify-buy";

// Initialize Shopify client using shopify-buy
export const shopifyClient = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN_NAME!, // Shopify store domain
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN!, // Storefront access token
  apiVersion: "2023-04", // Shopify API version
});

// Type definitions
export type CartItem = {
  id: string; // Product variant ID
  name: string; // Product name
  variantId: string; // Variant ID
  stockItems: number; // Quantity
  price: number; // Price per item
};

export type ShopifyProduct = {
  id: string;
  title: string;
  descriptionHtml: string;
  images: {
    edges: {
      node: {
        src: string;
      };
    }[];
  };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
};

// Function to fetch product by ID using Storefront API
export async function getProductById(
  pid: string
): Promise<ShopifyProduct | null> {
  const query = `
    query getProduct($id: ID!) {
      product(id: $id) {
        id
        title
        descriptionHtml
        images(first: 5) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(
      `https://${process.env.SHOPIFY_DOMAIN_NAME}/api/2023-04/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token":
            process.env.SHOPIFY_ACCESS_TOKEN!,
        },
        body: JSON.stringify({
          query,
          variables: { id: `gid://shopify/Product/${pid}` }, // Shopify requires Global ID format
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Shopify API Error: ${response.statusText}`);
    }

    const data = await response.json();

    // Return the product data or null if not found
    return data.data?.product ?? null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

// Function to create a checkout using shopify-buy
export async function createCheckout(items: CartItem[]) {
  try {
    // Create a new checkout
    const checkout = await shopifyClient.checkout.create();

    // Prepare line items
    const lineItems = items.map((item) => ({
      variantId: item.variantId, // Ensure this is the correct Variant ID
      quantity: item.stockItems,
    }));

    // Add line items to the checkout
    const updatedCheckout = await shopifyClient.checkout.addLineItems(
      checkout.id,
      lineItems
    );

    // Return the updated checkout
    return updatedCheckout;
  } catch (error) {
    console.error("Error creating checkout:", error);
    throw error;
  }
}
// Function to fetch all products
export async function getAllProducts() {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

// Function to fetch a collection by ID
export async function getCollectionById(collectionId: string) {
  try {
    const collection =
      await shopifyClient.collection.fetchWithProducts(collectionId);
    return collection;
  } catch (error) {
    console.error("Error fetching collection by ID:", error);
    throw error;
  }
}

// import Client from "shopify-buy";

// // Initialize Shopify client
// export const shopifyClient = Client.buildClient({
//   domain: process.env.SHOPIFY_DOMAIN_NAME!,
//   storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN!,
//   apiVersion: "2023-04",
// });

// // Function to fetch product by ID
// export async function getProductById(pid: string) {
//   const query = `
//     query getProduct($id: ID!) {
//       product(id: $id) {
//         id
//         title
//         descriptionHtml
//         images(first: 5) {
//           edges {
//             node {
//               src
//             }
//           }
//         }
//         variants(first: 10) {
//           edges {
//             node {
//               id
//               title
//               price {
//                 amount
//                 currencyCode
//               }
//             }
//           }
//         }
//       }
//     }
//   `;

//   const response = await fetch(
//     `https://${process.env.SHOPIFY_DOMAIN_NAME}/api/2023-04/graphql.json`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN!,
//       },
//       body: JSON.stringify({
//         query,
//         variables: { id: `gid://shopify/Product/${pid}` }, // Shopify requires Global ID format
//       }),
//     }
//   );

//   if (!response.ok) {
//     throw new Error(`Shopify API Error: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data.data?.product ?? null;
// }
