import { prisma } from "@/lib/db"; // adjust the path to your prisma client
import { NextResponse } from "next/server";

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

    return NextResponse.json(auctions, { status: 200 });
  } catch (error) {
    console.error("Error fetching auctions for user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
