import React, { useState, useEffect } from 'react'
import axios from 'axios'
import total_donors_icon from "../../assets/total_donors_icon.png" 
import common_bt_icon from "../../assets/common_bt_icon.png" 
import new_donors_icon from "../../assets/new_donors_icon.png" 

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

export default function DonorsGrid() {
    const [donorsStats, setDonorsStats] = useState({
        totalDonors: 0,
        newDonorsThisMonth: 0,
        mostCommonBloodType: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all donors
        axios.get('/api/donors')
            .then(response => {
                const donors = response.data.donors;
                
                if (donors && donors.length > 0) {
                    // Calculate total donors
                    const totalDonors = donors.length;
                    
                    // Calculate new donors this month
                    const currentDate = new Date();
                    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                    
                    const newDonorsThisMonth = donors.filter(donor => {
                        const createdAt = new Date(donor.created_at);
                        return createdAt >= firstDayOfMonth;
                    }).length;
                    
                    // Calculate most common blood type
                    const bloodTypeCounts = {};
                    donors.forEach(donor => {
                        if (donor.blood_type) {
                            bloodTypeCounts[donor.blood_type] = (bloodTypeCounts[donor.blood_type] || 0) + 1;
                        }
                    });
                    
                    let mostCommonBloodType = '';
                    let highestCount = 0;
                    
                    Object.entries(bloodTypeCounts).forEach(([bloodType, count]) => {
                        if (count > highestCount) {
                            mostCommonBloodType = bloodType;
                            highestCount = count;
                        }
                    });
                    
                    setDonorsStats({
                        totalDonors,
                        newDonorsThisMonth,
                        mostCommonBloodType
                    });
                }
                
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching donors:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className='flex flex-row gap-1 w-full justify-evenly'>
            <Card 
                title="Total donors" 
                value={loading ? "Loading..." : donorsStats.totalDonors} 
                icon={total_donors_icon} 
            />
            <Card 
                title="New Donors This Month" 
                value={loading ? "Loading..." : donorsStats.newDonorsThisMonth} 
                icon={new_donors_icon} 
            />
            <Card 
                title="Most Common Blood Type" 
                value={loading ? "Loading..." : donorsStats.mostCommonBloodType} 
                icon={common_bt_icon} 
            />
        </div>
    )
}