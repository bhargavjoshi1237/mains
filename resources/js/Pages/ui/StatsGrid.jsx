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
    };
    const chartStroke = colorMap[iconBg] || "#a78bfa";

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex items-center min-w-0 w-full h-[120px] sm:h-[130px] lg:h-[140px] px-3 sm:px-4 py-3 transition-all duration-200 hover:shadow-md overflow-hidden">
            {/* Icon */}
            <div className="flex items-center justify-center flex-shrink-0">
                <div className={`${iconBg} -mt-8 rounded-full w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center shadow-sm`}>
                    {iconImg && (
                        <img
                            src={iconImg}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            alt="icon"
                        />
                    )}
                </div>
            </div>
            
            {/* Main Content */}
            <div className="flex flex-col justify-center ml-3 sm:ml-4 flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-gray-500 mb-1 truncate font-medium">{mainLabel}</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 tracking-tight truncate">{mainValue}</p>
                <a href="#" className="flex items-center text-purple-600 text-xs sm:text-sm font-semibold hover:text-purple-700 hover:underline transition-colors">
                    View All
                    <img
                        src="https://api.iconify.design/ic:round-arrow-forward.svg?color=%237c3aed"
                        alt="arrow"
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                    />
                </a>
            </div>
            
            {/* Chart & Stats */}
            <div className="flex flex-col items-end justify-between h-full py-1 sm:py-2 ml-2 sm:ml-3 flex-shrink-0">
                <div className="w-16 sm:w-20 lg:w-24 overflow-hidden">
                    <svg width="100%" height="28" viewBox="0 0 80 28" fill="none" className="mb-1 block sm:h-8">
                        <path
                            d="M0,22 Q10,8 20,14 T40,10 T60,16 T80,8"
                            fill="none"
                            stroke={chartStroke}
                            strokeWidth="2"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>
                <div className="flex flex-col items-end">
                    <span className={`${statValueColor} font-bold text-xs sm:text-sm leading-none mb-0.5`}>{statValue}</span>
                    <span className="text-xs text-gray-400 leading-none">{statSub}</span>
                </div>
            </div>
        </div>
    );
}