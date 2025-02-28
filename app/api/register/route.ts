import { PrismaClient, UserType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {
      address,
      businessType,
      companyName,
      email,
      firstName,
      lastName,
      password,
      phone,
      userType,
    } = await request.json();

    // Validate userType against enum
    if (!Object.values(UserType).includes(userType)) {
      return new Response(JSON.stringify({ error: "Invalid user type" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        address,
        businessType,
        companyName,
        email,
        firstName,
        lastName,
        password: hashedPassword,
        phone,
        userType: userType as UserType, // Ensure enum type
      },
    });

    return new Response(JSON.stringify(newUser), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    console.error("User creation failed:", error);
    return new Response(JSON.stringify({ error: "User creation failed" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    await prisma.$disconnect(); // Close DB connection
  }
}
