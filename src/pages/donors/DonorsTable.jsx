import React, { useState, useEffect } from 'react';

// Mock fetch function for testing
const fetchDonors = async () => [
    {
    id: 'D0101',
    name: 'Thabo Mosia',
    bloodType: 'A-',
    lastDonation: '2025-04-23',
    eligibility: 'Eligible',
    date: '2025-07-23',
  },
  
    {
    id: 'D0102',
    name: 'Lerato Ndaba',
    bloodType: 'A+',
    lastDonation: '2025-04-22',
    eligibility: 'Eligible',
    date: '2025-07-22',
  },
  {
    id: 'D0103',
    name: 'Ntando Moloto',
    bloodType: 'B+',
    lastDonation: '2025-04-20',
    eligibility: 'Eligible',
    date: '2025-07-20',
  },
  {
    id: 'D0104',
    name: 'Jane Smith',
    bloodType: 'AB-',
    lastDonation: '2025-04-18',
    eligibility: 'Eligible',
    date: '2025-07-18',
  },
  {
    id: 'D0105',
    name: 'John Doe',
    bloodType: 'A-',
    lastDonation: '2025-04-17',
    eligibility: 'Eligible',
    date: '2025-07-17',
  },
  {
    id: 'D0106',
    name: 'Afrika Mashishi',
    bloodType: 'O+',
    lastDonation: '2025-02-23',
    eligibility: 'Eligible',
    date: '2025-06-23',
  },
  {
    id: 'D0107',
    name: 'Thabo Mosia',
    bloodType: 'A-',
    lastDonation: '2025-04-23',
    eligibility: 'Eligible',
    date: '2025-07-23',
  },
  
    {
    id: 'D0108',
    name: 'Lerato Ndaba',
    bloodType: 'A+',
    lastDonation: '2025-04-22',
    eligibility: 'Eligible',
    date: '2025-07-22',
  },
  {
    id: 'D0109',
    name: 'Ntando Moloto',
    bloodType: 'B+',
    lastDonation: '2025-04-20',
    eligibility: 'Eligible',
    date: '2025-07-20',
  },
  {
    id: 'D0110',
    name: 'Jane Smith',
    bloodType: 'AB-',
    lastDonation: '2025-04-18',
    eligibility: 'Eligible',
    date: '2025-07-18',
  },
  {
    id: 'D0111',
    name: 'John Doe',
    bloodType: 'A-',
    lastDonation: '2025-04-17',
    eligibility: 'Eligible',
    date: '2025-07-17',
  },
  {
    id: 'D0112',
    name: 'Afrika Mashishi',
    bloodType: 'O+',
    lastDonation: '2025-02-23',
    eligibility: 'Eligible',
    date: '2025-06-23',
  },
];

export default function DonorsTable() {
  const [donors, setDonors] = useState([]);
  const [selectedDonor, setSelectedDonor] = useState(null);

  useEffect(() => {
    // fetch logic
    fetchDonors().then(setDonors);
  }, []);

  return (
    <div className="w-full mt-8 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr style={{ background: '#272727' }}>
            <th className="px-4 py-2 text-left border-r border-gray-200" style={{ color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>Donor ID</th>
            <th className="px-4 py-2 text-left border-r border-gray-200" style={{ color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>Donor Name</th>
            <th className="px-4 py-2 text-left border-r border-gray-200" style={{ color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>Blood Type</th>
            <th className="px-4 py-2 text-left border-r border-gray-200" style={{ color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>Last Donation Date</th>
            <th className="px-4 py-2 text-left border-r border-gray-200" style={{ color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>Eligibility</th>
            <th className="px-4 py-2 text-left border-r border-gray-200" style={{ color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>Date</th>
            <th className="px-4 py-2 text-left border-b border-gray-200" style={{ color: '#F5F5F5', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {donors.map((donor) => (
            <tr key={donor.id} className="hover:bg-[#CFCDCD]">
              <td className="px-4 py-2 border-r border-gray-200 border-b border-gray-200" style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>{donor.id}</td>
              <td className="px-4 py-2 border-r border-gray-200 border-b border-gray-200" style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>{donor.name}</td>
              <td className="px-4 py-2 border-r border-gray-200 border-b border-gray-200" style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>{donor.bloodType}</td>
              <td className="px-4 py-2 border-r border-gray-200 border-b border-gray-200" style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>{donor.lastDonation}</td>
              <td className="px-4 py-2 border-r border-gray-200 border-b border-gray-200" style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>{donor.eligibility}</td>
              <td className="px-4 py-2 border-r border-gray-200 border-b border-gray-200" style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13 }}>{donor.date}</td>
              <td className="px-4 py-2 border-b border-gray-200">
                <button
                  style={{ color: '#807C7C', fontFamily: 'Inter', fontWeight: 500, fontSize: 13, background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => setSelectedDonor(donor)}
                >
                  <span className='text-[#5199ED]'>View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {selectedDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 min-w-[300px] shadow-lg">
            <h2 className="font-bold text-lg mb-4">Donor Details</h2>
            <div className="mb-2"><b>ID:</b> {selectedDonor.id}</div>
            <div className="mb-2"><b>Name:</b> {selectedDonor.name}</div>
            <div className="mb-2"><b>Blood Type:</b> {selectedDonor.bloodType}</div>
            <div className="mb-2"><b>Last Donation:</b> {selectedDonor.lastDonation}</div>
            <div className="mb-2"><b>Eligibility:</b> {selectedDonor.eligibility}</div>
            <div className="mb-2"><b>Date:</b> {selectedDonor.date}</div>
            <button
              className="mt-4 px-4 py-2 bg-[#CFCDCD] text-white rounded"
              onClick={() => setSelectedDonor(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}