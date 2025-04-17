import { getUser } from "@/lib/getUser";
import prisma from "@/prismaClient";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch current bid by auction ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const auction = await prisma.item.findUnique({ where: { id } });

  if (!auction) {
    return NextResponse.json({ error: "Auction not found" }, { status: 404 });
  }

  // Get latest bid (most recent one)
  const latestBid = await prisma.bid.findFirst({
    where: { itemId: id },
    orderBy: { createdAt: "desc" },
    select: {
      userId: true,
      placedAmount: true,
    },
  });

  return NextResponse.json({
    currentBid: auction.currentBid,
    lastBidUserId: latestBid?.userId || null,
  });
}

// POST: Place a new bid
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await req.json();
  const { amount } = body;

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

  const auction = await prisma.item.findUnique({ where: { id } });

  if (!auction) {
    return NextResponse.json({ error: "Auction not found" }, { status: 404 });
  }
  let updatedAmount;
  if (auction.currentBid === 0) {
    updatedAmount = auction.startingPrice + amount;
  } else {
    updatedAmount = auction.currentBid + amount;
  }

  await prisma.bid.create({
    data: {
      placedAmount: updatedAmount,
      userId: user.id,
      itemId: id,
    },
  });

  // Step 2: Update the item’s current bid and bid count
  await prisma.item.update({
    where: { id },
    data: {
      currentBid: updatedAmount,
      bids: { increment: 1 },
    },
  });

  return NextResponse.json({
    success: true,
    newBid: updatedAmount,
  });
}
