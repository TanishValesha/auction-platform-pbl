import { ArrowUpRight, Timer } from "lucide-react";
import React from "react";
import Image from "next/image";

interface Auction {
  id: number;
  title: string;
  currentBid: number;
  timeLeft: string;
  image: string;
  bids: number;
  category: string;
}

interface AuctionGridProps {
  auction: Auction;
}

const AuctionGrid = ({ auction }: AuctionGridProps) => {
  const { id, title, currentBid, timeLeft, image, bids, category } = auction;

  return (
    <div
      key={id}
      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm flex items-center">
          <Timer className="h-4 w-4 mr-1" />
          {timeLeft}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{category}</span>
          <span className="text-sm text-indigo-600">{bids} bids</span>
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Bid</p>
            <p className="text-xl font-bold text-gray-900">
              ${currentBid.toLocaleString()}
            </p>
          </div>
          <button className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <span>Bid Now</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuctionGrid;
