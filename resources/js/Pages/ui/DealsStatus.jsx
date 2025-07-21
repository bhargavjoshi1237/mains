import React from "react";

const deals = [
  { label: "Successful Deals", value: 987, color: "#8b5cf6" },
  { label: "Pending Deals", value: 1073, color: "#38bdf8" },
  { label: "Rejected Deals", value: 1674, color: "#fbbf24" },
  { label: "Upcoming Deals", value: 921, color: "#34d399" },
];

const total = deals.reduce((sum, d) => sum + d.value, 0);

export default function DealsStatus() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 w-full min-w-0 h-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex flex-col mr-2">
            <span className="w-1 h-2 bg-[#ae97f3]"></span>
            <span className="w-1 h-2 bg-[#97f0a2]"></span>
          </div>
          <span className="font-semibold text-gray-700 text-sm sm:text-base">
            Deals Status
          </span>
        </div>
        <a
          href="#"
          className="text-xs sm:text-sm text-blue-500 font-semibold hover:underline"
        >
          View All
        </a>
      </div>

      <hr className="border-gray-200 mb-4" />

      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3 mb-4">
          <span className="text-2xl sm:text-3xl font-bold text-gray-900">4,289</span>
          <div className="flex items-center gap-2">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
              1.02 <span className="align-middle">↑</span>
            </span>
            <span className="text-xs text-gray-400 font-medium">
              compared to last week
            </span>
          </div>
        </div>
      </div>


      <div className="w-full mb-6 sm:mb-8">
        <div className="flex w-full h-2 sm:h-2.5 rounded-full overflow-hidden bg-gray-100">
          {deals.map((deal, i) => (
            <div
              key={deal.label}
              style={{
                background: deal.color,
                width: `${(deal.value / total) * 100}%`,
              }}
              className="h-full transition-all duration-300"
            />
          ))}
        </div>
      </div>


      <div className="space-y-3 sm:space-y-4">
        {deals.map((deal) => (
          <div key={deal.label} className="flex items-center justify-between hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <span
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                style={{ background: deal.color }}
              ></span>
              <span className="text-xs sm:text-sm text-gray-700 font-medium truncate">
                {deal.label}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 font-semibold flex-shrink-0 ml-2">
              {deal.value.toLocaleString()} deals
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
