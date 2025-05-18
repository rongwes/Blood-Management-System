import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import notifications_icon from '../../assets/notifications_icon.png';
import profile_icon from '../../assets/profile_icon.png';

const PAGE_TITLES = {
    '/': 'Analytics',
    '/donors': 'Donors',
    '/donations': 'Donations',
    '/inventory': 'Inventory',
    '/bloodRequests': 'Blood Requests',
    '/facilities': 'Facilities'
};

export default function Header() {
    const [showNotifications, setShowNotifications] = useState(false);
    const notifRef = useRef();
    const location = useLocation();

    useEffect(() => {
        function handleClickOutside(event) {
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setShowNotifications(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Get the title based on the current path
    const title = PAGE_TITLES[location.pathname] || '';

    return (
        <div className="flex h-16 justify-between items-center relative">
            <div style={{color: "#807C7C"}} className='font-inter font-semibold text-[24px] '>{title}</div>
            <div className='flex gap-2 items-center mr-2'>
                <div className="relative" ref={notifRef}>
                    <img
                        src={notifications_icon}
                        alt="Notifications icon"
                        className="w-[20px] h-[20px] cursor-pointer"
                        onClick={() => setShowNotifications((v) => !v)}
                    />
                    {showNotifications && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg z-10 p-4">
                            <div className="font-inter font-medium mb-2">Notifications</div>
                            <div>No new notifications.</div>
                        </div>
                    )}
                </div>
                <img src={profile_icon} alt="Profile icon" className="w-[20px] h-[20px]" />
            </div>
        </div>
    )
}