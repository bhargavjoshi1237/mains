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
  <div className="bg-white rounded-lg p-5 shadow flex flex-col border border-gray-200 w-full max-w-[600px] xl:max-w-[450px] min-w-0 h-[350px] sm:h-[350px] md:h-[320px] lg:h-[350px]" style={{minHeight: 0}}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <div className="flex flex-col">
                        <span className="w-1 h-2   bg-[#ae97f3] mr-2"></span>
                        <span className="w-1 h-2  bg-[#97f0a2] mr-2"></span>
                    </div>
        <span className="text-gray-900 font-semibold text-base">Top Deals</span>
      </div>
      <button className="text-gray-400 hover:text-gray-700 p-1 rounded transition">
        <svg width="22" className="flex flex-col" height="22" fill="none" viewBox="0 0 24 24">
          <circle cx="5" cy="12" r="2" fill="currentColor"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <circle cx="19" cy="12" r="2" fill="currentColor"/>
        </svg>
      </button>
    </div>
    <hr className=" " />
    <br />
    <div className="flex  flex-col gap-4">
      {deals.map((deal, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {deal.avatar ? (
              <img
                src={deal.avatar}
                alt={deal.name}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${deal.color}`}>
                {deal.initials}
              </span>
            )}
            <div>
              <div className="text-gray-900 font-semibold text-sm leading-tight">{deal.name}</div>
              <div className="text-xs text-gray-500 leading-tight">{deal.email}</div>
            </div>
          </div>
          <div className="text-gray-900 font-semibold text-base">{deal.amount}</div>
        </div>
      ))}
    </div>
  </div>
);

export default TopDeals;
