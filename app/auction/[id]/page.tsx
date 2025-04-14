"use client";

import React, { use, useEffect, useState } from "react";
import { Clock, Tag, Package2, Calendar, MoveLeftIcon } from "lucide-react";
// import { getUser } from "@/lib/getUser";

type Auction = {
  title: string;
  description: string;
  category: string;
  condition: string;
  startingPrice: number;
  duration: number;
  startDateTime: string;
  imageLinks: string[];
  timeLeft: string;
  isActive: boolean;
  bids: number;
};

type Props = {
  params: Promise<{ id: string }>;
};

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-md">
      <div className="flex flex-col items-center space-y-4">
        <svg
          className="w-12 h-12 animate-spin text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <p className="text-lg font-medium text-gray-700">Placing your bid...</p>
      </div>
    </div>
  );
};

function AuctionPage({ params }: Props) {
  const { id } = use(params);

  const [auction, setAuction] = useState<Auction | null>(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handlePlaceBid = async () => {
    const bidInterval = 10; // increment value
    setIsLoading(true);
    const response = await fetch(`/api/placeBid/${id}`, {
      method: "POST",
      body: JSON.stringify({ amount: bidInterval }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchBid = async () => {
      const res = await fetch(`/api/placeBid/${id}`, { method: "GET" });
      const data = await res.json();
      setCurrentBid(data.currentBid);
    };

    fetchBid();
    const interval = setInterval(fetchBid, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const res = await fetch(`/api/auction/${id}`);
        const data = await res.json();
        setAuction(data);
      } catch (error) {
        console.error("Error fetching auction:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuction();
  }, [id]);

  if (loading || !auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isLoading) {
    return <FullScreenLoader />;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-black my-auto">
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          <MoveLeftIcon />
        </button>
      </div>
      <div className="max-w-7xl mx-auto my-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery */}
            <div className="md:w-1/2 relative">
              <img
                src={auction.imageLinks[currentImageIndex]}
                alt={auction.title}
                className="w-full h-[400px] object-cover"
              />
              {auction.imageLinks.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {auction.imageLinks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        currentImageIndex === index ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Auction Details */}
            <div className="md:w-1/2 p-8">
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  auction.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {auction.isActive ? "Active" : "Ended"}
              </div>

              <h1 className="text-3xl font-bold mt-4">{auction.title}</h1>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-5 h-5 text-gray-500" />
                  <span className="text-2xl font-bold">
                    Base Price: ${auction.startingPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span>{auction.timeLeft}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span>
                    Started:{" "}
                    {new Date(auction.startDateTime).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Package2 className="w-5 h-5 text-gray-500" />
                  <span>{auction.condition}</span>
                </div>
              </div>

              {auction.bids > 0 && (
                <div className="mt-6">
                  <span className="text-2xl font-bold">
                    Current Bid: ${currentBid + auction.startingPrice}
                  </span>
                  <p>Bid Interval: $10</p>
                </div>
              )}

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{auction.description}</p>
              </div>

              <div className="mt-8">
                <button
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  disabled={!auction.isActive}
                  onClick={handlePlaceBid}
                >
                  {auction.isActive ? "Place Bid" : "Auction Ended"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionPage;
