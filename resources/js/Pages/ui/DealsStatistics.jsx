import React from "react";

const deals = [
	{
		avatar: "https://randomuser.me/api/portraits/women/44.jpg",
		name: "Mayor Kelly",
		category: "Manufacture",
		mail: "mayorkelly@gmail.com",
		location: { label: "Germany", color: "bg-blue-100 text-blue-500" },
		date: "Sep 15 - Oct 12, 2023",
	},
	{
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		name: "Andrew Garfield",
		category: "Development",
		mail: "andrewgarfield@gmail.com",
		location: { label: "Canada", color: "bg-purple-100 text-purple-500" },
		date: "Apr 10 - Dec 12, 2023",
	},
	{
		avatar: "https://randomuser.me/api/portraits/men/54.jpg",
		name: "Simon Cowel",
		category: "Service",
		mail: "simoncowel234@gmail.com",
		location: { label: "Europe", color: "bg-red-100 text-red-500" },
		date: "Sep 15 - Oct 12, 2023",
	},
	{
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
		name: "Mirinda Hers",
		category: "Marketing",
		mail: "mirindahers@gmail.com",
		location: { label: "USA", color: "bg-yellow-100 text-yellow-500" },
		date: "Apr 14 - Dec 14, 2023",
	},
	{
		avatar: "https://randomuser.me/api/portraits/men/43.jpg",
		name: "Jacob Smith",
		category: "Social Plataform",
		mail: "jacobsmith@gmail.com",
		location: { label: "Singapore", color: "bg-green-100 text-green-500" },
		date: "Feb 25 - Nov 25, 2023",
	},
];

export default function DealsStatistics() {
	return (
        <>
		<div className="bg-white rounded-xl shadow p-2 sm:p-6 w-full max-w-full overflow-x-auto">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
				<div className="flex items-center">
				<div className="flex flex-col mr-2">
            <span className="w-1 h-2 bg-[#ae97f3]"></span>
            <span className="w-1 h-2 bg-[#97f0a2]"></span>
          </div>
					<span className="font-semibold text-gray-800 text-lg">
						Deals Statistics
					</span>
				</div>
				<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
					<input
						type="text"
						placeholder="Search Here"
						className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none w-full sm:w-auto"
						style={{ minWidth: 0 }}
					/>
					<button className="bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 w-full sm:w-auto">
						Sort By
						<svg width="16" height="16" fill="none" className="inline-block">
							<path
								d="M4 6l4 4 4-4"
								stroke="white"
								strokeWidth="2"
								strokeLinecap="round"
							/>
						</svg>
					</button>
				</div>
			</div>
			{/* Table */}
			<div className="overflow-x-auto">
				<table className="min-w-[600px] sm:min-w-full text-xs sm:text-sm">
					<thead>
						<tr className="border-b">
							<th className="py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-600 text-left">
								<input type="checkbox" />
							</th>
							<th className="py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-600 text-left">
								Sales Rep
							</th>
							<th className="py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-600 text-left">
								Category
							</th>
							<th className="py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-600 text-left">
								Mail
							</th>
							<th className="py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-600 text-left">
								Location
							</th>
							<th className="py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-600 text-left">
								Date
							</th>
							<th className="py-2 sm:py-3 px-1 sm:px-2 font-semibold text-gray-600 text-left">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{deals.map((deal, idx) => (
							<tr key={idx} className="border-b hover:bg-gray-50">
								<td className="py-2 sm:py-3 px-1 sm:px-2">
									<input type="checkbox" />
								</td>
								<td className="py-2 sm:py-3 px-1 sm:px-2 flex items-center gap-2">
									<img
										src={deal.avatar}
										alt={deal.name}
										className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
									/>
									<span className="font-medium text-gray-800 truncate max-w-[80px] sm:max-w-none">
										{deal.name}
									</span>
								</td>
								<td className="py-2 sm:py-3 px-1 sm:px-2">{deal.category}</td>
								<td className="py-2 sm:py-3 px-1 sm:px-2 truncate max-w-[100px] sm:max-w-none">{deal.mail}</td>
								<td className="py-2 sm:py-3 px-1 sm:px-2">
									<span
										className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${deal.location.color}`}
									>
										{deal.location.label}
									</span>
								</td>
								<td className="py-2 sm:py-3 px-1 sm:px-2">{deal.date}</td>
								<td className="py-2 sm:py-3 px-1 sm:px-2 flex gap-2">
									<button className="bg-green-100 text-green-600 p-2 rounded-lg">
										<svg width="18" height="18" fill="none">
											<path
												d="M5 13v2h8v-2M9 3v10m0 0l-3-3m3 3l3-3"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</button>
									<button className="bg-purple-100 text-purple-600 p-2 rounded-lg">
										<svg width="18" height="18" fill="none">
											<path
												d="M4 14v2h10v-2M9 4v8m0 0l-3-3m3 3l3-3"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
											/>
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* Pagination */}
			<div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-xs sm:text-sm text-gray-500 gap-2">
				<span>Showing 5 Entries &rarr;</span>
				<div className="flex items-center gap-2">
					<span className="cursor-pointer">Prev</span>
					<span className="bg-purple-500 text-white px-3 py-1 rounded font-semibold">
						1
					</span>
					<span className="cursor-pointer">2</span>
					<span className="cursor-pointer">next</span>
				</div>
			</div>
		</div>
        </>
	);
}
