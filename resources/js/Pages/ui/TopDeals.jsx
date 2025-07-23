import React from "react";

const deals = [
	{
		name: "Michael Jordan",
		email: "michael.jordan@example.com",
		amount: "$2,893",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
		initials: null,
		color: null,
	},
	{
		name: "Emigo Kiaren",
		email: "emigo.kiaren@gmail.com",
		amount: "$4,289",
		avatar: null,
		initials: "EK",
		color: "bg-yellow-600",
	},
	{
		name: "Randy Origoan",
		email: "randy.origoan@gmail.com",
		amount: "$6,347",
		avatar: "https://randomuser.me/api/portraits/men/33.jpg",
		initials: null,
		color: null,
	},
	{
		name: "George Pieterson",
		email: "george.pieterson@gmail.com",
		amount: "$3,894",
		avatar: null,
		initials: "GP",
		color: "bg-green-700",
	},
	{
		name: "Kiara Advain",
		email: "kiaraadvain214@gmail.com",
		amount: "$2,679",
		avatar: null,
		initials: "KA",
		color: "bg-purple-700",
	},
];

const TopDeals = ({ theme = "light" }) => (
	<div
		className={`rounded-lg shadow-sm   p-4 sm:p-3.5 flex flex-col w-full min-w-0 h-auto ${theme === "dark"
				? "bg-darkBg border-gray-700"
				: "bg-lightBg border-gray-100"
			}`}
	>
		<div className="flex items-center justify-between mb-4 -ml-1.5">
			<div className="flex items-center  ">
				<div className="flex flex-col mr-2 ">
					<span className="w-1 h-2 bg-[#ae97f3]"></span>
					<span className="w-1 h-2 bg-[#97f0a2]"></span>
				</div>
				<span
					className={`font-semibold text-sm sm:text-base ${theme === "dark" ? "text-gray-100" : "text-gray-900"
						}`}
				>
					Top Deals
				</span>
			</div>
			<button
				className={`p-1 rounded transition-colors ${theme === "dark"
						? "text-gray-400 hover:bg-gray-700"
						: "text-gray-400 hover:bg-gray-100"
					}`}
			>
				<svg
					width="18"
					height="18"
					fill="none"
					viewBox="0 0 24 24"
					className="sm:w-5 sm:h-5"
				>
					<circle cx="5" cy="12" r="2" fill="currentColor" />
					<circle cx="12" cy="12" r="2" fill="currentColor" />
					<circle cx="19" cy="12" r="2" fill="currentColor" />
				</svg>
			</button>
		</div>

		<hr
			className={`mb-4 ${theme === "dark" ? "border-gray-700" : "border-gray-200"
				}`}
		/>

		<div className="flex flex-col pl-2 pt-1 gap-3 sm:gap-4">
			{deals.map((deal, idx) => (
				<div
					key={idx}
					className={`flex items-center justify-between p-2 -m-2 rounded-lg transition-colors ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
						}`}
				>
					<div className="flex items-center gap-3 flex-1 min-w-0">
						{deal.avatar ? (
							<img
								src={deal.avatar}
								alt={deal.name}
								className="w-6 h-6 sm:w-6 sm:h-6 rounded-full object-cover flex-shrink-0"
							/>
						) : (
							<span
								className={`w-6 h-6 sm:w-6 sm:h-6	 rounded-full flex items-center justify-center text-xs font-bold text-white ${deal.color} flex-shrink-0`}
							>
								{deal.initials}
							</span>
						)}
						<div className="flex-1 min-w-0">
							<div
								className={`mb-1 font-semibold text-sm leading-tight truncate ${theme === "dark" ? "text-primaryText" : "text-gray-900"
									}`}
							>
								{deal.name}
							</div>
							<div
								className={`text-xs leading-tight truncate ${theme === "dark" ? "text-secondaryText" : "text-gray-500"
									}`}
							>
								{deal.email}
							</div>
						</div>
					</div>
					<div
						className={`font-semibold -mt-4 text-sm sm:text-base items-center text-start  flex-shrink-0  ${theme === "dark" ? "text-primaryText" : "text-gray-900"
							}`}
					>
						{deal.amount}
					</div>
				</div>
			))}
		</div>
	</div>
);

export default TopDeals;
