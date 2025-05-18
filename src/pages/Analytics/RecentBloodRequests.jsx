import React from "react";

const requests = [
  {
    id: "RQ001",
    facility: "Johannesburg Hospital",
    bloodType: "A+",
    status: "pending",
    date: "2025-05-10",
  },
  {
    id: "RQ002",
    facility: "Pretoria Clinic",
    bloodType: "O-",
    status: "processing",
    date: "2025-05-11",
  },
  {
    id: "RQ003",
    facility: "Cape Town Medical",
    bloodType: "B+",
    status: "fulfilled",
    date: "2025-05-12",
  },
];

function getStatusStyles(status) {
  if (status === "pending") {
    return "bg-[#FFF1DD] text-[#EF9415]";
  }
  if (status === "processing") {
    return "bg-[#C9D8FF] text-[#0A2C81]";
  }
  if (status === "fulfilled") {
    return "bg-[#DDFFF0] text-[#0A813B]";
  }
  return "";
}

const headerStyle = { color: "#F5F5F5", fontFamily: "Inter", fontWeight: 500, fontSize: 11 };
const cellStyle = { color: "#807C7C", fontFamily: "Inter", fontWeight: 500, fontSize: 9 };

export default function RecentBloodRequests() {
  return (
    <div className="w-full mt-8 overflow-x-auto">
      <div className="font-inter font-semibold text-[20px] text-[#686868] mb-4">Recent Blood Requests</div>
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr style={{ background: "#272727" }}>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Request ID</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Facility</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Blood Type</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Status</th>
            <th className="px-4 py-2 text-left border-b border-gray-200" style={headerStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-[#CFCDCD]">
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{req.id}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{req.facility}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{req.bloodType}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>
                <span className={`px-3 py-1 font-semibold rounded ${getStatusStyles(req.status)}`}>
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-2 border-b border-gray-200" style={cellStyle}>{req.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

