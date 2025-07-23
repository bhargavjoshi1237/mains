import React from "react";


const sources = [
	{ label: "Mobile", value: 1624, color: "#8b5cf6" }, // brand-500
	{ label: "Desktop", value: 1267, color: "#3b82f6" }, // info-500
	{ label: "Laptop", value: 1153, color: "#f59e42" }, // warning-800 (approx)
	{ label: "Tablet", value: 679, color: "#166534" }, // success-800
];

const total = sources.reduce((sum, s) => sum + s.value, 0);

export default function LeadsBySource({ theme = "light" }) {
	return (
		<div className={`rounded-xl shadow-sm   p-4 sm:p-5 w-full min-w-0 h-auto ${theme === "dark"
				? "bg-darkBg border-gray-700"
				: "bg-lightBg border-gray-100"
			}`}>
			<div className=" flex items-center justify-between mb-4 -ml-4 sm:mb-6">
				<span className={`font-semibold text-sm sm:text-base flex items-center ${theme === "dark" ? "text-primaryText" : "text-tertiaryText"
					}`}>
					<div className="flex flex-col ml-1">
						<span className="w-1 h-2   bg-brand-500 mr-2"></span>
						<span className="w-1 h-2  bg-success-800 mr-2"></span>
					</div>
					Leads By Source
				</span>
				<button className={`rounded p-1 transition-colors ${theme === "dark"
						? "text-secondaryText hover:bg-gray-700"
						: "text-secondaryText hover:bg-gray-100"
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
						width="240"
						height="240"
						viewBox="0 0 240 240"
						className="w-[250px] pt-2 h-[250px] sm:w-[250px] sm:h-[250px] lg:w-[260px] lg:h-[260px]"
					>
						<g transform="rotate(-90 120 120)">
							{sources.map((source, i) => {
								const percent = source.value / total;
								const radius = 100;
								const strokeDasharray = (percent * 2 * Math.PI * radius) + " " + ((1 - percent) * 2 * Math.PI * radius);
								const strokeDashoffset = sources
									.slice(0, i)
									.reduce((acc, s) => acc - (s.value / total) * 2 * Math.PI * radius, 0);

								return (
									<circle
										key={source.label}
										cx="120"
										cy="120"
										r={radius}
										fill="none"
										stroke={source.color}
										strokeWidth={15}
										strokeDasharray={strokeDasharray}
										strokeDashoffset={strokeDashoffset}
										// strokeLinecap="round"
									/>
								);
							})}
						</g>
						<circle cx="120" cy="120" r={80} fill={theme === "dark" ? "#191919" : "#fff"} />
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
						<span className={`text-sm font-medium ${theme === "dark" ? "text-gray-200" : "text-gray-700"
							}`}>Total</span>
						<span className={`text-2xl sm:text-2xl font-extrabold ${theme === "dark" ? "text-gray-100" : "text-gray-700"
							}`}>
							{total.toLocaleString()}
						</span>
					</div>
				</div>

				<div className={`grid grid-cols-2 sm:grid-cols-4 gap-14 sm:gap-14 w-full border-t pt-3.5 ${theme === "dark" ? "border-gray-700" : ""
					}`}>
					{sources.map((source) => (
						<div key={source.label} className="flex flex-col items-center text-center">
							<div className="flex items-center mb-1 sm:mb-2">
								<span
									className="w-2 h-2 rounded-full mr-1 flex-shrink-0"
									style={{ background: source.color }}
								></span>
								<span className={`text-xs font-medium truncate ${theme === "dark" ? "text-secondaryText" : "text-gray-500"
									}`}>{source.label}</span>
							</div>
							<span className={`font-bold text-sm sm:text-base ${theme === "dark" ? "text-primaryText" : "text-tertiaryText"
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
