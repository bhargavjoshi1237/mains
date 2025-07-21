import React from "react";

export default function TestCard() {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full max-w-md mx-auto">
      <div className="flex items-start justify-between">
        <div>
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-400">
            <i className="ti ti-briefcase text-white text-lg" />
          </span>
        </div>
        <div className="flex-1 ml-3">
          <div className="flex items-center justify-between flex-wrap">
            <div>
              <p className="text-gray-500 mb-0">Total Deals</p>
              <h4 className="font-semibold mt-1 text-xl">2,543</h4>
            </div>
            <div style={{ minHeight: 40, width: 100 }}>
              {/* Replace with a real chart if needed */}
              <svg width="100" height="40" viewBox="0 0 100 40">
                <defs>
                  <linearGradient id="dealsChartGradient" x1="0" y1="1" x2="1" y2="1">
                    <stop offset="0" stopColor="#7b5c25" stopOpacity="0.9" />
                    <stop offset="1" stopColor="#f5b849" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 8C4.375 8 8.125 8 12.5 8C16.875 8 20.625 4.8 25 4.8C29.375 4.8 33.125 25.6 37.5 25.6C41.875 25.6 45.625 20.8 50 20.8C54.375 20.8 58.125 17.6 62.5 17.6C66.875 17.6 70.625 9.6 75 9.6C79.375 9.6 83.125 24 87.5 24C91.875 24 95.625 0 100 0"
                  stroke="url(#dealsChartGradient)"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <a className="text-yellow-500 font-medium flex items-center gap-1" href="#">
              View All
              <i className="ti ti-arrow-narrow-right ml-2 font-semibold"></i>
            </a>
            <div className="text-end">
              <p className="mb-0 text-green-600 font-semibold">+19%</p>
              <span className="text-gray-500 text-xs">this month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
