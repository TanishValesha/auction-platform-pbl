"use client";

import { Gavel, Heart, Home, Settings, History, X } from "lucide-react";
import React, { useState } from "react";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { icon: <Home className="h-5 w-5" />, label: "Dashboard", active: true },
    { icon: <Gavel className="h-5 w-5" />, label: "My Auctions" },
    { icon: <Heart className="h-5 w-5" />, label: "Watchlist" },
    { icon: <History className="h-5 w-5" />, label: "Bid History" },
    { icon: <Settings className="h-5 w-5" />, label: "Settings" },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } fixed lg:relative lg:translate-x-0 z-30 transition-transform duration-300 ease-in-out bg-white h-100vh border-r border-gray-200 w-64 flex flex-col`}
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
              <a
                href="#"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
