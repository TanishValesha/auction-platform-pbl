-- CreateEnum
CREATE TYPE "ItemCondition" AS ENUM ('new', 'like_new', 'excellent', 'good', 'fair', 'poor');

-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('Art', 'Collectibles', 'Electronics', 'Fashion', 'Furniture', 'Jewelry', 'Music', 'Accessories', 'Home', 'Decor', 'Books', 'Sports', 'Toys', 'Vehicles', 'Other');

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "currentBid" INTEGER NOT NULL DEFAULT 0,
    "startingPrice" INTEGER NOT NULL,
    "buyNowPrice" INTEGER,
    "imageLinks" TEXT[],
    "bids" INTEGER NOT NULL DEFAULT 0,
    "category" "ItemType" NOT NULL,
    "condition" "ItemCondition" NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "watchers" INTEGER NOT NULL DEFAULT 0,
    "duration" INTEGER NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
