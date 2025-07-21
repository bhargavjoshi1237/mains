import React from "react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenueAnalytics() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
        <div className="flex items-center">
          <div className="flex flex-col mr-2">
            <span className="w-1 h-2 bg-[#ae97f3]"></span>
            <span className="w-1 h-2 bg-[#97f0a2]"></span>
          </div>
          <span className="font-semibold text-gray-900 text-base sm:text-lg">Revenue Analytics</span>
        </div>
        <a href="#" className="text-xs sm:text-sm text-blue-500 font-semibold hover:underline self-start sm:self-auto">View All</a>
      </div>

      <hr className="border-gray-200 mb-4" />

      <div className="text-gray-500 text-xs sm:text-sm mb-4">Revenue Analytics with sales & profit (USD)</div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px] sm:min-w-0">
          <svg viewBox="0 0 800 280" width="100%" height="240" className="bg-white sm:h-64 lg:h-80">

            {[0, 200, 400, 600, 800, 1000].map((y, i) => (
              <line
                key={y}
                x1="60"
                x2="780"
                y1={260 - (y / 1000) * 240}
                y2={260 - (y / 1000) * 240}
                stroke="#e5e7eb"
                strokeDasharray="4"
              />
            ))}


            {months.map((m, i) => (
              <text
                key={m}
                x={60 + i * 60}
                y={275}
                fontSize="11"
                fill="#6b7280"
                textAnchor="middle"
                className="sm:text-xs"
              >
                {m}
              </text>
            ))}


            {[0, 200, 400, 600, 800, 1000].map((y, i) => (
              <text
                key={y}
                x={48}
                y={260 - (y / 1000) * 240 + 4}
                fontSize="11"
                fill="#6b7280"
                textAnchor="end"
                className="sm:text-xs"
              >
                ${y}
              </text>
            ))}


            <path
              fill="none"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              d="M60,240
                C90,180 150,200 180,160
                C210,140 270,160 300,120
                C330,100 390,140 420,100
                C450,80 510,120 540,80
                C570,60 630,140 660,120
                C690,100 750,120 780,80"
            />


            <path
              fill="none"
              stroke="#a78bfa"
              strokeWidth="2.5"
              d="M60,250
                C90,200 150,220 180,180
                C210,160 270,180 300,140
                C330,120 390,160 420,140
                C450,120 510,160 540,140
                C570,120 630,180 660,160
                C690,140 750,160 780,120"
            />
          </svg>
        </div>
      </div>


      <div className="flex flex-wrap gap-4 sm:gap-6 mt-4 justify-center sm:justify-start">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-800 inline-block"></span>
          <span className="text-xs sm:text-sm text-gray-700 font-medium">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38bdf8] inline-block"></span>
          <span className="text-xs sm:text-sm text-gray-700 font-medium">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#a78bfa] inline-block"></span>
          <span className="text-xs sm:text-sm text-gray-700 font-medium">Profit</span>
        </div>
      </div>
    </div>
  );
}
