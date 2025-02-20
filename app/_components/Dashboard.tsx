import { Clock, DollarSign, Gavel, Trophy } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[
        {
          icon: <Gavel className="h-6 w-6 text-indigo-600" />,
          label: "Active Auctions",
          value: "124",
        },
        {
          icon: <Clock className="h-6 w-6 text-green-600" />,
          label: "Ending Soon",
          value: "38",
        },
        {
          icon: <DollarSign className="h-6 w-6 text-yellow-600" />,
          label: "Total Bids",
          value: "$45,290",
        },
        {
          icon: <Trophy className="h-6 w-6 text-purple-600" />,
          label: "Won Auctions",
          value: "12",
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
    </div>
  );
};

export default Dashboard;
