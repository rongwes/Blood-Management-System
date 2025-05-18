import React from "react";

const inventory = [
  {
    bloodType: "A+",
    availableUnits: 120,
    expiringSoon: 5,
    status: "sufficient",
  },
  {
    bloodType: "O-",
    availableUnits: 18,
    expiringSoon: 2,
    status: "low",
  },
  {
    bloodType: "B+",
    availableUnits: 4,
    expiringSoon: 1,
    status: "critical",
  },
];

function getStatusStyles(status) {
  if (status === "sufficient") {
    return "bg-[#DDFFF0] text-[#0A813B]";
  }
  if (status === "low") {
    return "bg-[#FFF1DD] text-[#EF9415]";
  }
  if (status === "critical") {
    return "bg-[#FFDDDD] text-[#E54040]";
  }
  return "";
}
const headerStyle = { color: "#F5F5F5", fontFamily: "Inter", fontWeight: 500, fontSize: 11 };
const cellStyle = { color: "#807C7C", fontFamily: "Inter", fontWeight: 500, fontSize: 9 };

export default function BloodInventoryTable() {
  return (
    <div className="w-full mt-8 overflow-x-auto">
      <div className="font-inter font-semibold text-[20px] text-[#686868] mb-4">Recent Blood Inventory</div>
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr style={{ background: "#272727" }}>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Blood Type</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Available Units</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Expiring Soon</th>
            <th className="px-4 py-2 text-left border-b border-gray-200" style={headerStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.bloodType} className="hover:bg-[#CFCDCD]">
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{item.bloodType}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{item.availableUnits}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{item.expiringSoon}</td>
              <td className="px-4 py-2 border-b border-gray-200" style={cellStyle}>
                <span className={`px-3 py-1 font-semibold rounded ${getStatusStyles(item.status)}`}>
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}