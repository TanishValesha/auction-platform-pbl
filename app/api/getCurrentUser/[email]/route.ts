import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  response: NextResponse
) {
  const { email } = await params;
  console.log(email);

  if (!email) {
    return new Response(JSON.stringify({ error: "Email ID is required" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      address: true,
      firstName: true,
      lastName: true,
      businessType: true,
      companyName: true,
      phone: true,
      userType: true,
      email: true,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      headers: { "Content-Type": "application/json" },
      status: 404,
    });
  }

  return new Response(JSON.stringify(user));
}
