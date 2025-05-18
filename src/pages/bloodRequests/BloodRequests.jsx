import React, { useState } from 'react';
import { Calendar } from 'lucide-react'; 

export default function BloodRequests() {
  const [filters, setFilters] = useState({
    dateRange: '30-Apr-2025 - 30-May-2025',
    bloodType: 'All Blood Types',
    facility: 'All Facilities',
  });

  const requestData = [
    {
      id: 'REQ-2025-0430',
      facility: 'St. Mary’s Hospital',
      bloodType: 'O+',
      status: 'Fulfilled',
      date: '30-Apr-2025',
    },
    {
      id: 'REQ-2025-0501',
      facility: 'Green Valley Clinic',
      bloodType: 'A-',
      status: 'Pending',
      date: '01-May-2025',
    },
    {
      id: 'REQ-2025-0503',
      facility: 'City Medical Center',
      bloodType: 'B+',
      status: 'Processing',
      date: '03-May-2025',
    },
    {
      id: 'REQ-2025-0504',
      facility: 'Hope Health Hospital',
      bloodType: 'AB-',
      status: 'Fulfilled',
      date: '04-May-2025',
    },
    {
      id: 'REQ-2025-0505',
      facility: 'General Hospital',
      bloodType: 'O-',
      status: 'Pending',
      date: '05-May-2025',
    },
    {
      id: 'REQ-2025-0506',
      facility: 'Sunrise Clinic',
      bloodType: 'A+',
      status: 'Processing',
      date: '06-May-2025',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Fulfilled':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Processing':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Blood Requests</h1>

 {/* The Filter Dropdowns */}
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
  <div className="flex flex-col min-w-[200px]">
    <label className="text-gray-700 text-sm font-medium mb-1">Date Range</label>
    <select
      value={filters.dateRange}
      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
      className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option>30-Apr-2025 - 30-May-2025</option>
      <option>01-Apr-2025 - 30-Apr-2025</option>
      <option>01-May-2025 - 15-May-2025</option>
    </select>
   </div>

   <div className="flex flex-col min-w-[200px]">
    <label className="text-gray-700 text-sm font-medium mb-1">Blood Type</label>
     <select
      value={filters.bloodType}
      onChange={(e) => setFilters({ ...filters, bloodType: e.target.value })}
      className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
     >
       <option>All Blood Types</option>
       <option>O+</option>
       <option>O-</option>
       <option>A+</option>
       <option>A-</option>
       <option>B+</option>
       <option>B-</option>
       <option>AB+</option>
       <option>AB-</option>
     </select>
   </div>

   <div className="flex flex-col min-w-[200px]">
    <label className="text-gray-700 text-sm font-medium mb-1">Facility</label>
     <select
       value={filters.facility}
       onChange={(e) => setFilters({ ...filters, facility: e.target.value })}
       className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option>All Facilities</option>
        <option>St. Mary’s Hospital</option>
        <option>Green Valley Clinic</option>
        <option>City Medical Center</option>
        <option>Hope Health Hospital</option>
        <option>General Hospital</option>
        <option>Sunrise Clinic</option>
      </select>
     </div>
  </div>


      {/* The Blood requests Table */} 
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Request ID</th>
              <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Facility</th>
              <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Blood Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Status</th>
              <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Date</th>
            </tr>
          </thead>
          <tbody>
            {requestData.map((req) => (
              <tr key={req.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border border-gray-200">{req.id}</td>
                <td className="px-6 py-4 border border-gray-200">{req.facility}</td>
                <td className="px-6 py-4 border border-gray-200">{req.bloodType}</td>
                <td className="px-6 py-4 border border-gray-200">
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4 border border-gray-200">{req.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
