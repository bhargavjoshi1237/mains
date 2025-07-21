import React, { useState, useEffect } from "react";

const Sidebar = () => {
    const [isDocked, setIsDocked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const isExpanded = isDocked || isHovered;


    useEffect(() => {
        const event = new CustomEvent('sidebarStateChange', {
            detail: { docked: isDocked, hovered: isHovered }
        });
        window.dispatchEvent(event);
    }, [isDocked, isHovered]);

    const menuItems = [
        {
            section: "MAIN",
            items: [
                {
                    icon: "🏠",
                    label: "Dashboards",
                    badge: "12",
                    hasDropdown: true,
                    subitems: [
                        { icon: "○", label: "CRM" },
                        { icon: "○", label: "Ecommerce" },
                        { icon: "○", label: "Crypto" },
                        { icon: "○", label: "Jobs" },
                        { icon: "○", label: "NFT" },
                        { icon: "○", label: "Sales" },
                        { icon: "○", label: "Analytics" },
                        { icon: "○", label: "Projects" },
                        { icon: "○", label: "HRM" },
                        { icon: "○", label: "Stocks" },
                        { icon: "○", label: "Courses" },
                        { icon: "○", label: "Personal" },
                    ]
                }
            ]
        },
        {
            section: "PAGES",
            items: [
                {
                    icon: "📄",
                    label: "Pages",
                    badge: "New",
                    hasDropdown: true
                },
                {
                    icon: "✓",
                    label: "Task",
                    badge: "New",
                    hasDropdown: true
                },
                {
                    icon: "🔐",
                    label: "Authentication",
                    hasDropdown: true
                }
            ]
        }
    ];

    const bottomIcons = [
        { icon: "⚠️", tooltip: "Alerts" },
        { icon: "💬", tooltip: "Messages" },
        { icon: "⏰", tooltip: "Timer" },
        { icon: "📋", tooltip: "Tasks" },
        { icon: "🔔", tooltip: "Notifications" },
        { icon: "🎁", tooltip: "Gifts" }
    ];

    return (
        <>

            <div
                className={` hidden md:block fixed left-0 top-0 h-full bg-[#1e293b] text-white transition-all duration-300 z-50 ${isExpanded ? 'w-64' : 'w-[70px]'
                    } ${!isDocked && isHovered ? 'shadow-2xl' : ''}`}
                onMouseEnter={() => !isDocked && setIsHovered(true)}
                onMouseLeave={() => !isDocked && setIsHovered(false)}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-slate-600">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm11-2v16" /><path d="m9 10l2 2l-2 2" /></g></svg>
                        </div>
                        {isExpanded && (
                            <span className="text-xl font-bold">CRM</span>
                        )}
                    </div>
                    {isExpanded && (
                        <button
                            onClick={() => setIsDocked(!isDocked)}
                            className="p-1 hover:bg-slate-600 rounded transition-colors"
                            title={isDocked ? "Undock sidebar" : "Dock sidebar"}
                        >
                            {isDocked ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 0 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                </svg>
                            )}
                        </button>
                    )}
                </div>


                <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
                    {menuItems.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="mb-6">
                            {isExpanded && (
                                <div className="px-4 mb-3">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                        {section.section}
                                    </span>
                                </div>
                            )}

                            {section.items.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    <div className="group relative">
                                        <div className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors ${isExpanded ? '' : 'justify-center'
                                            }`}>
                                            <div className="w-5 h-5 flex items-center justify-center text-slate-300">
                                                {item.icon === "🏠" && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zM7 15h2v4H7v-4zm4 0h2v4h-2v-4zm4 0h2v4h-2v-4z" />
                                                    </svg>
                                                )}
                                                {item.icon === "📄" && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                                                    </svg>
                                                )}
                                                {item.icon === "✓" && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                                    </svg>
                                                )}
                                                {item.icon === "🔐" && (
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                                                    </svg>
                                                )}
                                            </div>

                                            {isExpanded && (
                                                <>
                                                    <span className="flex-1 text-sm font-medium">{item.label}</span>
                                                    <div className="flex items-center gap-2">
                                                        {item.badge && (
                                                            <span className={`px-2 py-0.5 text-xs font-semibold rounded ${item.badge === "New"
                                                                ? "bg-blue-500 text-white"
                                                                : "bg-orange-500 text-white"
                                                                }`}>
                                                                {item.badge}
                                                            </span>
                                                        )}
                                                        {item.hasDropdown && (
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-slate-400">
                                                                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>


                                        {!isExpanded && (
                                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                                {item.label}
                                            </div>
                                        )}
                                    </div>


                                    {item.subitems && isExpanded && (
                                        <div className="ml-8 mt-1">
                                            {item.subitems.map((subitem, subIndex) => (
                                                <div key={subIndex} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-700 cursor-pointer transition-colors">
                                                    <span className="text-slate-400 text-xs">{subitem.icon}</span>
                                                    <span className="text-sm text-slate-300">{subitem.label}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>


                <div className="border-t border-slate-600 p-4">
                    <div className={`${isExpanded ? 'grid grid-cols-3 gap-3' : 'flex flex-col gap-3'}`}>
                        {bottomIcons.map((item, index) => (
                            <div key={index} className="group relative">
                                <div className="w-8 h-8 flex items-center justify-center hover:bg-slate-700 rounded cursor-pointer transition-colors">
                                    <div className="w-5 h-5 flex items-center justify-center text-slate-300">
                                        {item.icon === "⚠️" && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
                                            </svg>
                                        )}
                                        {item.icon === "💬" && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4C22,2.89 21.1,2 20,2Z" />
                                            </svg>
                                        )}
                                        {item.icon === "⏰" && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.7L16.2,16.2Z" />
                                            </svg>
                                        )}
                                        {item.icon === "📋" && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3" />
                                            </svg>
                                        )}
                                        {item.icon === "🔔" && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />
                                            </svg>
                                        )}
                                        {item.icon === "🎁" && (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M22,12V20A2,2 0 0,1 20,22H4A2,2 0 0,1 2,20V12A1,1 0 0,1 1,11V8A2,2 0 0,1 3,6H6.17C6.06,5.69 6,5.35 6,5A3,3 0 0,1 9,2C10,2 10.88,2.5 11.43,3.24V3.24L12,4L12.57,3.24V3.24C13.12,2.5 14,2 15,2A3,3 0 0,1 18,5C18,5.35 17.94,5.69 17.83,6H21A2,2 0 0,1 23,8V11A1,1 0 0,1 22,12M4,20H11V12H4V20M20,12H13V20H20V12M9,4A1,1 0 0,0 8,5A1,1 0 0,0 9,6A1,1 0 0,0 10,5A1,1 0 0,0 9,4M15,4A1,1 0 0,0 14,5A1,1 0 0,0 15,6A1,1 0 0,0 16,5A1,1 0 0,0 15,4M3,8V10H11V8H3M13,8V10H21V8H13Z" />
                                            </svg>
                                        )}
                                    </div>
                                </div>


                                {!isExpanded && (
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                        {item.tooltip}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;