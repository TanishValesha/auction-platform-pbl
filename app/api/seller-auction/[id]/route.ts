import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const auctions = await prisma.item.findMany({
      where: {
        ownerId: id,
      },
    });

    const auctionsWithTime = auctions.map((auction) => {
      const { timeLeft, isActive } = calculateTimeFields(
        auction.startDateTime,
        auction.duration
      );

      return {
        ...auction,
        timeLeft,
        isActive,
      };
    });

    return NextResponse.json(auctionsWithTime, { status: 200 });
  } catch (error) {
    console.error("Error fetching auctions for user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
