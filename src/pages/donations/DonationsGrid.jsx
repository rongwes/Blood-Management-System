import React, { useState, useEffect } from 'react'
import axios from 'axios'
import total_donations_icon from "../../assets/total_donations_icon.png" 
import avg_units_icon from "../../assets/avg_units_icon.png" 
import units_collected_icon from "../../assets/units_collected_icon.png" 

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
    const [donationsStats, setDonationsStats] = useState({
        totalDonations: 0,
        unitsCollected: 0,
        avgUnitsPerDonation: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all donations data
        axios.get('/api/donations')
            .then(response => {
                const donations = response.data.donations;
                if (donations && donations.length > 0) {
                    // Calculate total donations count
                    const totalDonations = donations.length;
                    
                    // Calculate total units collected
                    const unitsCollected = donations.reduce((sum, donation) => 
                        sum + (donation.unit_donated || 0), 0);
                    
                    // Calculate average units per donation
                    const avgUnitsPerDonation = totalDonations > 0 
                        ? Math.round((unitsCollected / totalDonations) * 10) / 10 
                        : 0;
                    
                    setDonationsStats({
                        totalDonations,
                        unitsCollected,
                        avgUnitsPerDonation
                    });
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching donations:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='flex flex-row gap-1 w-full justify-evenly'>
            <Card 
                title="Total donations" 
                value={loading ? "Loading..." : donationsStats.totalDonations} 
                icon={total_donations_icon} 
            />
            <Card 
                title="Units collected" 
                value={loading ? "Loading..." : donationsStats.unitsCollected} 
                icon={units_collected_icon} 
            />
            <Card 
                title="Average units per donation" 
                value={loading ? "Loading..." : donationsStats.avgUnitsPerDonation} 
                icon={avg_units_icon} 
            />
        </div>
    )
}