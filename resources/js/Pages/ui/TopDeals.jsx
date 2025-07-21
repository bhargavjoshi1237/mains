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

const TopDeals = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col w-full min-w-0 h-auto">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="flex flex-col mr-2">
          <span className="w-1 h-2 bg-[#ae97f3]"></span>
          <span className="w-1 h-2 bg-[#97f0a2]"></span>
        </div>
        <span className="text-gray-900 font-semibold text-sm sm:text-base">Top Deals</span>
      </div>
      <button className="text-gray-400 hover:text-gray-700 hover:bg-gray-100 p-1 rounded transition-colors">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="sm:w-5 sm:h-5">
          <circle cx="5" cy="12" r="2" fill="currentColor"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <circle cx="19" cy="12" r="2" fill="currentColor"/>
        </svg>
      </button>
    </div>
    
    <hr className="border-gray-200 mb-4" />
    
    <div className="flex flex-col gap-3 sm:gap-4">
      {deals.map((deal, idx) => (
        <div key={idx} className="flex items-center justify-between hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {deal.avatar ? (
              <img
                src={deal.avatar}
                alt={deal.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <span className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs font-bold text-white ${deal.color} flex-shrink-0`}>
                {deal.initials}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 font-semibold text-sm leading-tight truncate">{deal.name}</div>
              <div className="text-xs text-gray-500 leading-tight truncate">{deal.email}</div>
            </div>
          </div>
          <div className="text-gray-900 font-semibold text-sm sm:text-base flex-shrink-0 ml-2">{deal.amount}</div>
        </div>
      ))}
    </div>
  </div>
);

export default TopDeals;
