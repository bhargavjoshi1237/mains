// filepath: c:\Users\Bhargav\Desktop\mains - Copy\resources\js\Pages\Ui\RecentActivity.jsx
import React from "react";

const activities = [
  {
    color: "bg-purple-500",
    title: (
      <>
        Update of calendar events & <br />
        <span className="text-blue-500">Added new events in next week.</span>
      </>
    ),
    time: "4:45PM",
    desc: null,
  },
  {
    color: "bg-sky-500",
    title: (
      <>
        New theme for <span className="font-semibold text-gray-800">Spruko Website</span> completed
      </>
    ),
    time: "3 hrs",
    desc: <span className="text-gray-400">Lorem ipsum, dolor sit amet.</span>,
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
    color: "bg-gray-400",
    title: (
      <>
        Replied to new support request <span className="text-green-500 ml-1">&#10003;</span>
      </>
    ),
    time: "4 hrs",
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

const RecentActivity = () => (
  <div className="bg-white rounded-xl shadow p-5 w-full">
    {/* Header */}
    <div className="flex items-center justify-between mb-3">
      <span className="font-semibold text-gray-800 text-lg">Recent Activity</span>
      <a href="#" className="text-xs text-blue-500 font-semibold hover:underline">View All</a>
    </div>
    {/* Timeline */}
    <div className="relative pl-10">
      {/* Timeline vertical dashed line */}
      <div className="absolute left-5 top-6 bottom-6 w-0.5 border-l-2 border-dashed border-gray-300 z-0"></div>
      <ul className="space-y-8 mt-6">
        {activities.map((item, idx) => (
          <li key={idx} className="relative flex items-start ml-[-0.156rem]">
            {/* Timeline dot */}
            <span
              className={`absolute  -ml-6 top-2 w-4 h-4 rounded-full ${item.color} border-2 border-white shadow z-10`}
            ></span>
            {/* Content */}
            <div className="flex-1 ml-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-800 leading-snug">{item.title}</div>
                <span className="text-xs text-gray-400 ml-2">{item.time}</span>
              </div>
              {item.desc && <div className="text-xs mt-1">{item.desc}</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default RecentActivity;