import React from 'react'
import total_donations_icon from "../../assets/total_donations_icon.png" 
import avg_units_icon from "../../assets/avg_units_icon.png" 
import units_collected_icon from "../../assets/units_collected_icon.png" 

// Will be replaced with real logic 
function getTotalDonations() {
    return 1120;
}

function getUnitsCollected() {
    return 589;
}

function getAverageUnitsPerDonation() {
    return 1;
}

function Card({ title, value, icon }) {
    return (
        <div
            className="bg-white border border-gray-200 flex items-center p-4"
            style={{
                width: 285,
                height: 80,
                borderRadius: 10,
                boxShadow: "0px 4px 5px 0px rgba(0,0,0,0.10)"
            }}
        >
            <div className="flex flex-col flex-1">
                <span className="font-inter font-semibold text-[15px] text-[#686868]">{title}</span>
                <span className="font-inter font-bold text-[20px] text-[#FF7171]">{value}</span>
            </div>
            <img src={icon} alt={title + " icon"} className="w-[25px] h-[25px]" />
        </div>
    );
}

export default function DonationsGrid() {
    return (
        <div className='flex flex-row gap-1 w-full justify-evenly'>
            <Card title="Total donations" value={getTotalDonations()} icon={total_donations_icon} />
            <Card title="Units collected" value={getUnitsCollected()} icon={units_collected_icon} />
            <Card title="Average units per donation" value={getAverageUnitsPerDonation()} icon={avg_units_icon} />
        </div>
    )
}