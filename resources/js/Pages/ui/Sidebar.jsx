import React, { useState, useEffect } from "react";

const Sidebar = ({ theme }) => {
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
                    icon: "ic:outline-home",
                    label: "Dashboards",
                    badge: "12",
                    hasDropdown: true,
                    subitems: [
                        { icon: "ic:outline-business", label: "CRM" },
                        { icon: "ic:outline-shopping-cart", label: "Ecommerce" },
                        { icon: "ic:outline-currency-bitcoin", label: "Crypto" },
                        { icon: "ic:outline-work", label: "Jobs" },
                        { icon: "ic:outline-collections", label: "NFT" },
                        { icon: "ic:outline-point-of-sale", label: "Sales" },
                        { icon: "ic:outline-analytics", label: "Analytics" },
                        { icon: "ic:outline-assignment", label: "Projects" },
                        { icon: "ic:outline-people", label: "HRM" },
                        { icon: "ic:outline-trending-up", label: "Stocks" },
                        { icon: "ic:outline-school", label: "Courses" },
                        { icon: "ic:outline-person", label: "Personal" },
                    ]
                }
            ]
        },
        {
            section: "PAGES",
            items: [
                {
                    icon: "ic:outline-description",
                    label: "Pages",
                    badge: "New",
                    hasDropdown: true
                },
                {
                    icon: "ic:outline-task",
                    label: "Task",
                    badge: "New",
                    hasDropdown: true
                },
                {
                    icon: "ic:outline-lock",
                    label: "Authentication",
                    hasDropdown: true
                }
            ]
        }
    ];

    const bottomIcons = [
        { icon: "ic:outline-warning", tooltip: "Alerts" },
        { icon: "ic:outline-message", tooltip: "Messages" },
        { icon: "ic:outline-access-time", tooltip: "Timer" },
        { icon: "ic:outline-assignment", tooltip: "Tasks" },
        { icon: "ic:outline-notifications", tooltip: "Notifications" },
        { icon: "ic:outline-card-giftcard", tooltip: "Gifts" }
    ];

    return (
        <>

            <div
                className={`hidden md:block fixed left-0 top-0 h-full transition-all duration-300 z-50 ${isExpanded ? 'w-64' : 'w-[70px]'} ${theme === "dark" ? "bg-darkBg text-primaryText border-r border-[#474747]" : "bg-[#1e293b]  text-tertiaryText"} ${!isDocked && isHovered ? 'shadow-2xl' : ''}`}
                onMouseEnter={() => !isDocked && setIsHovered(true)}
                onMouseLeave={() => !isDocked && setIsHovered(false)}
            >

                <div className="flex items-center justify-center p-3  border-b border-slate-600">
                    <div className="flex items-center  gap-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm11-2v16" /><path d="m9 10l2 2l-2 2" /></g></svg>
                        </div>
                        {isExpanded && (
                            <span className={`text-xl font-bold transition-colors text-white
                            }`}>
                                CRM
                            </span>
                        )}
                    </div>
                    {isExpanded && (
                        <button
                            onClick={() => setIsDocked(!isDocked)}
                            className="p-1 ml-auto hover:bg-slate-600 rounded transition-colors"
                            title={isDocked ? "Undock sidebar" : "Dock sidebar"}
                        >
                            {isDocked ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 0 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
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
                                                {item.icon && (
                                                    <img
                                                        src={`https://api.iconify.design/${item.icon}.svg?color=gray`}
                                                        alt={item.label}
                                                        className="w-full h-full"
                                                    />
                                                )}
                                            </div>

                                            {isExpanded && (
                                                <>
                                                    <span className="flex-1 text-sm text-primaryText font-medium">{item.label}</span>
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
                                                    <div className="w-4 h-4 flex items-center justify-center">
                                                        <img
                                                            src={`https://api.iconify.design/${subitem.icon}.svg?color=gray`}
                                                            alt={subitem.label}
                                                            className="w-full h-full"
                                                        />
                                                    </div>
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
                                        <img
                                            src={`https://api.iconify.design/${item.icon}.svg?color=gray`}
                                            alt={item.tooltip}
                                            className="w-full h-full"
                                        />
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