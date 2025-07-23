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

export default function DealsStatistics({ theme = "light" }) {
	return (
		<>
			<div className={`rounded-xl shadow p-4   w-full max-w-full overflow-x-auto ${theme === "dark"
					? "bg-darkBg border-gray-700"
					: "bg-lightBg"
				}`}>
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
					<div className="flex items-center">
						<div className="flex flex-col mr-2">
							<span className="w-1 h-2 bg-[#ae97f3]"></span>
							<span className="w-1 h-2 bg-[#97f0a2]"></span>
						</div>
						<span className={`font-semibold text-md ${theme === "dark" ? "text-primaryText" : "text-gray-800"
							}`}>
							Deals Statistics
						</span>
					</div>
					<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
						<input
							type="text"
							placeholder="Search Here"
							className={`border rounded-lg px-2 py-1.5 text-sm focus:outline-none w-full sm:w-auto ${theme === "dark"
									? "border-gray-600 bg-gray-700 text-gray-100 placeholder-gray-400"
									: "border-gray-200 bg-white text-gray-900 placeholder-gray-500"
								}`}
							style={{ minWidth: 0 }}
						/>
						<button className="bg-purple-500 text-white px-2 py-1.5 rounded-md font-semibold text-xs flex items-center gap-2 w-full sm:w-auto">
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

				<div className="overflow-x-auto">
					<table className="min-w-[600px] sm:min-w-full text-xs sm:text-sm">
						<thead>
							<tr className={`border-b ${theme === "dark" ? "border-gray-700" : ""
								}`}>
								<th className={`py-2 sm:py-3 px-1 sm:px-2 font-semibold text-left ${theme === "dark" ? "text-primaryText" : "text-gray-600"
									}`}>
									<input type="checkbox" />
								</th>
								<th className={`py-2 sm:py-3 px-1 sm:px-2 font-semibold text-left ${theme === "dark" ? "text-primaryText" : "text-gray-600"
									}`}>
									Sales Rep
								</th>
								<th className={`py-2 sm:py-3 px-1 sm:px-2 font-semibold text-left ${theme === "dark" ? "text-primaryText" : "text-gray-600"
									}`}>
									Category
								</th>
								<th className={`py-2 sm:py-3 px-1 sm:px-2 font-semibold text-left ${theme === "dark" ? "text-primaryText" : "text-gray-600"
									}`}>
									Mail
								</th>
								<th className={`py-2 sm:py-3 px-1 sm:px-2 font-semibold text-left ${theme === "dark" ? "text-primaryText" : "text-gray-600"
									}`}>
									Location
								</th>
								<th className={`py-2 sm:py-3 px-1 sm:px-2 font-semibold text-left ${theme === "dark" ? "text-primaryText" : "text-gray-600"
									}`}>
									Date
								</th>
								<th className={`py-2 sm:py-3 px-1 sm:px-2 font-semibold text-left ${theme === "dark" ? "text-primaryText" : "text-gray-600"
									}`}>
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{deals.map((deal, idx) => (
								<tr key={idx} className={`border-b transition-colors ${theme === "dark"
										? "border-gray-700 hover:bg-gray-700"
										: "hover:bg-gray-50"
									}`}>
									<td className="py-2 sm:py-3 px-1 sm:px-2 pl-3">
										<input type="checkbox" />
									</td>
									<td className={`py-2  justify-start  sm:py-3 px-1 sm:px-2 pl-3 flex items-center gap-2 border-l ${theme === "dark" ? "border-purple-900" : "border-purple-200"}`}>
										<img
											src={deal.avatar}
											alt={deal.name}
											className="w-7 h-7 ml-4 sm:w-8 sm:h-8 rounded-full"
										/>
										<span className={`font-medium truncate max-w-[80px] sm:max-w-none ${theme === "dark" ? "text-primaryText" : "text-gray-800"
											}`}>
											{deal.name}
										</span>
									</td>
									<td className={`py-2 sm:py-3    px-1 sm:px-2 pl-3 border-l ${theme === "dark" ? "border-purple-900" : "border-purple-200"} ${theme === "dark" ? "text-secondaryText" : "text-gray-800"
										}`}>{deal.category}</td>
									<td className={`py-2 sm:py-3 px-1 sm:px-2 pl-3 truncate max-w-[100px] sm:max-w-none border-l ${theme === "dark" ? "border-purple-900" : "border-purple-200"} ${theme === "dark" ? "text-secondaryText" : "text-gray-800"
										}`}>{deal.mail}</td>
									<td className={`py-2 sm:py-3 px-1 sm:px-2 pl-3 border-l ${theme === "dark" ? "border-purple-900" : "border-purple-200"}`}>
										<span
											className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${deal.location.color}`}
										>
											{deal.location.label}
										</span>
									</td>
									<td className={`py-2 sm:py-3 px-1 sm:px-2 pl-3 border-l ${theme === "dark" ? "border-purple-900" : "border-purple-200"} ${theme === "dark" ? "text-secondaryText" : "text-gray-800"
										}`}>{deal.date}</td>
									<td className={`py-2 sm:py-3 px-1 sm:px-2 pl-3 flex gap-2 border-l ${theme === "dark" ? "border-purple-900" : "border-purple-200"}`}>
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

				<div className={`flex flex-col sm:flex-row items-center justify-between mt-4 text-xs sm:text-sm gap-2 ${theme === "dark" ? "text-secondaryText" : "text-gray-500"
					}`}>
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
