import React from "react";

const deals = [
  { label: "Successful Deals", value: 987, color: "#8b5cf6" }, // brand-500
  { label: "Pending Deals", value: 1073, color: "#3b82f6" },   // info-500
  { label: "Rejected Deals", value: 1674, color: "#fbbf24" },  // warning-800 (closest)
  { label: "Upcoming Deals", value: 921, color: "#166534" },   // success-800
  { label: "Current Deals", value: 561, color: "#fbbf24" },    // warning-800 (closest)
  
];

const colorClassMap = {
  "#8b5cf6": "bg-brand-500",
  "#3b82f6": "bg-info-500",
  "#fbbf24": "bg-warning-800",
  "#166534": "bg-success-800",
};

const total = deals.reduce((sum, d) => sum + d.value, 0);

export default function DealsStatus({ theme = "light" }) {
  return (
    <div
      className={`rounded-xl shadow-sm   p-4 pb-8  w-full min-w-0 h-auto ${theme === "dark"
          ? "bg-darkBg border-gray-700"
          : "bg-lightBg border-gray-100"
        }`}
    >
      <div className="flex items-center bg justify-between mb-5">
        <div className="flex items-center -ml-1.5">
          <div className="flex flex-col mr-2">
            <span className="w-1 h-2 bg-brand-500"></span>
            <span className="w-1 h-2 bg-success-800"></span>
          </div>
          <span
            className={`font-semibold text-md sm:text-md ${theme === "dark" ? "text-primaryText" : "text-tertiaryText"
              }`}
          >
            Deals Status
          </span>
        </div>
    			<div className="flex items-center gap-1 cursor-pointer">
				<span
					className={`text-xs font-medium ${theme === "dark" ? "text-secondaryText" : "text-gray-500"
						}`}
				>
					View All
				</span>
				<svg
					width="16"
					height="16"
					fill="none"
					className={
						theme === "dark" ? "text-gray-400" : "text-gray-400"
					}
				>
					<path
						d="M4 6l4 4 4-4"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
					/>
				</svg>
			</div>
      </div>

      <hr
        className={`mb-4 ${theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
      />

      <div className="mb-1 sm:mb-1 p-2  ">
        <div className="flex flex-col sm:flex-row sm:items-end gap-2 sm:gap-3 ">
          <span
            className={`text-2xl sm:text-2xl font-bold ${theme === "dark" ? "text-primaryText" : "text-tertiaryText"
              }`}
          >
            4,289
          </span>
          <div className="flex items-center gap-2  ">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold">
              1.02 <span className="align-middle">↑</span>
            </span>
            <span className="text-xs text-secondaryText font-medium">
              compared to last week
            </span>
          </div>
        </div>
      </div>

      <div className={`flex w-full mt-2 h-1 sm:h-1.5 rounded-full overflow-hidden ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}>
        {deals.map((deal, i) => (
          <div
            key={deal.label}
            className={`${colorClassMap[deal.color]} h-full transition-all duration-300`}
            style={{
              width: `${(deal.value / total) * 100}%`,
            }}
          />
        ))}
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
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${colorClassMap[deal.color]}`}
              ></span>
              <span
                className={`text-xs sm:text-sm font-medium truncate ${theme === "dark" ? "text-secondaryText" : "text-tertiaryText"
                  }`}
              >
                {deal.label}
              </span>
            </div>
            <span
              className={`text-xs sm:text-sm font-semibold flex-shrink-0 ml-2 ${theme === "dark" ? "text-secondaryText" : "text-gray-500"
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
