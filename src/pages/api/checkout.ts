import { NextApiRequest, NextApiResponse } from "next";
import { createCheckout, CartItem } from "@/lib/shopify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { cartItems } = req.body;

    if (!cartItems || !Array.isArray(cartItems)) {
      return res.status(400).json({ error: "Invalid cart items" });
    }

    const shopifyCartItems: CartItem[] = cartItems.map((item) => {
      if (
        !item.variantId ||
        !item.variantId.startsWith("gid://shopify/ProductVariant/")
      ) {
        throw new Error(
          `Invalid variantId for product: ${item.name || item.id}`
        );
      }

      return {
        id: item.id,
        name: item.name || "",
        variantId: item.variantId,
        stockItems: item.count || 1,
        price: item.price || 0,
      };
    });

    console.log("Shopify Cart Items:", shopifyCartItems);

    const checkout = await createCheckout(shopifyCartItems);

    if (!checkout?.webUrl) {
      throw new Error("Failed to generate checkout URL");
    }

    return res.status(200).json({ checkoutUrl: checkout.webUrl });
  } catch (error) {
    console.error("API Error:", error);

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
