import React from "react";


const sources = [
	{ label: "Mobile", value: 1624, color: "#a78bfa" },
	{ label: "Desktop", value: 1267, color: "#38bdf8" },
	{ label: "Laptop", value: 1153, color: "#fbbf24" },
	{ label: "Tablet", value: 679, color: "#34d399" },
];

const total = sources.reduce((sum, s) => sum + s.value, 0);

export default function LeadsBySource({ theme = "light" }) {
	return (
		<div className={`rounded-xl shadow-sm   p-4 sm:p-5 w-full min-w-0 h-auto ${theme === "dark"
				? "bg-[#191919] border-gray-700"
				: "bg-white border-gray-100"
			}`}>
			<div className="flex items-center justify-between mb-4 sm:mb-6">
				<span className={`font-semibold text-sm sm:text-base flex items-center ${theme === "dark" ? "text-gray-100" : "text-gray-700"
					}`}>
					<div className="flex flex-col mr-2">
						<span className="w-1 h-2 bg-[#ae97f3]"></span>
						<span className="w-1 h-2 bg-[#97f0a2]"></span>
					</div>
					Leads By Source
				</span>
				<button className={`rounded p-1 transition-colors ${theme === "dark"
						? "text-gray-400 hover:bg-gray-700"
						: "text-gray-400 hover:bg-gray-100"
					}`}>
					<svg
						width="18"
						height="18"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						className="sm:w-5 sm:h-5"
					>
						<circle cx="9" cy="4" r="1.2" />
						<circle cx="9" cy="9" r="1.2" />
						<circle cx="9" cy="14" r="1.2" />
					</svg>
				</button>
			</div>

			<div className="flex flex-col items-center justify-center">
				<div className="relative flex items-center justify-center mb-4 sm:mb-6">
					<svg
						width="210"
						height="210"
						viewBox="0 0 210 210"
						className="w-[210px] h-[210px] sm:w-[220px] sm:h-[220px] lg:w-[230px] lg:h-[230px]"
					>
						<g transform="rotate(-90 105 105)">
							{sources.map((source, i) => {
								const percent = source.value / total;
								const radius = 86;
								const strokeDasharray = (percent * 2 * Math.PI * radius) + " " + ((1 - percent) * 2 * Math.PI * radius);
								const strokeDashoffset = sources
									.slice(0, i)
									.reduce((acc, s) => acc - (s.value / total) * 2 * Math.PI * radius, 0);

								return (
									<circle
										key={source.label}
										cx="105"
										cy="105"
										r={radius}
										fill="none"
										stroke={source.color}
										strokeWidth={12}
										strokeDasharray={strokeDasharray}
										strokeDashoffset={strokeDashoffset}
										strokeLinecap="round"
									/>
								);
							})}
						</g>
						<circle cx="105" cy="105" r={68} fill={theme === "dark" ? "#191919" : "#fff"} />
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
						<span className={`text-xs font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"
							}`}>Total</span>
						<span className={`text-xl sm:text-2xl  font-bold ${theme === "dark" ? "text-gray-100" : "text-gray-700"
							}`}>
							{total.toLocaleString()}
						</span>
					</div>
				</div>

				<div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 w-full border-t pt-4 ${theme === "dark" ? "border-gray-700" : ""
					}`}>
					{sources.map((source) => (
						<div key={source.label} className="flex flex-col items-center text-center">
							<div className="flex items-center mb-1 sm:mb-2">
								<span
									className="w-2 h-2 rounded-full mr-1 flex-shrink-0"
									style={{ background: source.color }}
								></span>
								<span className={`text-xs font-medium truncate ${theme === "dark" ? "text-gray-400" : "text-gray-500"
									}`}>{source.label}</span>
							</div>
							<span className={`font-bold text-sm sm:text-base ${theme === "dark" ? "text-gray-100" : "text-gray-700"
								}`}>
								{source.value.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
