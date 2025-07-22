import React from "react";

const data = [
	{ day: "S", value1: 40, value2: 25 },
	{ day: "M", value1: 40, value2: 25 },
	{ day: "T", value1: 60, value2: 20 },
	{ day: "W", value1: 80, value2: 45 },
	{ day: "T", value1: 60, value2: 15 },
	{ day: "F", value1: 50, value2: 40 },
	{ day: "S", value1: 70, value2: 50 },
];

const maxValue = 100;
const yTicks = [100, 80, 60, 40, 20, 0];

const ProfitEarned = ({ theme = "light" }) => (
	<div
		className={`border rounded-xl shadow p-4 w-full ${theme === "dark"
				? "bg-[#191919] border-gray-700"
				: "bg-white border-gray-200"
			}`}
	>

		<div className="flex items-center justify-between mb-2">
			<div className="flex items-center">
				<div className="flex flex-col">
					<span className="w-1 h-2 bg-[#ae97f3] mr-2"></span>
					<span className="w-1 h-2 bg-[#97f0a2] mr-2"></span>
				</div>
				<span
					className={`font-semibold text-lg ${theme === "dark" ? "text-gray-100" : "text-gray-800"
						}`}
				>
					Profit Earned
				</span>
			</div>
			<div className="flex items-center gap-1 cursor-pointer">
				<span
					className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-500"
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

		<div className="pt-2 pb-1 px-1">
			<div
				className="relative flex items-end"
				style={{ height: "170px" }}
			>

				<div
					className="absolute left-0 top-0 h-full flex flex-col justify-between z-20"
					style={{ height: "128px", width: "28px" }}
				>
					{yTicks.map((v) => (
						<div key={v} className="flex items-center h-0">
							<span className="text-[10px] text-gray-400 w-6 text-right">
								{v}
							</span>
							<div className="flex-1 border-t border-gray-400 ml-1"></div>
						</div>
					))}
				</div>

				<div className="ml-[32px] flex w-full h-[128px] items-end justify-between z-10">
					{data.map((d, i) => (
						<div key={i} className="flex flex-col items-center w-7">

							<div className="flex flex-row gap-1 items-end h-[110px]">
								<div
									className="rounded bg-purple-500"
									style={{
										width: "8px",
										height: `${(d.value1 / maxValue) * 110}px`,
									}}
								></div>
								<div
									className="rounded bg-gray-400"
									style={{
										width: "8px",
										height: `${(d.value2 / maxValue) * 110}px`,
									}}
								></div>
							</div>

							<span
								className={`text-xs mt-2 ${theme === "dark"
										? "text-gray-400"
										: "text-gray-500"
									}`}
							>
								{d.day}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

export default ProfitEarned;
