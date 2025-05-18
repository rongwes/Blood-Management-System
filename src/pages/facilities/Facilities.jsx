import React, { useState } from 'react';
import { Search } from 'lucide-react';

const sampleFacilities = [
  { id: 'FAC-0001', name: 'St. Mary Hospital', province: 'Gauteng', telephone: '011-234-5678', practiceNo: 'PR-1298' },
  { id: 'FAC-0002', name: 'Cape Medical Centre', province: 'Western Cape', telephone: '021-876-5432', practiceNo: 'PR-1302' },
  { id: 'FAC-0003', name: 'Durban Clinic', province: 'KwaZulu-Natal', telephone: '031-765-1234', practiceNo: 'PR-1410' },
  { id: 'FAC-0004', name: 'Polokwane General', province: 'Limpopo', telephone: '015-331-9988', practiceNo: 'PR-1110' },
  { id: 'FAC-0005', name: 'Bloem Health', province: 'Free State', telephone: '051-441-7777', practiceNo: 'PR-1501' },
  { id: 'FAC-0006', name: 'Pretoria Care', province: 'Gauteng', telephone: '012-321-4444', practiceNo: 'PR-1623' },
  { id: 'FAC-0007', name: 'Nelspruit Hospital', province: 'Mpumalanga', telephone: '013-456-8899', practiceNo: 'PR-1344' },
  { id: 'FAC-0008', name: 'Kimberley Clinic', province: 'Northern Cape', telephone: '053-845-2288', practiceNo: 'PR-1712' },
  { id: 'FAC-0009', name: 'East London Health', province: 'Eastern Cape', telephone: '043-765-4321', practiceNo: 'PR-1999' },
  { id: 'FAC-0010', name: 'George Hospital', province: 'Western Cape', telephone: '044-998-7766', practiceNo: 'PR-1015' },
  { id: 'FAC-0011', name: 'Mthatha Regional', province: 'Eastern Cape', telephone: '047-112-3344', practiceNo: 'PR-1133' },
];

export default function Facilities() {
  const [search, setSearch] = useState('');

  const filteredFacilities = sampleFacilities.filter(facility =>
    facility.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 w-full h-full bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">Facilities</h1>

      <div className="relative w-full max-w-xl mb-6">
       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
       <input
        type="text"
        placeholder="Search facility..."
        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
         />
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-3 text-left border border-gray-200">Facility ID</th>
              <th className="px-6 py-3 text-left border border-gray-200">Name</th>
              <th className="px-6 py-3 text-left border border-gray-200">Province</th>
              <th className="px-6 py-3 text-left border border-gray-200">Telephone</th>
              <th className="px-6 py-3 text-left border border-gray-200">Practice No.</th>
            </tr>
          </thead>
          <tbody>
            {filteredFacilities.map((facility) => (
              <tr key={facility.id} className="border-b">
                <td className="px-6 py-4 border border-gray-200">{facility.id}</td>
                <td className="px-6 py-4 border border-gray-200">{facility.name}</td>
                <td className="px-6 py-4 border border-gray-200">{facility.province}</td>
                <td className="px-6 py-4 border border-gray-200">{facility.telephone}</td>
                <td className="px-6 py-4 border border-gray-200">{facility.practiceNo}</td>
              </tr>
            ))}
            {filteredFacilities.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No facilities found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
