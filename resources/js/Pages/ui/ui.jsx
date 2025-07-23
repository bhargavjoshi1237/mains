import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import TargetCard from "./TargetCard";
import StatsGrid from "./StatsGrid";
import LeadsBySource from "./LeadsBySource";
import TopDeals from "./TopDeals";
import DealsStatus from "./DealsStatus";
import RevenueAnalytics from "./RevenueAnalytics";
import ProfitEarned from "./ProfitEarned";
import RecentActivity from "./RecentActivity";
import DealsStatistics from "./DealsStatistics";


const UIPage = () => {
  const [sidebarDocked, setSidebarDocked] = useState(false);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [theme, setTheme] = useState('light');

  const handleSetTheme = (newTheme) => {
    setTheme(newTheme);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';

    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
    };
  }, []);


  useEffect(() => {
    const handleSidebarState = (event) => {
      if (event.detail) {
        setSidebarDocked(event.detail.docked);
        setSidebarHovered(event.detail.hovered);
      }
    };

    window.addEventListener('sidebarStateChange', handleSidebarState);
    return () => window.removeEventListener('sidebarStateChange', handleSidebarState);
  }, []);

  const sidebarWidth = sidebarDocked || sidebarHovered ? 256 : 70;

  return (
    <div className={`min-h-screen overflow-x-hidden ${theme === "dark" ? "bg-neutral-900" : "bg-neutral-50"}`}>
      <Sidebar theme={theme} />
      <Navbar
        sidebarWidth={isMobile ? 0 : sidebarWidth}
        theme={theme}
        onThemeChange={handleSetTheme}
      />
      <div
        className={`min-h-screen transition-all duration-300 pt-14 overflow-x-hidden`}
        style={{
          marginLeft: isMobile ? '0px' : `${sidebarWidth}px`,
          backgroundColor: theme === "dark" ? "#252729" : "#f0f1f7"
        }}
      >

        <div className="w-full px-3 sm:px-4 lg:px-6 pt-4 sm:pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h1 className={`font-bold text-md sm:text-xl lg:text-xl truncate ${theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}>
                Welcome back, Json Taylor !
              </h1>
              <p className={` text-sm sm:text-sm   ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                Track your sales activity, leads and details here.
              </p>
            </div>
            <div className="flex  gap-3 items-center justify-start sm:gap-3 w-full sm:w-auto">
              <button className="bg-[#845adf] h-10 text-white mt-2 px-3 py-2 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium hover:bg-purple-600 transition-colors">
                <img
                  src="https://api.iconify.design/ic:baseline-filter-list.svg?color=white"
                  alt="Filter"
                  className="w-4 h-4 mr-2"
                />
                <p className="-mt-0.5">Filters</p>
              </button>
              <button className="bg-transparent mr-2 border border-[#23B7E5] hover:bg-[#23B7E5] hover:text-white h-10 mt-1.5 text-[#23B7E5] px-3 py-2 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium  transition-colors">
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


        <div className="w-full px-3 sm:px-4 lg:px-6 mt-4 sm:mt-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

            <div className="lg:col-span-1 xl:col-span-1 space-y-4 sm:space-y-6">
              <TargetCard theme={theme} />
              <div className="hidden sm:block">
                <TopDeals theme={theme} />
              </div>
              <div className="hidden xl:block">
                <ProfitEarned theme={theme} />
              </div>
            </div>

            <div className="lg:col-span-2 xl:col-span-2 space-y-4 sm:space-y-6">
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

              <div className="hidden md:block">
                <RevenueAnalytics theme={theme} />
              </div>
            </div>

            <div className="hidden xl:block xl:col-span-1 space-y-4 sm:space-y-6">
              <LeadsBySource theme={theme} />
              <DealsStatus theme={theme} />
            </div>
          </div>

          <div className="hidden lg:block xl:hidden mt-4 sm:mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <LeadsBySource theme={theme} />
              <DealsStatus theme={theme} />
            </div>
          </div>

          <div className="hidden md:block lg:hidden mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <LeadsBySource theme={theme} />
            <DealsStatus theme={theme} />
          </div>

          <div className="block sm:hidden mt-4 space-y-4">
            <TopDeals theme={theme} />
            <LeadsBySource theme={theme} />
            <DealsStatus theme={theme} />
          </div>

          <div className="hidden sm:block md:hidden mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <LeadsBySource theme={theme} />
            <DealsStatus theme={theme} />
          </div>

          <div className="block md:hidden mt-4 sm:mt-6">
            <RevenueAnalytics theme={theme} />
          </div>

          <div className="block xl:hidden mt-4 sm:mt-6">
            <ProfitEarned theme={theme} />
          </div>
        </div>

        <div className="w-full px-3 sm:px-4 lg:px-6 mt-4 sm:mt-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="lg:col-span-3">
              <DealsStatistics theme={theme} />
            </div>
            <div className="lg:col-span-1">
              <RecentActivity theme={theme} />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UIPage;