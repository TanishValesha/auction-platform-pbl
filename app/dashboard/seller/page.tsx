"use client";

import { useEffect, useState } from "react";
import {
  Gavel,
  // Clock,
  DollarSign,
  // Trophy,
  Search,
  Bell,
  User,
  // ArrowUpRight,
  // Timer,
  // Home,
  Heart,
  // History,
  Settings,
  LogOut,
  Menu,
  X,
  // Package,
  PlusCircle,
  BarChart2,
  // Tag,
  Truck,
  // Edit,
  // Trash2,
  Eye,
  // AlertCircle,
  CheckCircle,
  // Filter,
  // Calendar,
  // ChevronDown,
  // ChevronUp,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Auction {
  id: number;
  title: string;
  currentBid: number | null;
  startingPrice: number;
  reservePrice?: number;
  timeLeft: string;
  imageLinks: string[];
  bids: number;
  category: string;
  status: "active" | "scheduled" | "ended";
  views: number;
  watchers: number;
  endDate: string;
  featured?: boolean;
  isActive: boolean;
  hasEnded: boolean;
}

export default function SellerDashboard() {
  // const [activeTab, setActiveTab] = useState("active");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const router = useRouter();
  // const [showFilters, setShowFilters] = useState(false);
  // const [sortBy, setSortBy] = useState("endDate");
  // const [sortDirection, setSortDirection] = useState("asc");

  // const activeAuctions: Auction[] = [
  //   {
  //     id: 1,
  //     title: "Vintage Mechanical Watch",
  //     currentBid: 1250,
  //     startingPrice: 800,
  //     reservePrice: 1500,
  //     timeLeft: "2h 15m",
  //     image:
  //       "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
  //     bids: 23,
  //     category: "Accessories",
  //     status: "active",
  //     views: 156,
  //     watchers: 12,
  //     endDate: "2025-06-15",
  //   },
  //   {
  //     id: 2,
  //     title: "Modern Art Painting",
  //     currentBid: 2800,
  //     startingPrice: 1500,
  //     reservePrice: 3000,
  //     timeLeft: "4h 30m",
  //     image:
  //       "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
  //     bids: 15,
  //     category: "Art",
  //     status: "active",
  //     views: 203,
  //     watchers: 18,
  //     endDate: "2025-06-16",
  //   },
  //   {
  //     id: 3,
  //     title: "Antique Writing Desk",
  //     currentBid: 950,
  //     startingPrice: 600,
  //     timeLeft: "1h 45m",
  //     image:
  //       "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
  //     bids: 18,
  //     category: "Furniture",
  //     status: "active",
  //     views: 89,
  //     watchers: 7,
  //     endDate: "2025-06-14",
  //   },
  // ];

  // const scheduledAuctions: Auction[] = [
  //   {
  //     id: 4,
  //     title: "Vintage Camera Collection",
  //     currentBid: null,
  //     startingPrice: 500,
  //     timeLeft: "Starts in 2d",
  //     image:
  //       "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
  //     bids: 0,
  //     category: "Electronics",
  //     status: "scheduled",
  //     views: 0,
  //     watchers: 0,
  //     endDate: "2025-06-20",
  //   },
  // ];

  // const endedAuctions: Auction[] = [
  //   {
  //     id: 5,
  //     title: "Handcrafted Leather Bag",
  //     currentBid: 350,
  //     startingPrice: 200,
  //     timeLeft: "Ended",
  //     image:
  //       "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=600&q=80",
  //     bids: 8,
  //     category: "Fashion",
  //     status: "ended",
  //     views: 112,
  //     watchers: 5,
  //     endDate: "2025-06-10",
  //   },
  //   {
  //     id: 6,
  //     title: "Limited Edition Vinyl Records",
  //     currentBid: 120,
  //     startingPrice: 80,
  //     timeLeft: "Ended",
  //     image:
  //       "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&w=600&q=80",
  //     bids: 5,
  //     category: "Music",
  //     status: "ended",
  //     views: 78,
  //     watchers: 3,
  //     endDate: "2025-06-08",
  //   },
  // ];

  const fetchAuctions = async () => {
    const res1 = await fetch("/api/getUser");
    const data1 = await res1.json();
    const res = await fetch(`/api/seller-auction/${data1.user.id}`);
    const data = await res.json();
    setAuctions(data);
  };

  useEffect(() => {
    fetchAuctions();
  }, []);

  const sidebarItems = [];

  // const getAuctionsForTab = () => {
  //   switch (activeTab) {
  //     case "active":
  //       return activeAuctions;
  //     case "scheduled":
  //       return scheduledAuctions;
  //     case "ended":
  //       return endedAuctions;
  //     case "draft":
  //       return draftAuctions;
  //     default:
  //       return [];
  //   }
  // };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <CheckCircle className="h-3 w-3 mr-1" />
            Active
          </span>
        );
      default:
        return null;
    }
  };

  const endAuction = async (auctionId: string) => {
    try {
      const res = await fetch(`/api/end-auction/${auctionId}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          `Auction ended! ${
            data.winner
              ? `Winner: ${data.winner} (Bid: ₹${data.winningBid})`
              : "No bids placed"
          }`
        );
        fetchAuctions();
        // Optionally: refresh UI or navigate to result page
      } else {
        toast.error("Error: " + data.error);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  // const toggleSort = (field: string) => {
  //   if (sortBy === field) {
  //     setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortBy(field);
  //     setSortDirection("asc");
  //   }
  // };

  // const getSortIcon = (field: string) => {
  //   if (sortBy !== field) return null;
  //   return sortDirection === "asc" ? (
  //     <ChevronUp className="h-4 w-4" />
  //   ) : (
  //     <ChevronDown className="h-4 w-4" />
  //   );
  // };

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
          <button
            className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 w-full"
            onClick={async () => {
              const res = await fetch("/api/logout", {
                method: "POST",
              });
              if (res.ok) {
                toast.success("Logged Out!");
                router.push("/auth");
              }
            }}
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1">
        {/* Header */}
        {/* <header className="bg-white shadow-sm sticky top-0 z-20">
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
                    placeholder="Search listings..."
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
        </header> */}

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-8">
          {/* Seller Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                icon: <Gavel className="h-6 w-6 text-indigo-600" />,
                label: "Active Listings",
                value: activeAuctions.length.toString(),
              },
              {
                icon: <DollarSign className="h-6 w-6 text-green-600" />,
                label: "Total Earnings",
                value: "$4,850",
              },
              {
                icon: <Eye className="h-6 w-6 text-yellow-600" />,
                label: "Total Views",
                value: "638",
              },
              {
                icon: <Trophy className="h-6 w-6 text-purple-600" />,
                label: "Completed Sales",
                value: endedAuctions.length.toString(),
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                  </div>
                  {stat.icon}
                </div>
              </div>
            ))}
          </div> */}

          {/* Create Listing Button */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Listings</h1>
            <Link
              href="/dashboard/seller/create"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create New Listing
            </Link>
          </div>
          {/* Filters */}
          {/* {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort By
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "endDate", label: "End Date" },
                      { id: "currentBid", label: "Current Bid" },
                      { id: "bids", label: "Number of Bids" },
                      { id: "views", label: "Views" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => toggleSort(option.id)}
                        className={`px-3 py-1 rounded-full text-sm flex items-center ${
                          sortBy === option.id
                            ? "bg-indigo-100 text-indigo-800"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {option.label}
                        {getSortIcon(option.id)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Featured", "Reserve Met", "Reserve Not Met"].map(
                      (status) => (
                        <button
                          key={status}
                          className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                        >
                          {status}
                        </button>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <span>to</span>
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )} */}

          {/* Listings Table */}
          <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Current Bid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Bids
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Time Left
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auctions.map((auction) => (
                    <tr key={auction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 relative">
                            <Image
                              src={auction.imageLinks[0]}
                              alt={auction.title}
                              className="rounded-md object-cover"
                              width={40}
                              height={40}
                            />
                            {auction.featured && (
                              <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-0.5">
                                <Star className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {auction.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              {auction.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {auction.isActive && !auction.hasEnded
                          ? "Active"
                          : "Not Active"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {auction.currentBid
                            ? `$${auction.currentBid.toLocaleString()}`
                            : "-"}
                        </div>
                        <div className="text-xs text-gray-500">
                          Start: ${auction.startingPrice.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {auction.bids}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                        {!auction.hasEnded ? auction.timeLeft : "Ended"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          disabled={auction.hasEnded}
                          className="px-4 py-2 disabled:bg-red-950 disabled:cursor-not-allowed bg-red-600 text-white rounded hover:bg-red-700"
                          onClick={() => endAuction(auction.id.toString())}
                        >
                          End Auction
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Quick Analytics */}
          {/* {activeTab === "active" && activeAuctions.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Quick Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Listing Performance
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Views to Bids Conversion
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          18%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: "18%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Reserve Price Met
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          2/3
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "66%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">
                          Watchers to Bidders
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          43%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: "43%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Top Performing Categories
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
                      <span className="text-sm text-gray-600 flex-1">
                        Accessories
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        45%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-600 flex-1">Art</span>
                      <span className="text-sm font-medium text-gray-900">
                        30%
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="text-sm text-gray-600 flex-1">
                        Furniture
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        25%
                      </span>
                    </div>
                    <Link
                      href="/seller/analytics"
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center mt-2"
                    >
                      View detailed analytics
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )} */}
        </main>
      </div>
    </div>
  );
}
