import React from "react";

const salesData = [120, 600, 400, 300, 500, 800, 400, 900, 700, 600, 400, 300];
const profitData = [150, 200, 300, 400, 350, 600, 800, 700, 900, 400, 200, 400];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function RevenueAnalytics() {
  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-[900px] min-w-0">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="flex flex-col">
                        <span className="w-1 h-2   bg-[#ae97f3] mr-2"></span>
                        <span className="w-1 h-2  bg-[#97f0a2] mr-2"></span>
                    </div>
          <span className="font-semibold text-gray-900 text-lg">Revenue Analytics</span>
        </div>
        <a href="#" className="text-xs text-blue-500 font-semibold hover:underline">View All</a>
      </div>
      <hr className="mb-4"/>
      <div className="text-gray-500 text-sm mb-2">Revenue Analytics with sales & profit (USD)</div>
      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 800 320" width="100%" height="320" className="bg-white">
          {/* Y axis grid lines */}
          {[0, 200, 400, 600, 800, 1000].map((y, i) => (
            <line
              key={y}
              x1="60"
              x2="780"
              y1={300 - (y / 1000) * 280}
              y2={300 - (y / 1000) * 280}
              stroke="#e5e7eb"
              strokeDasharray="4"
            />
          ))}
          {/* X axis labels */}
          {months.map((m, i) => (
            <text
              key={m}
              x={60 + i * 60}
              y={315}
              fontSize="13"
              fill="#6b7280"
              textAnchor="middle"
            >
              {m}
            </text>
          ))}
        
                  {[0, 200, 400, 600, 800, 1000].map((y, i) => (
                    <text
                      key={y}
                      x={48} // Move labels closer to chart, away from edge
                      y={300 - (y / 1000) * 280 + 5}
                      fontSize="13"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      ${y}
                    </text>
                  ))}
                  {/* Sales line (dashed, smooth curve) */}
          <path
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeDasharray="8 6"
            d="M60,300
              C90,220 150,260 180,220
              C210,180 270,200 300,160
              C330,120 390,180 420,120
              C450,80 510,160 540,100
              C570,60 630,180 660,140
              C690,100 750,120 780,80"
          />
          {/* Profit line (solid, smooth curve) */}
          <path
            fill="none"
            stroke="#a78bfa"
            strokeWidth="3"
            d="M60,290
              C90,240 150,260 180,200
              C210,180 270,220 300,180
              C330,140 390,200 420,160
              C450,120 510,200 540,160
              C570,120 630,220 660,180
              C690,140 750,160 780,120"
          />
        </svg>
      </div>
      {/* Legend */}
      <div className="flex gap-6 mt-4 ml-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-black inline-block"></span>
          <span className="text-sm text-gray-700">Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38bdf8] inline-block"></span>
          <span className="text-sm text-gray-700">Revenue</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#a78bfa] inline-block"></span>
          <span className="text-sm text-gray-700">Profit</span>
        </div>
      </div>
    </div>
  );
}
