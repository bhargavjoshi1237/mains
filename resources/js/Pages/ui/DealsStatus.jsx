import React from "react";

const deals = [
  { label: "Successful Deals", value: 987, color: "#8b5cf6" },
  { label: "Pending Deals", value: 1073, color: "#38bdf8" },
  { label: "Rejected Deals", value: 1674, color: "#fbbf24" },
  { label: "Upcoming Deals", value: 921, color: "#34d399" },
  { label: "Current Deals", value: 561, color: "#fbbf24" },
  { label: "Rejected Deals", value: 1674, color: "#fbbf24" },


];

const total = deals.reduce((sum, d) => sum + d.value, 0);

export default function DealsStatus({ theme = "light" }) {
  return (
    <div
      className={`rounded-xl shadow-sm border p-4 sm:p-5 lg:p-6 w-full min-w-0 h-auto ${theme === "dark"
          ? "bg-[#191919] border-gray-700"
          : "bg-white border-gray-100"
        }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center -ml-1.5">
          <div className="flex flex-col mr-2">
            <span className="w-1 h-2 bg-[#ae97f3]"></span>
            <span className="w-1 h-2 bg-[#97f0a2]"></span>
          </div>
          <span
            className={`font-semibold text-sm sm:text-base ${theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
          >
            Deals Status
          </span>
        </div>
        <a
          href="#"
          className={`text-xs sm:text-sm font-semibold hover:underline ${theme === "dark" ? "text-blue-400" : "text-blue-500"
            }`}
        >
          View All
        </a>
      </div>

      <hr
        className={`mb-4 ${theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
      />

      <div className="mb-1 sm:mb-1 p-2  ">
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3 ">
          <span
            className={`text-2xl sm:text-2xl font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-700"
              }`}
          >
            4,289
          </span>
          <div className="flex items-center gap-2  ">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
              1.02 <span className="align-middle">↑</span>
            </span>
            <span className="text-xs text-gray-400 font-medium">
              compared to last week
            </span>
          </div>
        </div>
      </div>

      <div className={`w-full mb-3 sm:mb-3`}>
        <div
          className={`flex w-full  h-1 sm:h-1.5 rounded-full overflow-hidden ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
        >
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

      <div className="space-y-2 sm:space-y-2 mt-5">
        {deals.map((deal) => (
          <div
            key={deal.label}
            className={`flex items-center justify-between p-1 rounded transition-colors ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
              }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <span
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0"
                style={{ background: deal.color }}
              ></span>
              <span
                className={`text-xs sm:text-sm font-medium truncate ${theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
              >
                {deal.label}
              </span>
            </div>
            <span
              className={`text-xs sm:text-sm font-semibold flex-shrink-0 ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
            >
              {deal.value.toLocaleString()} deals
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
