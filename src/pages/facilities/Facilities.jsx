import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Filter } from 'lucide-react';

export default function Facilities() {
  // State for facilities data and loading status
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterByProvince, setFilterByProvince] = useState('');
  
  // Fetch facilities data from the API
  useEffect(() => {
    setLoading(true);
    axios.get('/api/facilities/details')
      .then(response => {
        // Format the facility data for display
        const formattedFacilities = response.data.map(facility => ({
          id: facility.id || 'Unknown',
          name: facility.name || 'Unknown',
          province: facility.province || 'Unknown',
          telephone: facility.primary_number || 'N/A',
          practiceNo: facility.pcn || 'N/A'
        }));
        setFacilities(formattedFacilities);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching facilities:', err);
        setError('Failed to load facilities data');
        setLoading(false);
      });
  }, []);
  
  // Extract unique provinces for filter dropdown
  const provinces = [...new Set(facilities
    .filter(facility => facility.province && facility.province !== 'Unknown')
    .map(facility => facility.province))]
    .sort();

  // Filter facilities based on search term and province filter
  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = 
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.practiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.telephone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProvince = filterByProvince === '' || facility.province === filterByProvince;
    
    return matchesSearch && matchesProvince;
  });

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle province filter change
  const handleProvinceChange = (e) => {
    setFilterByProvince(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterByProvince('');
  };

  return (
    <div className="p-6 w-full h-full bg-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-gray-900">Facilities</h1>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, ID, phone, or practice no..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Province Filter Dropdown */}
        <div className="w-full md:w-64">
          <select
            className="w-full py-2 px-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            value={filterByProvince}
            onChange={handleProvinceChange}
          >
            <option value="">All Provinces</option>
            {provinces.map(province => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={resetFilters}
          className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded shadow-sm transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>

      {/* Facilities Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-700">Loading facilities data...</div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      ) : (
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
              {filteredFacilities.length > 0 ? (
                filteredFacilities.map((facility) => (
                  <tr key={facility.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 border border-gray-200">{facility.id}</td>
                    <td className="px-6 py-4 border border-gray-200">{facility.name}</td>
                    <td className="px-6 py-4 border border-gray-200">{facility.province}</td>
                    <td className="px-6 py-4 border border-gray-200">{facility.telephone}</td>
                    <td className="px-6 py-4 border border-gray-200">{facility.practiceNo}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    {searchTerm || filterByProvince ? 'No facilities match your filters.' : 'No facilities found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}