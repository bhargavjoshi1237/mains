import React from "react";

const sources = [
	{ label: "Mobile", value: 1624, color: "#a78bfa" },
	{ label: "Desktop", value: 1267, color: "#38bdf8" },
	{ label: "Laptop", value: 1153, color: "#fbbf24" },
	{ label: "Tablet", value: 679, color: "#34d399" },
];

const total = sources.reduce((sum, s) => sum + s.value, 0);

export default function LeadsBySource() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 w-full min-w-0 h-auto">
			<div className="flex items-center justify-between mb-4 sm:mb-6">
				<span className="font-semibold text-gray-700 text-sm sm:text-base flex items-center">
					<div className="flex flex-col mr-2">
						<span className="w-1 h-2 bg-[#ae97f3]"></span>
						<span className="w-1 h-2 bg-[#97f0a2]"></span>
					</div>
					Leads By Source
				</span>
				<button className="text-gray-400 hover:bg-gray-100 rounded p-1 transition-colors">
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
						width="180"
						height="180"
						viewBox="0 0 180 180"
						className="w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48"
					>
						<g transform="rotate(-90 90 90)">
							{sources.map((source, i) => {
								const percent = source.value / total;
								const strokeDasharray = (percent * 2 * Math.PI * 74) + " " + ((1 - percent) * 2 * Math.PI * 74);
								const strokeDashoffset = sources
									.slice(0, i)
									.reduce((acc, s) => acc - (s.value / total) * 2 * Math.PI * 74, 0);

								return (
									<circle
										key={source.label}
										cx="90"
										cy="90"
										r={74}
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
						<circle cx="90" cy="90" r={58} fill="#fff" />
					</svg>
					<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
						<span className="text-gray-400 text-xs font-medium">Total</span>
						<span className="text-xl sm:text-2xl font-bold text-gray-700 mt-1">
							{total.toLocaleString()}
						</span>
					</div>
				</div>

				<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-2 w-full border-t pt-4">
					{sources.map((source) => (
						<div key={source.label} className="flex flex-col items-center text-center">
							<div className="flex items-center mb-1 sm:mb-2">
								<span
									className="w-2 h-2 rounded-full mr-1 flex-shrink-0"
									style={{ background: source.color }}
								></span>
								<span className="text-xs text-gray-500 font-medium truncate">{source.label}</span>
							</div>
							<span className="font-bold text-gray-700 text-sm sm:text-base">
								{source.value.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
