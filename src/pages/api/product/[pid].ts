import { NextApiRequest, NextApiResponse } from "next";
import { getProductById } from "../../../lib/shopify";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;

  if (!pid || typeof pid !== "string") {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await getProductById(pid);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error: any) {
    console.error("Error fetching product:", error.message);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}
