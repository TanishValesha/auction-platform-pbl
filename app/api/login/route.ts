import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  console.log("URL Hit");

  try {
    const { email, password } = await request.json();

    // Find user in PostgreSQL using Prisma
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return new Response("User Not Found", { status: 404 });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new Response("Invalid Credentials", { status: 400 });

    // Create JWT
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ id: user.id, role: user.userType })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    // Set token in HTTP-only cookie
    const response = new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });

    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
    );

    return response;
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Login failed", details: error }),
      { status: 500 }
    );
  }
}
