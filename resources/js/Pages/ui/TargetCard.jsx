import React from "react";

const TargetCard = () => (
  <div className="bg-[#8b5cf6] rounded-lg p-4 sm:p-6 flex items-center gap-3 sm:gap-4 w-full min-w-0 h-auto relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
      background: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80') center/cover"
    }} />
    <div className="relative z-10 flex-1 min-w-0">
      <h3 className="text-white font-extrabold text-sm sm:text-base lg:text-lg mb-2 leading-tight">
        Your target is incomplete
      </h3>
      <p className="font-medium text-[#dadada] text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed">
        You have completed <span className="font-bold text-[#ffe066]">48%</span> of the given target, you can also check your status.
      </p>
      <a href="#" className="text-white underline font-bold text-xs sm:text-sm hover:text-[#ffe066] transition-colors">
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
          stroke="#c7bfff"
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
