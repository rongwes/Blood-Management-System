import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Mock fetch function for testing
const fetchDonations = async () => [
  {
    id: 'DN001',
    donor: 'Thabo Mosia',
    bloodType: 'A-',
    assistedBy: 'Nurse Mokoena',
    date: '2025-07-23',
  },
  {
    id: 'DN002',
    donor: 'Lerato Ndaba',
    bloodType: 'A+',
    assistedBy: 'Nurse Dlamini',
    date: '2025-07-22',
  },
  {
    id: 'DN003',
    donor: 'Ntando Moloto',
    bloodType: 'B+',
    assistedBy: 'Nurse Mokoena',
    date: '2025-07-20',
  },
  {
    id: 'DN004',
    donor: 'Ntando Moloto',
    bloodType: 'B+',
    assistedBy: 'Nurse Mokoena',
    date: '2025-07-20',
  },
  {
    id: 'DN005',
    donor: 'Lerato Ndaba',
    bloodType: 'A+',
    assistedBy: 'Nurse Dlamini',
    date: '2025-07-22',
  },
  {
    id: 'DN006',
    donor: 'Ntando Moloto',
    bloodType: 'B+',
    assistedBy: 'Nurse Mokoena',
    date: '2025-07-20',
  },
  {
    id: 'DN007',
    donor: 'Lerato Ndaba',
    bloodType: 'A+',
    assistedBy: 'Nurse Dlamini',
    date: '2025-07-22',
  },
  {
    id: 'DN008',
    donor: 'Ntando Moloto',
    bloodType: 'B+',
    assistedBy: 'Nurse Mokoena',
    date: '2025-07-20',
  },
  {
    id: 'DN009',
    donor: 'Lerato Ndaba',
    bloodType: 'A+',
    assistedBy: 'Nurse Dlamini',
    date: '2025-07-22',
  },
  {
    id: 'DN010',
    donor: 'Ntando Moloto',
    bloodType: 'B+',
    assistedBy: 'Nurse Mokoena',
    date: '2025-07-20',
  },
  {
    id: 'DN011',
    donor: 'Lerato Ndaba',
    bloodType: 'A+',
    assistedBy: 'Nurse Dlamini',
    date: '2025-07-22',
  },
  {
    id: 'DN012',
    donor: 'Ntando Moloto',
    bloodType: 'B+',
    assistedBy: 'Nurse Mokoena',
    date: '2025-07-20',
  },
  {
    id: 'DN013',
    donor: 'Lerato Ndaba',
    bloodType: 'A+',
    assistedBy: 'Nurse Dlamini',
    date: '2025-07-22',
  },
];

const headerStyle = { color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 };
const cellStyle = { color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 };

export default function DonationsTable() {
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

  // useEffect(() => {
  //   fetchDonations().then(setDonations);
  // }, []);

      useEffect(() => {
        axios.get('/api/donations/details')
            .then(response => {
                console.log(response.data)
                setDonations(response.data.donations)
                console.log('Donations:', donations)
            })
            .catch(error => {
                console.log('Error fetching donations:', error)
            })
    },[])

    useEffect(() => {
        console.log('Donors updated:', donations[0]);
    }, [donations]);

  
  return (
    <div className="w-full mt-8 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr style={{ background: '#272727' }}>
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
            <tr key={donation.id} className="hover:bg-[#CFCDCD]">
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.donation_id}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.donor_name + ' ' + donation.donor_surname}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.blood_type}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.employee_first_name + ' ' + donation.employee_last_name}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{donation.donation_date.split('T')[0]}</td>
              <td className="px-4 py-2 border-b border-gray-200" style={cellStyle}>
                <button
                  style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => setSelectedDonation(donation)}
                >
                  <span className='text-[#5199ED]'>View</span>
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
            <div className="mb-2"><b>ID:</b> {selectedDonation.id}</div>
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

