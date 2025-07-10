import React from "react";

export default function TaskStatusIcon({ colorClass = "text-blue-500" }) {
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className={colorClass}>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.75 12.8665L8.33995 16.4138C9.15171 17.5256 10.8179 17.504 11.6006 16.3715L18.25 6.75"/>
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 12C19.25 16.004 15.004 19.25 11 19.25C6.99602 19.25 4.75 16.004 4.75 12C4.75 7.99602 7.99602 4.75 11 4.75C15.004 4.75 19.25 7.99602 19.25 12Z"/>
    </svg>
  );
}
