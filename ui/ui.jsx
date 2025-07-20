import React from "react";
import Navbar from "./Navbar";
import TargetCard from "./TargetCard";
import StatsGrid from "./StatsGrid";
import LeadsBySource from "./LeadsBySource";

const UIPage = () => {
  return (
    <div className="">
      <Navbar />
      <div className="bg-[#f0f1f7] h-screen ml-[75px]">
        <div className="ml-auto mr-auto items-center justify-center flex  w-[98%]">
          <div className="   ml-auto mr-auto w-[98%] mt-5">
            <p className=" font-bold text-lg">Welcome back, Json Taylor !</p>
            <p className="text-md">
              Track your sales activity, leads and details here.
            </p>
          </div>

          <div className="   ml-auto mr-auto items-center  w-[98%] mt-5 flex gap-3 justify-end">
            <button className="bg-purple-500 h-11 text-white px-4 py-2 rounded-lg flex items-center">
              <img
                src="https://api.iconify.design/ic:baseline-filter-list.svg?color=white"
                alt="Filter"
                className="w-5 h-5 mr-2"
              />
              Filters
            </button>

            <button className="bg-transparent border border-blue-500 h-11  text-white px-4 py-2 rounded-lg flex items-center">
              <img
                src="https://api.iconify.design/ic:outline-cloud-download.svg?color=blue"
                alt="Download"
                className="w-5 h-5 mr-2"
              />
              <p className="text-blue-500">Export</p>
            </button>
          </div>
        </div>
        <div className=" flex h-full justify-start w-[98%] mx-auto mt-8  ">
          <TargetCard />
          <div className="flex gap-5 ml-5 ">
            <div className="flex flex-col gap-5">

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
          

            </div>
            <div className="flex flex-col gap-5">

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
            <LeadsBySource />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UIPage;