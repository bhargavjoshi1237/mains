import React from "react";

const Navbar = ({ sidebarWidth = 70 }) => (
  <nav
    className="flex items-center justify-between px-3 sm:px-6 py-2 border-b border-gray-200 bg-white min-h-[56px] transition-all duration-300 fixed top-0 right-0 z-30"
    style={{
      left: `${sidebarWidth}px`
    }}
  >
    <div className="flex flex-1 justify-end items-center gap-3 sm:gap-4 lg:gap-6 min-w-0 overflow-x-hidden">
      {/* Search - Hidden on very small screens */}
      <span className="hidden xs:block text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6">
          <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
        </svg>
      </span>


      <span className="hidden sm:flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-2 py-1 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" className="lg:w-5 lg:h-5">
          <mask id="circleFlagsUs0"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
          <g mask="url(#circleFlagsUs0)">
            <path fill="#eee" d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z" />
            <path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" />
            <path fill="#0052b4" d="M0 0h256v256H0Z" />
            <path fill="#eee" d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z" />
          </g>
        </svg>
        <span className="font-medium text-gray-500 text-sm">EN</span>
      </span>


      <span className="hidden sm:block text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
        <img className="w-5 h-5 lg:w-6 lg:h-6" src="https://api.iconify.design/ic:outline-dark-mode.svg?color=gray" alt="Dark mode" />
      </span>


      <span className="relative text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors flex-shrink-0">
        <img className="w-5 h-5 sm:w-6 sm:h-6" src="https://api.iconify.design/ic:outline-shopping-cart.svg?color=gray" alt="Cart" />
        <span className="absolute -top-1 -right-2 flex items-center justify-center bg-violet-500 text-white rounded-full text-xs w-4 h-4 sm:w-5 sm:h-5 font-bold border-2 border-white shadow">
          5
        </span>
      </span>


      <span className="relative text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors flex-shrink-0">
        <img className="w-5 h-5 sm:w-6 sm:h-6" src="https://api.iconify.design/ic:outline-notifications.svg?color=gray" alt="Notifications" />
        <span className="absolute -top-1 -right-2 flex items-center justify-center bg-cyan-500 text-white rounded-full text-xs w-4 h-4 sm:w-5 sm:h-5 font-bold border-2 border-white shadow">
          5
        </span>
      </span>


      <span className="hidden md:block relative text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
        <img className="h-5 w-5 lg:h-6 lg:w-6" src="https://api.iconify.design/ic:outline-dashboard.svg?color=gray" alt="Dashboard" />
      </span>


      <span className="hidden md:block relative text-xl text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
        <img className="h-6 w-6 lg:h-7 lg:w-7" src="https://api.iconify.design/ic:baseline-fullscreen.svg?color=gray" alt="Fullscreen" />
      </span>


      <span className="flex items-center gap-2 sm:gap-3 ml-3 sm:ml-4 flex-shrink-0">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
        />
        <span className="hidden lg:flex flex-col items-start">
          <span className="font-semibold text-sm text-gray-900">
            Json Taylor
          </span>
          <span className="text-xs text-gray-500 -mt-0.5">Web Designer</span>
        </span>

        <img
          src="https://api.iconify.design/ic:outline-settings.svg?color=gray"
          alt="Settings"
          className="hidden sm:block ml-2 lg:ml-5 mr-2 animate-spin-slow w-5 h-5 lg:w-6 lg:h-6 cursor-pointer hover:text-gray-700 transition-colors"
        />
      </span>
    </div>
  </nav>
);

export default Navbar;
