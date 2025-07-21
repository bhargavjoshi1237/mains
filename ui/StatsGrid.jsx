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
        <div className="bg-white rounded-2xl   flex items-center w-[450px] h-[140px] px-6 py-4 transition-all  ">
            {/* Icon */}
            <div className="flex items-center justify-center -mt-12 -ml-1 ">
                <div className={`${iconBg} rounded-full w-12 h-12 flex items-center justify-center `}>
                    {iconImg && (
                        <img
                            src={iconImg}
                            className="w-7 h-7"
                            alt="icon"
                        />
                    )}
                </div>
            </div>
            {/* Main Content */}
            <div className="flex flex-col justify-center ml-5 -mt-4 flex-1">
                <p className="text-xs text-gray-400 mb-1 mt-2">{mainLabel}</p>
                <p className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">{mainValue}</p>
                <a href="#" className="flex items-center mt-2 text-purple-600 text-sm font-semibold hover:underline">
                    View All
                    <img
                        src="https://api.iconify.design/ic:round-arrow-forward.svg?color=%237c3aed"
                        alt="arrow"
                        className="w-4 h-4 ml-1"
                    />
                </a>
            </div>
            {/* Chart & Stats */}
            <div className="flex flex-col items-end justify-between h-full py-2 ml-4">
                <svg width="120" height="36" viewBox="0 0 120 36" fill="none" className="mb-1">
                    <path
                        d="M0,28 Q15,10 30,18 T60,12 T90,20 T120,10"
                        fill="none"
                        stroke={chartStroke}
                        strokeWidth="2.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
                <div className="flex flex-col items-end">
                    <span className={`${statValueColor} font-bold text-sm leading-none mb-1`}>{statValue}</span>
                    <span className="text-xs text-gray-400 leading-none">{statSub}</span>
                </div>
            </div>
        </div>
    );
}