import React, { useRef } from "react";

const Navbar = ({ sidebarWidth = 70, theme = "light", onThemeChange }) => {
  // Track fullscreen state
  const isFullscreen = useRef(false);

  const handleFullscreenToggle = () => {
    if (!isFullscreen.current) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
      isFullscreen.current = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      isFullscreen.current = false;
    }
  };

  return (
    <nav
      className={`flex items-center justify-between px-3 sm:px-6 py-2 border-b min-h-[56px] transition-all duration-300 fixed top-0 right-0 z-30 ${
        theme === "dark"
          ? "bg-[#191919] border-gray-700"
          : "bg-white border-gray-200"
      }`}
      style={{
        left: `${sidebarWidth}px`
      }}
    >
      <div className="flex flex-1 justify-end items-center gap-2 sm:gap-4 lg:gap-6 min-w-0 overflow-x-hidden">
        {/* Search */}
        <span className="flex items-center justify-center w-10 h-10 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="sm:w-6 sm:h-6">
            <path fill="currentColor" d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" />
          </svg>
        </span>


        {/* Language */}
        <span className="hidden sm:flex items-center justify-center w-10 h-10 gap-1 text-gray-500 cursor-pointer hover:bg-gray-100 rounded transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512" className="lg:w-5 lg:h-5">
            <mask id="circleFlagsUs0"><circle cx="256" cy="256" r="256" fill="#fff" /></mask>
            <g mask="url(#circleFlagsUs0)">
              <path fill="#eee" d="M256 0h256v64l-32 32l32 32v64l-32 32l32 32v64l-32 32l32 32v64l-256 32L0 448v-64l32-32l-32-32v-64z" />
              <path fill="#d80027" d="M224 64h288v64H224Zm0 128h288v64H256ZM0 320h512v64H0Zm0 128h512v64H0Z" />
              <path fill="#0052b4" d="M0 0h256v256H0Z" />
              <path fill="#eee" d="m187 243l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67zm162-81l57-41h-70l57 41l-22-67zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Zm162-82l57-41h-70l57 41l-22-67Zm-81 0l57-41H93l57 41l-22-67zm-81 0l57-41H12l57 41l-22-67Z" />
            </g>
          </svg>
          <span className="text-sm">EN</span>
        </span>


        {/* Theme Toggle */}
        <span className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}>
          <img
            className="w-5 h-5 lg:w-6 lg:h-6"
            src="https://api.iconify.design/ic:outline-dark-mode.svg?color=gray"
            alt="Dark mode"
          />
        </span>


        {/* Cart */}
        <span className="relative flex items-center justify-center w-10 h-10 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
          <img className="w-5 h-5 sm:w-6 sm:h-6" src="https://api.iconify.design/ic:outline-shopping-cart.svg?color=gray" alt="Cart" />
          <span className="absolute -top-1 -right-2 flex items-center justify-center bg-violet-500 text-white rounded-full text-xs w-4 h-4 sm:w-5 sm:h-5 font-bold border-2 border-white shadow">
            5
          </span>
        </span>


        {/* Notifications */}
        <span className="relative flex items-center justify-center w-10 h-10 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
          <img className="w-5 h-5 sm:w-6 sm:h-6" src="https://api.iconify.design/ic:outline-notifications.svg?color=gray" alt="Notifications" />
          <span className="absolute -top-1 -right-2 flex items-center justify-center bg-cyan-500 text-white rounded-full text-xs w-4 h-4 sm:w-5 sm:h-5 font-bold border-2 border-white shadow">
            5
          </span>
        </span>


        {/* Dashboard */}
        <span className="hidden md:flex items-center justify-center w-10 h-10 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">
          <img className="h-5 w-5 lg:h-6 lg:w-6" src="https://api.iconify.design/ic:outline-dashboard.svg?color=gray" alt="Dashboard" />
        </span>


        {/* Fullscreen */}
        <span className="hidden md:flex items-center justify-center w-10 h-10 text-gray-500 cursor-pointer hover:text-gray-700 transition-colors" onClick={handleFullscreenToggle}>
          <img className="h-6 w-6 lg:h-7 lg:w-7" src="https://api.iconify.design/ic:baseline-fullscreen.svg?color=gray" alt="Fullscreen" />
        </span>


        {/* User */}
        <span className="flex items-center ml-3 sm:ml-4 flex-shrink-0">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
          />
          <span className="hidden lg:flex flex-col items-start">
            <span className={`font-semibold text-sm ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
              Json Taylor
            </span>
            <span className={`text-xs text-gray-500 -mt-0.5 ${theme === "dark" ? "text-gray-400" : ""}`}>Web Designer</span>
          </span>
        </span>


        {/* Settings */}
        <span className="flex items-center justify-center w-10 h-10 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors">
          <img className="w-5 h-5 lg:w-6 lg:h-6 animate-spin-slow" src="https://api.iconify.design/ic:outline-settings.svg?color=gray" alt="Settings" />
        </span>
      </div>
    </nav>
  );
};

export default Navbar;