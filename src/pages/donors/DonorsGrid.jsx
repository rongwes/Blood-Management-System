import React from 'react'
import total_donors_icon from "../../assets/total_donors_icon.png" 
import common_bt_icon from "../../assets/common_bt_icon.png" 
import new_donors_icon from "../../assets/new_donors_icon.png" 

// Will be replaced with real logic 
function getTotalDonors() {
    return 1234;
}

function getNewDonorsThisMonth() {
    return 567;
}

function getMostCommonBloodTypeCount() {
    return 'O+';
}

function Card({ title, value, icon }) {
    return (
        <div
            className="bg-white border border-gray-200 flex items-center p-4"
            style={{
                width: 285,
                height: 105,
                borderRadius: 16,
                boxShadow: "0px 8px 10px 0px rgba(0,0,0,0.20)"
            }}
        >
            <div className="flex flex-col flex-1">
                <span className="font-inter font-semibold text-[20px] text-[#686868] pl-3">{title}</span>
                <span className="font-inter font-bold text-[32px] text-[#FF7171]">{value}</span>
            </div>
            <img src={icon} alt={title + " icon"} className="w-[50px] h-[50px]" />
        </div>
    );
}

export default function DonorsGrid() {
    return (
        <div className='flex flex-row gap-1 w-full justify-evenly'>
            <Card title="Total donors" value={getTotalDonors()} icon={total_donors_icon} />
            <Card title="New Donors This Month" value={getNewDonorsThisMonth()} icon={new_donors_icon} />
            <Card title="Most Common Blood Type" value={getMostCommonBloodTypeCount()} icon={common_bt_icon} />
        </div>
    )
}