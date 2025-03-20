import type { NextApiRequest, NextApiResponse } from "next";

interface ImageNode {
  src: string;
}

interface VariantNode {
  id: string;
  title: string;
  price: string;
}

interface ProductNode {
  id: string;
  title: string;
  descriptionHtml: string;
  images: {
    edges: { node: ImageNode }[];
  };
  variants: {
    edges: { node: VariantNode }[];
  };
}

interface ShopifyProductResponse {
  data: {
    products: {
      edges: { node: ProductNode }[];
    };
  };
}

const RAW_SHOPIFY_API_URL = process.env.SHOPIFY_DOMAIN_NAME;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN ?? "";

if (!RAW_SHOPIFY_API_URL) {
  throw new Error("Missing SHOPIFY_DOMAIN_NAME in environment variables");
}
if (!SHOPIFY_ACCESS_TOKEN) {
  throw new Error("Missing SHOPIFY_ACCESS_TOKEN in environment variables");
}

const SHOPIFY_API_URL: string = RAW_SHOPIFY_API_URL.startsWith("http")
  ? `${RAW_SHOPIFY_API_URL}/api/2023-01/graphql.json`
  : `https://${RAW_SHOPIFY_API_URL}/api/2023-01/graphql.json`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const query = `
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          images(first: 1) {
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
    }
  }
`;

  try {
    console.log("SHOPIFY_API_URL:", SHOPIFY_API_URL);

    const response = await fetch(SHOPIFY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query }),
    });

    const textResponse = await response.text();
    console.log("Raw Shopify Response:", textResponse);

    if (!response.ok) {
      throw new Error(
        `Shopify API error: ${response.status} ${response.statusText} - ${textResponse}`
      );
    }

    const data = JSON.parse(textResponse) as ShopifyProductResponse;

    return res.status(200).json(data.data.products.edges);
  } catch (error: any) {
    console.error("Error fetching Shopify data:", error.message);
    return res
      .status(500)
      .json({ error: error.message || "Internal Server Error" });
  }
}
