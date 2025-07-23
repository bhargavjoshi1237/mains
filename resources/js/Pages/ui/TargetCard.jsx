import React from "react";

const TargetCard = ({ theme }) => (
  <div className={`shadow rounded-lg p-4 sm:p-6 flex items-center gap-3 sm:gap-4 w-full min-w-0 h-auto relative overflow-hidden bg-[#8b5cf6]
    }`}>
    <div className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80')"
    }} />
    <div className="relative z-10  flex-1 min-w-0">
      <h3 className="text-white font-extrabold text-sm sm:text-base lg:text-lg mb-2 leading-tight">
        Your target is incomplete
      </h3>
      <p className={`font-medium text-xs w-[90%] sm:text-xs leading-relaxed ${theme === "dark" ? "text-secondaryText" : "text-[#dadada]"
        }`}>
        You have completed <span className={`font-bold ${theme === "dark" ? "text-yellow-400" : "text-[#ffe066]"
          }`}>48%</span> of the given target, you can also check your status.
      </p>
      <a href="#" className={`underline font-bold text-xs sm:text-sm transition-colors ${theme === "dark"
        ? "text-primaryText hover:text-yellow-400"
        : "text-lightBg hover:text-[#ffe066]"
        }`}>
        Click here
      </a>
    </div>
    <div className="scale-125 relative z-10 flex items-center justify-center flex-shrink-0">
      <svg
        width="50"
        height="50"
        viewBox="0 0 72 72"
        className="block drop-shadow-lg w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
      >
        <circle
          cx="36"
          cy="36"
          r="30"
          fill="none"
          stroke="#c4c4c4"
          strokeWidth="6"
        />
        <circle
          cx="36"
          cy="36"
          r="30"
          fill="none"
          stroke="#fff"
          strokeWidth="6"
          strokeDasharray={2 * Math.PI * 30}
          strokeDashoffset={2 * Math.PI * 30 * (1 - 0.48)}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
          style={{
            transition: "stroke-dashoffset 0.5s",
            filter: "drop-shadow(0 2px 8px #ffe06688)"
          }}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          fill="#fff"
          fontSize="11"
          fontWeight="bold"
          dy=".3em"
          className="sm:text-xs"
        >
          48%
        </text>
      </svg>
    </div>
  </div>
);

export default TargetCard;
