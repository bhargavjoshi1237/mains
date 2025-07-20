import React from "react";

const sources = [
	{ label: "Mobile", value: 1624, color: "#a78bfa" },
	{ label: "Desktop", value: 1267, color: "#38bdf8" },
	{ label: "Laptop", value: 1153, color: "#fbbf24" },
	{ label: "Tablet", value: 679, color: "#34d399" },
];

const total = sources.reduce((sum, s) => sum + s.value, 0);

// Calculate donut segments
const radius = 54;
const stroke = 10;
const CIRC = 2 * Math.PI * radius;
let prev = 0;
const segments = sources.map((s) => {
	const percent = s.value / total;
	const len = percent * CIRC;
	const dasharray = `${len} ${CIRC - len}`;
	const dashoffset = prev;
	prev -= len;
	return { ...s, dasharray, dashoffset };
});

export default function LeadsBySource() {
	return (
		<div className="bg-white rounded-xl   p-4 w-[400px] h-[400px]">
			<div className="flex items-center justify-between mb-4">
				<span className="font-semibold text-gray-700 text-base flex items-center">
					<div className="flex flex-col">
                        <span className="w-1 h-2   bg-[#ae97f3] mr-2"></span>
                        <span className="w-1 h-2  bg-[#97f0a2] mr-2"></span>
                    </div>
					Leads By Source
				</span>
				<button className="text-gray-400 hover:bg-gray-100 rounded p-1">
					<svg
						width="20"
						height="20"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<circle cx="10" cy="4" r="1.2" />
						<circle cx="10" cy="10" r="1.2" />
						<circle cx="10" cy="16" r="1.2" />
					</svg>
				</button>
			</div>
			<div className="flex flex-col items-center justify-center">
				<div className="relative flex items-center justify-center mb-4">
					<svg width="225" height="225" viewBox="0 0 180 180">
						<g transform="rotate(-90 90 90)">
							{segments.map((seg, i) => (
								<circle
									key={seg.label}
									cx="90"
									cy="90"
									r={74}
									fill="none"
									stroke={seg.color}
									strokeWidth={14}
									strokeDasharray={
										(seg.value / total) * 2 * Math.PI * 74 +
										" " +
										((1 - seg.value / total) * 2 * Math.PI * 74)
									}
									strokeDashoffset={segments
										.slice(0, i)
										.reduce(
											(acc, s) => acc - (s.value / total) * 2 * Math.PI * 74,
											0
										)}
									strokeLinecap="round"
								/>
							))}
						</g>
						<circle cx="90" cy="90" r={74 - 14 - 2} fill="#fff" />
					</svg>
					<div className="absolute left-0 top-0 w-full h-full flex flex-col items-center justify-center pointer-events-none">
						<span className="text-gray-400 text-xs -mt-1 font-semibold">Total</span>
						<span className="text-2xl font-extrabold text-gray-700">
							{total.toLocaleString()}
						</span>
					</div>
				</div>
				<div className="grid mt-4 grid-cols-4 gap-2 w-full border-t pt-4">
					{sources.map((s) => (
						<div key={s.label} className="flex flex-col items-center">
							<div className="flex items-center mb-1">
								<span
									className="w-2 h-2 rounded-full mr-1"
									style={{ background: s.color }}
								></span>
								<span className="text-xs text-gray-400">{s.label}</span>
							</div>
							<span className="font-bold text-gray-700 text-base">
								{s.value.toLocaleString()}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
