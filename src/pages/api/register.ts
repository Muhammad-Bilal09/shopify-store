import type { NextApiRequest, NextApiResponse } from "next";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.error("Registration error:", error?.message);
    return res.status(500).json({ message: "User registration failed", error: error?.message });
  }
}


