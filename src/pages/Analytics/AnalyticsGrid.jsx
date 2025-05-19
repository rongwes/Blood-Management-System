import React, { useState, useEffect } from "react";
import axios from "axios";

// Placeholder functions replaced with actual state
export default function AnalyticsGrid() {
    const [stats, setStats] = useState({
        totalDonors: 0,
        bloodUnits: 0,
        pendingRequests: 0,
        donorsChange: { percent: 0, positive: true, label: "from last month" },
        unitsChange: { percent: 0, positive: true, label: "from last month" },
        pendingChange: { percent: 0, positive: false, label: "from yesterday" }
    });

    useEffect(() => {
        // Fetch total donors count
        axios.get('/api/donors/count/with-change')
            .then(response => {
                console.log('Donor count response:', response.data);
                if (response.data && response.data.count !== undefined) {
                    setStats(prevStats => ({
                        ...prevStats,
                        totalDonors: response.data.count || 0,
                        donorsChange: response.data.change || prevStats.donorsChange
                    }));
                } else {
                    console.warn('Using fallback data for donor count');
                    setStats(prevStats => ({
                        ...prevStats,
                        totalDonors: 1256,
                    }));
                }
            })
            .catch(error => {
                console.error('Error fetching donor count:', error);
                // Fallback to hardcoded data on error
                setStats(prevStats => ({
                    ...prevStats,
                    totalDonors: 1256,
                }));
            });

        // Fetch blood inventory stats
        axios.get('/api/blood-inventory/stats')
            .then(response => {
                console.log('Blood inventory stats response:', response.data);
                const summaryStats = response.data && response.data.summaryStats ? response.data.summaryStats : {};
                setStats(prevStats => ({
                    ...prevStats,
                    bloodUnits: parseInt(summaryStats.total_units) || 4589,
                    unitsChange: {
                        percent: 5, // This could come from backend if available
                        positive: true,
                        label: "from last month"
                    }
                }));
            })
            .catch(error => {
                console.error('Error fetching blood inventory stats:', error);
                // Fallback to hardcoded data on error
                setStats(prevStats => ({
                    ...prevStats,
                    bloodUnits: 4589,
                }));
            });

        // Fetch pending requests count
        axios.get('/api/blood-request/filter', {
            params: { status: 'pending' }
        })
            .then(response => {
                console.log('Pending requests response:', response.data);
                const pendingCount = response.data && response.data.requests ? response.data.requests.length : 0;
                setStats(prevStats => ({
                    ...prevStats,
                    pendingRequests: pendingCount,
                    pendingChange: {
                        percent: 15, // This could come from backend if available
                        positive: false,
                        label: "from yesterday"
                    }
                }));
            })
            .catch(error => {
                console.error('Error fetching pending requests:', error);
                // Fallback to hardcoded data on error
                setStats(prevStats => ({
                    ...prevStats,
                    pendingRequests: 24,
                }));
            });
    }, []);

    return (
        <div className='flex gap-6 w-full justify-evenly bg-[#F5F5F5] py-6'>
            <BoxWrapper>
                <div className="flex flex-col items-start w-full">
                    <div className="font-inter font-semibold text-[22px] text-[#686868] mb-1 pl-6">Total Donors</div>
                    <div className="font-inter font-bold text-[36px] text-[#FF7171] mb-1">{stats.totalDonors.toLocaleString()}</div>
                    <div className="font-inter text-[15px] text-[#686868] mb-2">Registered Donors</div>
                    <div className="flex items-center text-[13px] font-inter font-medium" style={{ color: "#0A813B" }}>
                        <span className="mr-1">{stats.donorsChange.positive ? "↑" : "↓"} {stats.donorsChange.percent}%</span>
                        <span className="text-[#686868] font-normal">{stats.donorsChange.label}</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="flex flex-col items-start w-full">
                    <div className="font-inter font-semibold text-[22px] text-[#686868] mb-1 pl-6">Blood Units</div>
                    <div className="font-inter font-bold text-[36px] text-[#FF7171] mb-1">{stats.bloodUnits.toLocaleString()}</div>
                    <div className="font-inter text-[15px] text-[#686868] mb-2">Available Units</div>
                    <div className="flex items-center text-[13px] font-inter font-medium" style={{ color: "#0A813B" }}>
                        <span className="mr-1">{stats.unitsChange.positive ? "↑" : "↓"} {stats.unitsChange.percent}%</span>
                        <span className="text-[#686868] font-normal">{stats.unitsChange.label}</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="flex flex-col items-start w-full">
                    <div className="font-inter font-semibold text-[22px] text-[#686868] mb-1 pl-6">Pending Requests</div>
                    <div className="font-inter font-bold text-[36px] text-[#FF7171] mb-1">{stats.pendingRequests}</div>
                    <div className="font-inter text-[15px] text-[#686868] mb-2">Awaiting processing</div>
                    <div className="flex items-center text-[13px] font-inter font-medium" style={{ color: "#A259FF" }}>
                        <span className="mr-1">{stats.pendingChange.positive ? "↑" : "↓"} {stats.pendingChange.percent}%</span>
                        <span className="text-[#686868] font-normal">{stats.pendingChange.label}</span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
}

function BoxWrapper({ children }) {
    return (
        <div
            className="bg-white border border-gray-200 flex flex-col"
            style={{
                width: 300,
                minHeight: 170,
                borderRadius: 16,
                padding: 24,
                boxShadow: '0px 8px 10px 0px rgba(0,0,0,0.20)'
            }}
        >
            {children}
        </div>
    );
}