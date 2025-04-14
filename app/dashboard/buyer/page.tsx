"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Gavel,
  Clock,
  DollarSign,
  Trophy,
  Search,
  Bell,
  User,
  ArrowUpRight,
  Timer,
  Home,
  Heart,
  History,
  Settings,
  LogOut,
  Menu,
  X,
  Eye,
  Package,
  AlertCircle,
  TrendingUp,
  Filter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Auction {
  id: number;
  title: string;
  currentBid: number;
  timeLeft: string;
  image: string;
  bids: number;
  category: string;
  isWatching?: boolean;
  yourBid?: number | null;
  status?: "winning" | "outbid" | "ended" | null;
}

interface Item {
  id: string;
  title: string;
  description: string;
  startingPrice: number;
  imageLinks: string[];
  category: string;
  condition: string;
  isActive: boolean;
  duration: number;
  startDateTime: string;
  timeLeft: string;
  currentBid: number;
  bids: number;
  views: number;
  watchers: number;
}

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState("watching");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const myBids: Auction[] = [
    {
      id: 1,
      title: "Vintage Mechanical Watch",
      currentBid: 1250,
      timeLeft: "2h 15m",
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
      bids: 23,
      category: "Accessories",
      yourBid: 1200,
      status: "outbid",
    },
    {
      id: 2,
      title: "Modern Art Painting",
      currentBid: 2800,
      timeLeft: "4h 30m",
      image:
        "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
      bids: 15,
      category: "Art",
      yourBid: 2800,
      status: "winning",
    },
    {
      id: 3,
      title: "Antique Writing Desk",
      currentBid: 950,
      timeLeft: "1h 45m",
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
      bids: 18,
      category: "Furniture",
      yourBid: 900,
      status: "outbid",
    },
  ];

  const watchlist: Auction[] = [
    {
      id: 4,
      title: "Vintage Camera Collection",
      currentBid: 780,
      timeLeft: "6h 20m",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
      bids: 12,
      category: "Electronics",
      isWatching: true,
    },
    {
      id: 5,
      title: "Handcrafted Leather Bag",
      currentBid: 350,
      timeLeft: "1d 3h",
      image:
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
      bids: 8,
      category: "Fashion",
      isWatching: true,
    },
  ];

  const recommendations: Auction[] = [
    {
      id: 6,
      title: "Limited Edition Vinyl Records",
      currentBid: 120,
      timeLeft: "3d 5h",
      image:
        "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80",
      bids: 5,
      category: "Music",
    },
    {
      id: 7,
      title: "Vintage Pocket Watch",
      currentBid: 450,
      timeLeft: "1d 12h",
      image:
        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=600&q=80",
      bids: 10,
      category: "Accessories",
    },
    {
      id: 8,
      title: "Handmade Ceramic Vase",
      currentBid: 85,
      timeLeft: "2d 8h",
      image:
        "https://images.unsplash.com/photo-1612196808214-b7e239e5d5e8?auto=format&fit=crop&w=600&q=80",
      bids: 7,
      category: "Home Decor",
    },
  ];

  const wonAuctions: Auction[] = [
    {
      id: 9,
      title: "Vintage Typewriter",
      currentBid: 320,
      timeLeft: "Ended",
      image:
        "https://images.unsplash.com/photo-1558461560-9d8c2a40e2d0?auto=format&fit=crop&w=600&q=80",
      bids: 14,
      category: "Collectibles",
      status: "ended",
    },
  ];

  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
    {
      icon: <Gavel className="h-5 w-5" />,
      label: "My Bids",
      href: "/buyer",
      active: true,
    },
    {
      icon: <Heart className="h-5 w-5" />,
      label: "Watchlist",
      href: "/buyer?tab=watching",
    },
    {
      icon: <Trophy className="h-5 w-5" />,
      label: "Won Auctions",
      href: "/buyer?tab=won",
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: "My Purchases",
      href: "/buyer/purchases",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      label: "Settings",
      href: "/settings",
    },
  ];

  const categories = [
    "All",
    "Art",
    "Collectibles",
    "Electronics",
    "Fashion",
    "Furniture",
    "Jewelry",
    "Music",
    "Accessories",
    "Home Decor",
  ];

  const getStatusColor = (status: string | null | undefined) => {
    switch (status) {
      case "winning":
        return "text-green-600";
      case "outbid":
        return "text-red-600";
      case "ended":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string | null | undefined) => {
    switch (status) {
      case "winning":
        return <TrendingUp className="h-4 w-4 mr-1" />;
      case "outbid":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case "ended":
        return <Clock className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getAuctionsForTab = () => {
    switch (activeTab) {
      case "bids":
        return myBids;
      case "watching":
        return watchlist;
      case "recommended":
        return recommendations;
      case "won":
        return wonAuctions;
      default:
        return myBids;
    }
  };

  function calculateTimeFields(startDateTime: Date, durationInDays: number) {
    const now = new Date();
    const start = new Date(startDateTime);
    const end = new Date(
      start.getTime() + durationInDays * 24 * 60 * 60 * 1000
    );

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

  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("http://localhost:3000/api/list-item", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await res.json();
        setItems(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchItems();
  }, []);

  if (loading) return <p className="text-center">Loading items...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out bg-white h-screen border-r border-gray-200 w-64 flex flex-col`}
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gavel className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">AuctionPro</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 w-full">
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-500 hover:text-gray-700"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex-1 flex items-center justify-end space-x-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search auctions..."
                    className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                  <Bell className="h-6 w-6" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <User className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center mt-4 sm:mt-0">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setCategoryFilter(category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          categoryFilter === category
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <div className="px-2">
                    <input
                      type="range"
                      min="0"
                      max="5000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], parseInt(e.target.value)])
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Auctions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((auction) => (
              <div
                key={auction.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={auction.imageLinks[0]}
                    alt={auction.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 right-2 bg-black bg-opacity-100 text-white px-2 py-1 rounded-full text-sm flex items-center">
                    <Timer className="h-4 w-4 mr-1" />
                    {
                      calculateTimeFields(
                        new Date(auction.startDateTime),
                        auction.duration
                      ).timeLeft
                    }
                  </div>
                  <div
                    className={`absolute top-10 right-2 px-2 py-1 rounded-full text-sm flex items-center ${
                      calculateTimeFields(
                        new Date(auction.startDateTime),
                        auction.duration
                      ).isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {calculateTimeFields(
                      new Date(auction.startDateTime),
                      auction.duration
                    ).isActive
                      ? "Active"
                      : "Ended"}
                  </div>
                  {/* {auction.status && (
                    <div
                      className={`absolute bottom-2 left-2 bg-white bg-opacity-90 px-2 py-1 rounded-full text-sm flex items-center ${getStatusColor(
                        auction.status
                      )}`}
                    >
                      {getStatusIcon(auction.status)}
                      {auction.status === "winning"
                        ? "Highest Bidder"
                        : auction.status === "outbid"
                        ? "Outbid"
                        : "Auction Ended"}
                    </div>
                  )} */}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {auction.category}
                    </span>
                    <span className="text-sm text-indigo-600">
                      {auction.bids} bids
                    </span>
                  </div>
                  <h3 className="text-lg text-black font-semibold mb-2">
                    {auction.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="text-xl font-bold text-gray-900">
                        ${auction.currentBid + auction.startingPrice}
                      </p>
                      {/* {auction.yourBid && (
                        <p className="text-xs text-gray-500 mt-1">
                          Your bid: ${auction.yourBid.toLocaleString()}
                        </p>
                      )} */}
                    </div>
                    <div className="flex flex-col space-y-2 mb-10">
                      {calculateTimeFields(
                        new Date(auction.startDateTime),
                        auction.duration
                      ).isActive && (
                        <button
                          className="flex items-center space-x-1 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                          onClick={() => router.push(`/auction/${auction.id}`)}
                        >
                          <span>Bid Now</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <h2 className="text-black font-md">
                    Start Date and Time:{" "}
                    {new Date(auction.startDateTime).toLocaleString()}
                  </h2>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {getAuctionsForTab().length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                {activeTab === "bids" ? (
                  <Gavel className="h-8 w-8 text-gray-400" />
                ) : activeTab === "watching" ? (
                  <Heart className="h-8 w-8 text-gray-400" />
                ) : activeTab === "won" ? (
                  <Trophy className="h-8 w-8 text-gray-400" />
                ) : (
                  <Package className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {activeTab === "bids"
                  ? "No active bids"
                  : activeTab === "watching"
                  ? "Your watchlist is empty"
                  : activeTab === "won"
                  ? "You haven't won any auctions yet"
                  : "No recommendations available"}
              </h3>
              <p className="text-gray-500 mb-4">
                {activeTab === "bids"
                  ? "Start bidding on items you're interested in"
                  : activeTab === "watching"
                  ? "Add items to your watchlist to track them"
                  : activeTab === "won"
                  ? "Keep bidding to win auctions"
                  : "Browse more auctions to get personalized recommendations"}
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Browse Auctions
              </Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
