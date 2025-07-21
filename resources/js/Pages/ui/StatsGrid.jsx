import React from "react";

export default function StatsGrid({
    iconImg = "https://api.iconify.design/ic:outline-supervisor-account.svg?color=white",
    iconBg = "bg-purple-500",
    mainLabel = "Total Customers",
    mainValue = "1,02,890",
    statValue = "+40%",
    statSub = "this month",
    statValueColor = "text-green-500"
}) {
    // Map Tailwind bg color to hex for the chart stroke
    const colorMap = {
        "bg-purple-500": "#a78bfa",
        "bg-blue-500": "#3b82f6",
        "bg-green-400": "#4ade80",
        "bg-yellow-500": "#f59e42",
        // add more mappings as needed
    };
    const chartStroke = colorMap[iconBg] || "#a78bfa";

    return (
        <div className="bg-white rounded-lg flex items-center min-w-0 w-full max-w-[600px] xl:max-w-[425px] h-[140px] sm:h-[140px] md:h-[120px] lg:h-[140px] px-4 py-3 transition-all overflow-hidden">
            {/* Icon */}
            <div className="flex items-center justify-center -mt-12  flex-shrink-0">
                <div className={`${iconBg} rounded-full w-10 h-10 sm:w-10 sm:h-10 flex items-center justify-center`}>
                    {iconImg && (
                        <img
                            src={iconImg}
                            className="w-6 h-6 sm:w-6 sm:h-6"
                            alt="icon"
                        />
                    )}
                </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col justify-center ml-2 sm:ml-5 -mt-2 sm:-mt-4 flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-1 mt-2 truncate">{mainLabel}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1 tracking-tight truncate">{mainValue}</p>
                <a href="#" className="flex items-center mt-2 text-purple-600 text-xs sm:text-sm font-semibold hover:underline">
                    View All
                    <img
                        src="https://api.iconify.design/ic:round-arrow-forward.svg?color=%237c3aed"
                        alt="arrow"
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                    />
                </a>
            </div>
            {/* Chart & Stats */}
            <div className="flex flex-col items-end justify-between h-full py-2 ml-2 sm:ml-4 flex-shrink-0">
                <div className="w-[80px] sm:w-[120px] overflow-hidden">
                    <svg width="100%" height="36" viewBox="0 0 120 36" fill="none" className="mb-1 block">
                        <path
                            d="M0,28 Q15,10 30,18 T60,12 T90,20 T120,10"
                            fill="none"
                            stroke={chartStroke}
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`${statValueColor} font-bold text-xs sm:text-sm leading-none mb-1`}>{statValue}</span>
                    <span className="text-xs text-gray-400 leading-none">{statSub}</span>
                </div>
            </div>
        </div>
    );
}