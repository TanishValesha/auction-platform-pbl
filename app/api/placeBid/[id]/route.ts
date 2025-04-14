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

  return NextResponse.json({ currentBid: auction.currentBid });
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

  const newAmount = auction.currentBid + amount;

  const updated = await prisma.item.update({
    where: { id },
    data: {
      currentBid: newAmount,
      bids: { increment: 1 },
      bidders: {
        connect: { id: user.id },
      },
    },
  });

  return NextResponse.json({
    success: true,
    newBid: updated.currentBid,
  });
}
