"use client";

import React, { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("live");
  return (
    <div className="border-b border-gray-200 mb-6">
      <nav className="flex space-x-8">
        {["live", "upcoming", "ended"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`${
              activeTab === tab
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
          >
            {tab} Auctions
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Tabs;
