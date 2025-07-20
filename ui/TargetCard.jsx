import React from "react";

const TargetCard = () => (
  <div className="bg-[#8b5cf6] h-[150px] rounded-lg p-5 flex items-center gap-6 w-[450px] relative overflow-hidden">

    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
      background: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80') center/cover"
    }} />
    <div className="relative z-10 flex-1">
      <p className="text-white font-extrabold text-xl mb-1">Your target is incomplete</p>
      <p className=" font-bold text-[#dadada] text-sm mb-1">
        You have completed <span className="font-bold text-[#ffe066]">48%</span> of the given target, you can also check your status.
      </p>
      <a href="#" className="text-white underline font-extrabold mt-1 text-sm">Click here</a>
    </div>
    <div className="relative z-10 flex items-center justify-center">
    
      <svg width="72" height="72" viewBox="0 0 72 72" className="block drop-shadow-lg">
     
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
          fontSize="12"
          fontWeight="bold"
          dy=".3em"
        >
          48%
        </text>
      </svg>
    </div>
  </div>
);

export default TargetCard;
