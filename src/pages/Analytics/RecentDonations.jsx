import React, { useState } from "react";

const donations = [
  {
    id: "DON-2025-0432",
    donor: "Thabo Mosia",
    bloodType: "A-",
    assistedBy: "Dr. James London",
    date: "2025-04-23",
  },
  {
    id: "DON-2025-0431",
    donor: "Lerato Ndaba",
    bloodType: "A+",
    assistedBy: "Nurse Maria Garcia",
    date: "2025-04-22",
  },
  {
    id: "DON-2025-0430",
    donor: "Ntando Moloto",
    bloodType: "B+",
    assistedBy: "Dr. Emily Chen",
    date: "2025-04-20",
  },
  {
    id: "DON-2025-0429",
    donor: "Jane Smith",
    bloodType: "AB-",
    assistedBy: "Nurse Kitso Omang",
    date: "2025-04-18",
  },
  {
    id: "DON-2025-0428",
    donor: "John Doe",
    bloodType: "A-",
    assistedBy: "Nurse Maria Garcia",
    date: "2025-04-17",
  },
];

const headerStyle = { background: "#DBDBDB", color: "#807C7C", fontFamily: "Inter", fontWeight: 600, fontSize: 11 };
const cellStyle = { color: "#686868", fontFamily: "Inter", fontWeight: 500, fontSize: 9 };

export default function RecentDonations() {
  const [selectedDonation, setSelectedDonation] = useState(null);

  return (
    <div className="w-full mt-8 overflow-x-auto">
      <div className="font-inter font-semibold text-[20px] text-[#686868] mb-4">Recent Donations</div>
      <table className="min-w-full bg-[#F5F5F5] border border-gray-200 rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Donation ID</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Donor</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Blood Type</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Assisted by</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Date</th>
            <th className="px-4 py-2 text-left border-b border-gray-200" style={headerStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id} className="hover:bg-[#E9E9E9]">
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.id}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.donor}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.bloodType}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.assistedBy}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.date}</td>
              <td className="px-4 py-2 border-b border-gray-200" style={cellStyle}>
                <button
                  style={{
                    color: "#5199ED",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: 14,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedDonation(donation)}
                >
                  <span style={{fontSize:9}}>View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 min-w-[300px] shadow-lg">
            <h2 className="font-bold text-lg mb-4">Donation Details</h2>
            <div className="mb-2"><b>Donation ID:</b> {selectedDonation.id}</div>
            <div className="mb-2"><b>Donor:</b> {selectedDonation.donor}</div>
            <div className="mb-2"><b>Blood Type:</b> {selectedDonation.bloodType}</div>
            <div className="mb-2"><b>Assisted by:</b> {selectedDonation.assistedBy}</div>
            <div className="mb-2"><b>Date:</b> {selectedDonation.date}</div>
            <button
              className="mt-4 px-4 py-2 bg-[#CFCDCD] text-white rounded"
              onClick={() => setSelectedDonation(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}