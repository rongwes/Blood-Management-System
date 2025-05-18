import React from 'react'
import { Link } from "react-router-dom";
import AnalyticsGrid from './AnalyticsGrid.jsx'
import RecentBloodRequests from './RecentBloodRequests.jsx'
import BloodInventoryTable from './BloodInventoryTable.jsx'
import RecentDonations from './RecentDonations.jsx'

export default function Analytics() {
    return (
        <div className='flex flex-col gap-6 w-full'>
            <AnalyticsGrid />
            <div className="flex gap-6 w-full">
                <div className="flex-1">
                    <RecentBloodRequests />
                </div>
                <div className="flex-1">
                    <BloodInventoryTable />
                </div>
            </div>
            <RecentDonations />
        </div>
    )
}
