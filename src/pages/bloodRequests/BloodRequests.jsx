import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar } from 'lucide-react';

export default function BloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [filters, setFilters] = useState({
    dateRange: '30-Apr-2025 - 30-May-2025',
    bloodType: 'All Blood Types',
    facility: 'All Facilities',
    status: 'All Statuses'
  });

  // Status options
  const statusOptions = ['All Statuses', 'Pending', 'Processing', 'Fulfilled'];
  
  // Blood type options
  const bloodTypeOptions = [
    'All Blood Types', 'O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'
  ];

  // Facilities
  const [facilities, setFacilities] = useState(['All Facilities']);

  // Date ranges
  const dateRanges = [
    '30-Apr-2025 - 30-May-2025',
    '01-Apr-2025 - 30-Apr-2025',
    '01-May-2025 - 15-May-2025'
  ];

  useEffect(() => {
    // Fetch facilities first
    fetchFacilities();
    // Then fetch blood requests
    fetchBloodRequests();
  }, [filters]); // Re-fetch when filters change

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('/api/facilities');
      if (response.data && Array.isArray(response.data)) {
        const facilityNames = ['All Facilities', ...response.data.map(f => f.name)];
        setFacilities(facilityNames);
      }
    } catch (err) {
      console.error("Error fetching facilities:", err);
      // Don't set error state here to allow the page to still load with blood requests
    }
  };

  const fetchBloodRequests = async () => {
    setLoading(true);
    try {
      // Build query parameters based on active filters
      let endpoint = '/api/blood-requests/filter?';
      const params = [];
      
      // Handle blood type filter
      if (filters.bloodType !== 'All Blood Types') {
        params.push(`blood_type=${filters.bloodType}`);
      }
      
      // Handle status filter
      if (filters.status !== 'All Statuses') {
        params.push(`status=${filters.status.toLowerCase()}`);
      }
      
      // Handle facility filter (will require backend support)
      if (filters.facility !== 'All Facilities') {
        params.push(`facility=${encodeURIComponent(filters.facility)}`);
      }
      
      // Handle date range filter (will require backend support)
      if (filters.dateRange) {
        const [startDate, endDate] = filters.dateRange.split(' - ');
        if (startDate && endDate) {
          params.push(`start_date=${encodeURIComponent(startDate)}`);
          params.push(`end_date=${encodeURIComponent(endDate)}`);
        }
      }
      
      // Add limit parameter
      params.push('limit=10');
      
      // Join all params
      endpoint += params.join('&');
      
      const response = await axios.get(endpoint);
      
      // Format the data for display
      const formattedRequests = response.data.requests.map(req => ({
        id: `REQ-${new Date(req.request_date).toISOString().split('T')[0].replace(/-/g, '')}-${req.id.substring(0, 4)}`,
        facility: req.facility_name || 'Unknown Facility',
        bloodType: req.blood_type,
        requestedUnits: req.requested_units,
        status: req.status.charAt(0).toUpperCase() + req.status.slice(1),
        date: new Date(req.request_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric'
        })
      }));
      
      setRequests(formattedRequests);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching blood requests:", err);
      setError("Failed to load blood requests. Please try again.");
      setLoading(false);
    }
  };

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

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-8 w-full h-full overflow-y-auto">
      {/* <h1 className="text-3xl font-semibold mb-6 text-gray-800">Blood Requests</h1> */}

      {/* The Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col min-w-[200px]">
          <label className="text-gray-700 text-sm font-medium mb-1">Date Range</label>
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {dateRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <label className="text-gray-700 text-sm font-medium mb-1">Blood Type</label>
          <select
            value={filters.bloodType}
            onChange={(e) => handleFilterChange('bloodType', e.target.value)}
            className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {bloodTypeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <label className="text-gray-700 text-sm font-medium mb-1">Facility</label>
          <select
            value={filters.facility}
            onChange={(e) => handleFilterChange('facility', e.target.value)}
            className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {facilities.map(facility => (
              <option key={facility} value={facility}>{facility}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col min-w-[200px]">
          <label className="text-gray-700 text-sm font-medium mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="border border-gray-300 rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading and error states */}
      {loading && <div className="text-center py-4 text-gray-600">Loading blood requests...</div>}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}

      {/* The Blood requests Table */}
      {!loading && !error && (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Request ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Facility</th>
                <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Blood Type</th>
                <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Units</th>
                <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium border border-gray-200">Date</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border border-gray-200">{req.id}</td>
                    <td className="px-6 py-4 border border-gray-200">{req.facility}</td>
                    <td className="px-6 py-4 border border-gray-200">{req.bloodType}</td>
                    <td className="px-6 py-4 border border-gray-200">{req.requestedUnits}</td>
                    <td className="px-6 py-4 border border-gray-200">
                      <span className={`text-sm px-3 py-1 rounded-full font-medium ${getStatusColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 border border-gray-200">{req.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500 border border-gray-200">
                    No blood requests found matching the current filters.
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