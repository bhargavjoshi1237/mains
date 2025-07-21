import React from "react";
import Navbar from "./Navbar";
import TargetCard from "./TargetCard";
import StatsGrid from "./StatsGrid";
import LeadsBySource from "./LeadsBySource";
import TopDeals from "./TopDeals";
import TestCard from "./test";
import DealsStatus from "./DealsStatus";
import RevenueAnalytics from "./RevenueAnalytics";
import ProfitEarned from "./ProfitEarned"; // <-- Add import
import RecentActivity from "./RecentActivity";

// Responsive dashboard grid based on provided image
const UIPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="bg-[#f0f1f7] min-h-screen ml-[70px]">
        {/* Header & Actions */}
        <div className="w-full px-4 pt-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
            <div>
              <p className="font-bold text-lg">Welcome back, Json Taylor !</p>
              <p className="text-md text-gray-500">
                Track your sales activity, leads and details here.
              </p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0 justify-end">
              <button className="bg-purple-500 h-11 text-white px-4 py-2 rounded-lg flex items-center">
                <img
                  src="https://api.iconify.design/ic:baseline-filter-list.svg?color=white"
                  alt="Filter"
                  className="w-5 h-5 mr-2"
                />
                Filters
              </button>
              <button className="bg-transparent border border-blue-500 h-11 text-white px-4 py-2 rounded-lg flex items-center">
                <img
                  src="https://api.iconify.design/ic:outline-cloud-download.svg?color=blue"
                  alt="Download"
                  className="w-5 h-5 mr-2"
                />
                <p className="text-blue-500">Export</p>
              </button>
            </div>
          </div>
        </div>
        {/* Main Dashboard Grid */}
        <div className="w-full px-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 auto-rows-min">
            {/* Left column: TargetCard, TopDeals */}
            <div className="flex flex-col gap-6 col-span-1">
              <TargetCard />
              <TopDeals />
              <ProfitEarned /> {/* <-- Add here */}
            </div>
            {/* Center column: StatsGrid cards */}
            <div className="flex flex-col gap-6 col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:outline-supervisor-account.svg?color=white"
                  iconBg="bg-purple-500"
                  mainLabel="Total Customers"
                  mainValue="1,02,890"
                  statValue="+40%"
                  statSub="this month"
                  statValueColor="text-green-500"
                />
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:outline-attach-money.svg?color=white"
                  iconBg="bg-blue-500"
                  mainLabel="Total Revenue"
                  mainValue="$56,562"
                  statValue="+25%"
                  statSub="this month"
                  statValueColor="text-green-500"
                />
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:baseline-bar-chart.svg?color=white"
                  iconBg="bg-green-400"
                  mainLabel="Conversion Ratio"
                  mainValue="12.08%"
                  statValue="-12%"
                  statSub="this month"
                  statValueColor="text-red-500"
                />
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:outline-handshake.svg?color=white"
                  iconBg="bg-yellow-500"
                  mainLabel="Total Deals"
                  mainValue="2,543"
                  statValue="+19%"
                  statSub="this month"
                  statValueColor="text-green-500"
                />
              </div>
              <div className="w-full flex flex-col lg:block">
                {/* Show RevenueAnalytics only on large screens here */}
                <div className="hidden lg:block">
                  <RevenueAnalytics />
                </div>
              </div>
            </div>
            {/* Right column: LeadsBySource, DealsStatus */}
            <div className="flex flex-col gap-6 col-span-1">
              <LeadsBySource />
              <DealsStatus />
              <RecentActivity />
            </div>
          </div>
          {/* On small screens, show RevenueAnalytics below all columns */}
          <div className="block lg:hidden mt-6">
            <RevenueAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UIPage;