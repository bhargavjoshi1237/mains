// filepath: c:\Users\Bhargav\Desktop\mains - Copy\resources\js\Pages\Ui\RecentActivity.jsx
import React from "react";

const activities = [
  {
    color: "bg-purple-500",
    title: (
      <>
        Update of calendar events & <br />
        <span className="text-blue-500"><b>Added new events in next week.</b></span>
      </>
    ),
    time: "4:45PM",
    desc: null,
  },
  {
    color: "bg-sky-500",
    title: (
      <>
        New theme for <span className="font-semibold text-gray-800">Spruko Website</span>
      </>
    ),
    time: "3 hrs",

  },
  {
    color: "bg-green-500",
    title: (
      <>
        Created a <span className="text-green-600 font-semibold">New Task</span> today
      </>
    ),
    time: "22 hrs",
    desc: null,
  },
  {
    color: "bg-pink-400",
    title: (
      <>
        New member <span className="bg-gray-100 text-pink-500 px-2 py-0.5 rounded text-xs font-semibold">@andreas gurrero</span>
      </>
    ),
    time: "Today",
    desc: <span className="text-gray-500">added today to AI Summit.</span>,
  },
  {
    color: "bg-yellow-400",
    title: <>32 New people joined summit.</>,
    time: "22 hrs",
    desc: null,
  },
  {
    color: "bg-sky-500",
    title: (
      <>
        Neon Tarly added <span className="text-blue-600 font-semibold">Robert Bright</span> to AI summit project.
      </>
    ),
    time: "12 hrs",
    desc: null,
  },
  {
    color: "bg-purple-500",
    title: (
      <>
        Completed documentation of <span className="text-purple-600 font-semibold underline">AI Summit.</span>
      </>
    ),
    time: "4 hrs",
    desc: null,
  },
];

const RecentActivity = ({ theme }) => (
  <div className={`rounded-xl shadow p-5     sm:-mt-0 md:mt-0 w-full ${theme === 'dark' ? 'bg-darkBg' : 'bg-lightBg'}`}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex flex-col">
        <span className="w-1 h-2 bg-[#ae97f3] mr-2"></span>
        <span className="w-1 h-2 bg-[#97f0a2] mr-2"></span>
      </div>
      <span className={`mr-auto font-semibold text-md ${theme === 'dark' ? 'text-primaryText' : 'text-gray-800'}`}>Recent Activity</span>
      <div className="flex items-center gap-1 cursor-pointer">
				<span
					className={`text-xs font-medium ${theme === "dark" ? "text-secondaryText" : "text-gray-500"
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
			</div>    </div>

    <hr className={`mt-6 z-10 w-[110%] -ml-[5%] ${theme === 'dark' ? 'border-gray-700' : ''}`} />
    <div className="relative pl-10 mt-6 -ml-2">
      <div className={`absolute left-5 top-6 bottom-6 w-0.5 -mt-2 border-l-2 border-dashed z-0 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}></div>
      <ul className="space-y-8 mt-6">
        {activities.map((item, idx) => (
          <li key={idx} className="relative flex items-start ml-[-0.156rem]">
            <span
              className={`absolute -mt-1.5 -ml-6 top-2 w-4 h-4 rounded-full ${item.color} border-2 shadow z-10 ${theme === 'dark' ? 'border-gray-800' : 'border-white'}`}
            ></span>
            <div className="flex-1 ml-4">
              <div className="flex items-center justify-between">
                <div className={`text-sm leading-snug ${theme === 'dark' ? 'text-primaryText' : 'text-gray-800'}`}>{item.title}</div>
                <span className={`text-xs ml-2 ${theme === 'dark' ? 'text-secondaryText' : 'text-secondaryText'}`}>{item.time}</span>
              </div>
              {item.desc && <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-secondaryText' : ''}`}>{item.desc}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default RecentActivity;