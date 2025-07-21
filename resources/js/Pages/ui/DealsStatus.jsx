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
    <div
      className="bg-white rounded-xl shadow p-5 pt-6 w-full max-w-[600px] xl:max-w-[450px] min-w-0 h-[350px] sm:h-[350px] md:h-[300px] lg:h-[350px] mx-auto"
      style={{ fontFamily: "inherit" }}
    >
      <div className="flex  items-center justify-between  mb-4">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="w-1 h-2 bg-[#ae97f3] mr-2"></span>
            <span className="w-1 h-2 bg-[#97f0a2] mr-2"></span>
          </div>
          <span className="font-semibold text-gray-700 text-base">
            Deals Status
          </span>
        </div>
        <a
          href="#"
          className="text-xs text-blue-500 font-semibold hover:underline"
        >
          View All
        </a>
      </div>
      <hr className="" />
      
      <div className="mt-4 mb-6">
        <div className="flex items-end gap-2 mb-4">
          <span className="text-3xl font-bold text-gray-900">4,289</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold ml-2">
            1.02{" "}
            <span className="align-middle">&#8593;</span>
          </span>
          <div className="text-xs text-gray-400 font-semibold mt-1">
          compared to last week
        </div>
        </div>
        
      </div>
      <div className="w-full flex items-center mt-3 mb-8">
        <div className="flex w-full h-2 rounded overflow-hidden">
          {deals.map((d, i) => (
            <div
              key={d.label}
              style={{
                background: d.color,
                width: `${(d.value / total) * 100}%`,
                height: "100%",
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5 mt-2">
        {deals.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: d.color }}
              ></span>
              <span className="text-sm text-gray-700 font-medium">
                {d.label}
              </span>
            </div>
            <span className="text-sm text-gray-500 font-semibold">
              {d.value.toLocaleString()} deals
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
