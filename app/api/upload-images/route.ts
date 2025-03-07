import { PrismaClient, UserType } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
  } catch (error) {
  } finally {
    await prisma.$disconnect(); // Close DB connection
  }
}
