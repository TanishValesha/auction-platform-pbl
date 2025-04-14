import { NextRequest } from "next/server";
import prisma from "@/prismaClient";

// Time helper function
function calculateTimeFields(startDateTime: Date, durationInDays: number) {
  const now = new Date();
  const start = new Date(startDateTime);
  const end = new Date(start.getTime() + durationInDays * 24 * 60 * 60 * 1000);

  // Auction hasn't started yet
  if (now < start) {
    return {
      timeLeft: "Auction not started",
      isActive: false,
    };
  }

  const secondsLeft = Math.max(
    0,
    Math.floor((end.getTime() - now.getTime()) / 1000)
  );

  const days = Math.floor(secondsLeft / (3600 * 24));
  const hours = Math.floor((secondsLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  return {
    timeLeft,
    isActive: secondsLeft > 0,
  };
}

// GET request to fetch an auction by ID
export async function GET(
  request: NextRequest,
  context: { params: { id?: string } } // Access params correctly
) {
  try {
    const id = context.params?.id;

    if (!id) {
      return new Response(JSON.stringify({ error: "Auction ID is required" }), {
        headers: { "Content-Type": "application/json" },
        status: 400,
      });
    }

    const item = await prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        headers: { "Content-Type": "application/json" },
        status: 404,
      });
    }

    const { timeLeft, isActive } = calculateTimeFields(
      item.startDateTime,
      item.duration
    );

    return new Response(
      JSON.stringify({
        ...item,
        timeLeft,
        isActive,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching item:", error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
