import AuctionGrid from "../_components/AuctionGrid";
import Dashboard from "../_components/Dashboard";
import Header from "../_components/Header";
import Sidebar from "../_components/Sidebar";
import Tabs from "../_components/Tabs";

interface Auction {
  id: number;
  title: string;
  currentBid: number;
  timeLeft: string;
  image: string;
  bids: number;
  category: string;
}

export default async function Home() {
  const auctions: Auction[] = [
    {
      id: 1,
      title: "Vintage Mechanical Watch",
      currentBid: 1250,
      timeLeft: "2h 15m",
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
      bids: 23,
      category: "Accessories",
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
    },
    {
      id: 4,
      title: "Antique Writing Desk",
      currentBid: 950,
      timeLeft: "1h 45m",
      image:
        "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80",
      bids: 18,
      category: "Furniture",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-y-hidden">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-1">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <Dashboard />
          {/* Tabs */}
          <Tabs />
          {/* Auctions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((item) => (
              <AuctionGrid key={item.id} auction={item} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
