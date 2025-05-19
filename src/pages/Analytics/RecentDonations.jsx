import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RecentDonations() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/donations/details')
      .then(response => {
        console.log('Donations response:', response.data);
        if (response.data && response.data.donations) {
          // Transform the data to match the component's expected format
          const formattedDonations = response.data.donations.map(donation => ({
            id: donation.donation_id || donation.id,
            donor: `${donation.donor_name || ''} ${donation.donor_surname || ''}`.trim(),
            bloodType: donation.blood_type,
            assistedBy: `${donation.employee_first_name || ''} ${donation.employee_last_name || ''}`.trim(),
            date: donation.donation_date ? donation.donation_date.split('T')[0] : '',
            unitDonated: donation.unit_donated
          }));
          setDonations(formattedDonations);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching donations:', error);
        setError('Failed to load donation data');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (donations.length > 0) {
      console.log('Donations loaded:', donations[0]);
    }
  }, [donations]);

  const headerStyle = { background: "#DBDBDB", color: "#807C7C", fontFamily: "Inter", fontWeight: 600, fontSize: 11 };
  const cellStyle = { color: "#686868", fontFamily: "Inter", fontWeight: 500, fontSize: 9 };

  if (loading) return <div>Loading donations...</div>;
  if (error) return <div>{error}</div>;

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
            <div className="mb-2"><b>Units Donated:</b> {selectedDonation.unitDonated || 'N/A'}</div>
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