import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);

  try {
    // Get highest bid for the auction
    const highestBid = await prisma.bid.findFirst({
      where: { itemId: id },
      orderBy: { placedAmount: "desc" },
    });

    console.log(highestBid);

    // Update auction with winner and mark it as ended
    const endedAuction = await prisma.item.update({
      where: { id },
      data: {
        winnerId: highestBid?.userId || null, // Set null if no bids
        hasEnded: true, // to force end
      },
    });

    console.log({
      message: "Auction ended successfully",
      auction: endedAuction,
      winner: highestBid ? highestBid.userId : null,
      winningBid: highestBid ? highestBid.placedAmount : null,
    });

    return NextResponse.json(
      {
        message: "Auction ended successfully",
        auction: endedAuction,
        winner: highestBid ? highestBid.id : null,
        winningBid: highestBid ? highestBid.placedAmount : null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error ending auction:", error);
    return NextResponse.json(
      { error: "Failed to end auction" },
      { status: 500 }
    );
  }
}
