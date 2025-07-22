import React, { useState, useEffect } from "react";
import Sidebar from "../Ui/Sidebar";
import Navbar from "../Ui/Navbar";
import TargetCard from "../Ui/TargetCard";
import StatsGrid from "../Ui/StatsGrid";
import LeadsBySource from "../Ui/LeadsBySource";
import TopDeals from "../Ui/TopDeals";
import DealsStatus from "../Ui/DealsStatus";
import RevenueAnalytics from "../Ui/RevenueAnalytics";
import ProfitEarned from "../Ui/ProfitEarned";
import RecentActivity from "../Ui/RecentActivity";
import DealsStatistics from "../Ui/DealsStatistics";

const XDPage = () => {
  const [sidebarDocked, setSidebarDocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [theme, setTheme] = useState('light');

  const sidebarWidth = sidebarDocked || sidebarHovered ? 256 : 70;

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === "dark" ? "" : ""}`} style={theme === "dark" ? { backgroundColor: "#252729" } : {}}>

      <div className="hidden lg:block">
        <Sidebar theme={theme} />
      </div>
      <Navbar
        sidebarWidth={sidebarWidth}
        theme={theme}
        onThemeChange={setTheme}
      />
      <div
        className={`min-h-screen transition-all duration-300 pt-14 overflow-x-hidden ${sidebarDocked || sidebarHovered ? "lg:ml-[256px]" : "lg:ml-[70px]"} ml-0`}
        style={{
          backgroundColor: theme === "dark" ? "#252729" : "#f0f1f7"
        }}
      >

        <div className="w-full px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className={`font-bold text-md sm:text-xl lg:text-xl truncate ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}>
                Welcome back, Json Taylor !
              </h1>
              <p className={`text-sm sm:text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                Track your sales activity, leads and details here.
              </p>
            </div>
            <div className="flex gap-3 items-center justify-start sm:gap-3 w-full sm:w-auto">
              <button className="bg-[#845adf] h-9 text-white px-3 py-2 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium hover:bg-purple-600 transition-colors">
                <img
                  src="https://api.iconify.design/ic:baseline-filter-list.svg?color=white"
                  alt="Filter"
                  className="w-4 h-4 mr-2"
                />
                Filters
              </button>
              <button className="bg-transparent border border-[#23B7E5] h-9 text-[#23B7E5] px-3 py-2 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium hover:bg-blue-50 transition-colors">
                <img
                  src="https://api.iconify.design/ic:outline-cloud-download.svg?color=%2323B7E5"
                  alt="Download"
                  className="w-4 h-4 mr-2"
                />
                Export
              </button>
            </div>
          </div>
        </div>
        <div className="w-full px-3 sm:px-4 lg:px-6 mt-4 sm:mt-6 flex flex-col gap-4 sm:gap-6 lg:hidden">

          <TargetCard theme={theme} />
          <TopDeals theme={theme} />
          <ProfitEarned theme={theme} />
          <LeadsBySource theme={theme} />
          <DealsStatus theme={theme} />
          <RevenueAnalytics theme={theme} />
        </div>

        <div className="w-full px-3 sm:px-4 lg:px-6 mt-4 sm:mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">

            <div className="hidden lg:flex flex-col space-y-4 sm:space-y-6 lg:col-span-1">
              <TargetCard theme={theme} />
              <TopDeals theme={theme} />
              <ProfitEarned theme={theme} />
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-6 lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:outline-supervisor-account.svg?color=white"
                  iconBg="bg-purple-500"
                  mainLabel="Total Customers"
                  mainValue="1,02,890"
                  statValue="+40%"
                  statSub="this month"
                  statValueColor="text-green-500"
                  theme={theme}
                />
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:outline-attach-money.svg?color=white"
                  iconBg="bg-blue-500"
                  mainLabel="Total Revenue"
                  mainValue="$56,562"
                  statValue="+25%"
                  statSub="this month"
                  statValueColor="text-green-500"
                  theme={theme}
                />
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:baseline-bar-chart.svg?color=white"
                  iconBg="bg-green-400"
                  mainLabel="Conversion Ratio"
                  mainValue="12.08%"
                  statValue="-12%"
                  statSub="this month"
                  statValueColor="text-red-500"
                  theme={theme}
                />
                <StatsGrid
                  iconImg="https://api.iconify.design/ic:outline-handshake.svg?color=white"
                  iconBg="bg-yellow-500"
                  mainLabel="Total Deals"
                  mainValue="2,543"
                  statValue="+19%"
                  statSub="this month"
                  statValueColor="text-green-500"
                  theme={theme}
                />
              </div>
              <RevenueAnalytics theme={theme} />
            </div>

            <div className="flex flex-col space-y-4 sm:space-y-6 lg:col-span-1">
              <LeadsBySource theme={theme} />
              <DealsStatus theme={theme} />
            </div>
          </div>
        </div>





        <div className="w-full px-3 sm:px-4 lg:px-6 mt-4 sm:mt-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="lg:col-span-3">
              <DealsStatistics theme={theme} />
            </div>
            <div className="lg:col-span-1  ">
              <RecentActivity theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XDPage;
