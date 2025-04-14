import { getUser } from "@/lib/getUser";
import prisma from "@/prismaClient";

// Helper to calculate time left and active status
function calculateTimeFields(startDateTime: Date, durationInSeconds: number) {
  const endTime = new Date(startDateTime.getTime() + durationInSeconds * 1000);
  const now = new Date();

  const secondsLeft = Math.max(
    0,
    Math.floor((endTime.getTime() - now.getTime()) / 1000)
  );

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return {
    timeLeft: `${hours}h ${minutes}m ${seconds}s`,
    isActive: seconds > 0,
  };
}

export async function GET() {
  try {
    const items = await prisma.item.findMany({
      orderBy: {
        startDateTime: "desc",
      },
    });

    const enrichedItems = items.map((item) => {
      const { timeLeft, isActive } = calculateTimeFields(
        item.startDateTime,
        item.duration
      );
      return {
        ...item,
        timeLeft,
        isActive,
      };
    });

    return new Response(JSON.stringify(enrichedItems), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Fetching items failed:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch items" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

// POST - Create a new item
export async function POST(request: Request) {
  try {
    const {
      title,
      description,
      category,
      condition,
      startingPrice,
      duration,
      startDateTime,
      imageLinks,
    } = await request.json();

    const user = await getUser();

    if (!user || !user.id) {
      return new Response(
        JSON.stringify({ error: "Unauthorized or invalid user" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const newItem = await prisma.item.create({
      data: {
        description,
        category,
        condition,
        startingPrice,
        duration,
        startDateTime: new Date(startDateTime),
        imageLinks,
        ownerId: user.id,
        title,
      },
    });

    const { timeLeft, isActive } = calculateTimeFields(
      newItem.startDateTime,
      newItem.duration
    );

    return new Response(
      JSON.stringify({
        ...newItem,
        timeLeft,
        isActive,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Item creation failed:",
      error instanceof Error ? error.message : error
    );
    return new Response(JSON.stringify({ error: "Item creation failed" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
