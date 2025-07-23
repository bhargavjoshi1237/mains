import React from "react";

export default function StatsGrid({
    iconImg = "https://api.iconify.design/ic:outline-supervisor-account.svg?color=white",
    iconBg = "bg-brand-500",
    mainLabel = "Total Customers",
    mainValue = "1,02,890",
    statValue = "+40%",
    statSub = "this month",
    statValueColor = "text-success-800",
    theme = "light"
}) {

    const colorMap = {
        "bg-brand-500": "#8b5cf6",
        "bg-info-500": "#3b82f6",
        "bg-success-400": "#4ade80",
        "bg-warning-500": "#f59e42",
    };
    const chartStroke = colorMap[iconBg] || "#8b5cf6";

    return (
        <div className={`rounded-lg shadow-sm flex items-center min-w-0 w-full h-[135px] sm:h-[135px] lg:h-[140px] px-3 sm:px-4 py-3 transition-all duration-200 overflow-hidden ${theme === "dark"
                ? "bg-darkBg"
                : "bg-secondary border border-neutral-100"
            }`}>

            <div className="flex items-center justify-center flex-shrink-0 -mt-2">
                <div className={`${iconBg} -mt-12 ml-1 rounded-full w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center shadow-sm`}>
                    {iconImg && (
                        <img
                            src={iconImg}
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            alt="icon"
                        />
                    )}
                </div>
            </div>


            <div className="flex flex-col justify-center  ml-3 sm:ml-4 flex-1 min-w-0">
                <p className={`text-xs sm:text-sm mb-1 -mt-1 truncate font-medium ${theme === "dark" ? "text-primaryText" : "text-neutral-500"
                    }`}>{mainLabel}</p>
                <p className={`text-lg sm:text-xl ml-1 lg:text-2xl font-bold mb-1 sm:mb-2 tracking-tight truncate ${theme === "dark" ? "text-primaryText" : "text-neutral-900"
                    }`}>{mainValue}</p>
                <a href="#" className={`flex items-center mt-2 text-xs sm:text-sm font-normal transition-colors ${theme === "dark"
                        ? "text-brand-500 hover:text-brand-500 hover:underline"
                        : "text-brand-500 hover:text-brand-500 hover:underline"
                    }`}>
                    View All
                    <img
                        src="https://api.iconify.design/ic:round-arrow-forward.svg?color=%237c3aed"
                        alt="arrow"
                        className="w-3 h-3 sm:w-4 sm:h-4 ml-1"
                    />
                </a>
            </div>


            <div className="flex flex-col  items-end justify-between h-full py-1 sm:py-2 ml-2 sm:ml-3 flex-shrink-0">
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
                <div className="flex   flex-col items-end">
                    <span className={`${statValueColor} font-bold text-xs sm:text-sm leading-none mb-0.5`}>{statValue}</span>
                    <span className="text-xs text-neutral-500 leading-none">{statSub}</span>
                </div>
            </div>
        </div>
    );
}