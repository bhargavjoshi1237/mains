import React from "react";

const Navbar = () => (
  <nav className="ml-[70px] flex items-center justify-between px-6 py-2 border-b border-gray-200 bg-white min-h-[56px]">
    {/* Left: X icon */}
    <div className="text-2xl font-light text-gray-500 cursor-pointer">
      &#10005;
    </div>
    <div className="flex flex-1 justify-end items-center gap-6">
      {/* Search */}
      <span className="text-xl text-gray-500 cursor-pointer">
       <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"/></svg>
      </span>
      {/* Language */}
      <span className="flex items-center gap-1 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 512 512"><mask id="circleFlagsUs0"><circle cx="256" cy="256" r="256" fill="#fff" /></mask><g mask="url(#circleFlagsUs0)"><path fill="#eee" d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z" /><path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" /><path fill="#0052b4" d="M0 0h256v256H0Z" /><path fill="#eee" d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z" /></g></svg>
        <span className="font-medium text-gray-500">EN</span>
      </span>
      {/* Dark mode */}
      <span className="text-xl text-gray-500 cursor-pointer">
       <img className="w-6  text-gray-500 h-6" src="https://api.iconify.design/ic:outline-dark-mode.svg?color=gray" alt="" />
      </span>
    {/* Cart */}
    <span className="relative text-xl text-gray-500 cursor-pointer">
        <img className="w-6 h-6" src="https://api.iconify.design/ic:outline-shopping-cart.svg?color=gray" alt="" />
        {/* Notification bubble */}
        <span className="absolute -top-1 -right-2 flex items-center justify-center bg-violet-500 text-white rounded-full text-xs w-5 h-5 font-bold border-2 border-white shadow">
            5
        </span>
    </span>
    <span className="relative text-xl text-gray-500 cursor-pointer">
        <img className="w-6 h-6" src="https://api.iconify.design/ic:outline-notifications.svg?color=gray" alt="" />
        {/* Notification bubble */}
        <span className="absolute -top-1 -right-2 flex items-center justify-center bg-cyan-500 text-white rounded-full text-xs w-5 h-5 font-bold border-2 border-white shadow">
            5
        </span>
    </span>

    
    {/* Apps grid */}
      <span className="relative text-xl ml-2 text-gray-500 cursor-pointer">
       <img className="h-6 w-6 " src="https://api.iconify.design/ic:outline-dashboard.svg?color=gray" alt="" />
      </span>
      <span className="relative text-xl text-gray-500 cursor-pointer">
       <img className="h-7 w-7" src="https://api.iconify.design/ic:baseline-fullscreen.svg?color=gray" alt="" />
      </span>
      {/* User */}
      <span className="flex items-center gap-2 ml-3">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-8 h-8 rounded-full object-cover"
        />
        <span className="flex flex-col items-start">
          <span className="font-semibold text-sm text-gray-900">
            Json Taylor
          </span>
          <span className="text-xs text-gray-500 -mt-0.5">Web Designer</span>
        </span>

        <img
          src="https://api.iconify.design/ic:outline-settings.svg?color=gray"
          alt="User"
          className="ml-5 mr-2 animate-spin-slow  w-6 h-6 rounded-full object-cover"
        />
      </span>
    </div>
  </nav>
);

export default Navbar;
