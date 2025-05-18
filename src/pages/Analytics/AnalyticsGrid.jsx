import React from "react";

// Will be replaced with real logic 
function getTotalDonors() {
    return 1256;
}
function getBloodUnits() {
    return 4589;
}
function getPendingRequests() {
    return 24;
}
function getDonorsChange() {
    return { percent: 12, positive: true, label: "from last month" };
}
function getUnitsChange() {
    return { percent: 5, positive: true, label: "from last month" };
}
function getPendingChange() {
    return { percent: 15, positive: false, label: "from yesterday" };
}

export default function AnalyticsGrid() {
    const totalDonors = getTotalDonors();
    const bloodUnits = getBloodUnits();
    const pendingRequests = getPendingRequests();
    const donorsChange = getDonorsChange();
    const unitsChange = getUnitsChange();
    const pendingChange = getPendingChange();

    return (
        <div className='flex gap-6 w-full justify-evenly bg-[#F5F5F5] py-6'>
            <BoxWrapper>
                <div className="flex flex-col items-start w-full">
                    <div className="font-inter font-semibold text-[22px] text-[#686868] mb-1 pl-6">Total Donors</div>
                    <div className="font-inter font-bold text-[36px] text-[#FF7171] mb-1">{totalDonors.toLocaleString()}</div>
                    <div className="font-inter text-[15px] text-[#686868] mb-2">Registered Donors</div>
                    <div className="flex items-center text-[13px] font-inter font-medium" style={{ color: "#0A813B" }}>
                        <span className="mr-1">{donorsChange.positive ? "↑" : "↓"} {donorsChange.percent}%</span>
                        <span className="text-[#686868] font-normal">{donorsChange.label}</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="flex flex-col items-start w-full">
                    <div className="font-inter font-semibold text-[22px] text-[#686868] mb-1 pl-6">Blood Units</div>
                    <div className="font-inter font-bold text-[36px] text-[#FF7171] mb-1">{bloodUnits.toLocaleString()}</div>
                    <div className="font-inter text-[15px] text-[#686868] mb-2">Available Units</div>
                    <div className="flex items-center text-[13px] font-inter font-medium" style={{ color: "#0A813B" }}>
                        <span className="mr-1">{unitsChange.positive ? "↑" : "↓"} {unitsChange.percent}%</span>
                        <span className="text-[#686868] font-normal">{unitsChange.label}</span>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="flex flex-col items-start w-full">
                    <div className="font-inter font-semibold text-[22px] text-[#686868] mb-1 pl-6">Pending Requests</div>
                    <div className="font-inter font-bold text-[36px] text-[#FF7171] mb-1">{pendingRequests}</div>
                    <div className="font-inter text-[15px] text-[#686868] mb-2">Awaiting processing</div>
                    <div className="flex items-center text-[13px] font-inter font-medium" style={{ color: "#A259FF" }}>
                        <span className="mr-1">{pendingChange.positive ? "↑" : "↓"} {pendingChange.percent}%</span>
                        <span className="text-[#686868] font-normal">{pendingChange.label}</span>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    )
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