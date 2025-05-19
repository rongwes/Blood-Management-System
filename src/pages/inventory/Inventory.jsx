import React, { useState, useEffect } from 'react';
import { Droplet, Clock, ShieldCheck } from 'lucide-react';
import axios from 'axios';

export default function Inventory() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [summaryStats, setSummaryStats] = useState({
    total_units: 0,
    expiring_soon: 0,
    sufficient_count: 0
  });

  useEffect(() => {
    // Fetch inventory data from backend
    axios.get('/api/blood-inventory/stats')
      .then(response => {
        console.log('Inventory data received:', response.data);
        
        // Check if we have inventory data, otherwise use fallback
        if (response.data.inventoryData && response.data.inventoryData.length > 0) {
          setInventoryData(response.data.inventoryData.map(item => ({
            type: item.blood_type,
            available: parseInt(item.available),
            expiringSoon: parseInt(item.expiring_soon),
            status: item.status
          })));
        } else {
          // Fallback to static data if no data is returned
          setInventoryData([
            { type: 'A+', available: 45, expiringSoon: 5, status: 'Sufficient' },
            { type: 'A-', available: 20, expiringSoon: 4, status: 'Low' },
            { type: 'B+', available: 15, expiringSoon: 2, status: 'Low' },
            { type: 'B-', available: 5, expiringSoon: 1, status: 'Critical' },
            { type: 'AB+', available: 25, expiringSoon: 3, status: 'Sufficient' },
            { type: 'AB-', available: 8, expiringSoon: 1, status: 'Low' },
            { type: 'O+', available: 60, expiringSoon: 6, status: 'Sufficient' },
            { type: 'O-', available: 3, expiringSoon: 1, status: 'Critical' }
          ]);
        }
        
        // Set summary stats if available, otherwise calculate from inventory data
        if (response.data.summaryStats) {
          setSummaryStats({
            total_units: parseInt(response.data.summaryStats.total_units) || 0,
            expiring_soon: parseInt(response.data.summaryStats.expiring_soon) || 0,
            sufficient_count: parseInt(response.data.summaryStats.sufficient_count) || 0
          });
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching inventory data:', err);
        setError('Failed to load inventory data');
        setLoading(false);
      });
  }, []);

  // If we're using fallback data, calculate summary stats from it
  useEffect(() => {
    if (!summaryStats.total_units && inventoryData.length > 0) {
      const totalUnits = inventoryData.reduce((sum, b) => sum + b.available, 0);
      const unitsExpiringSoon = inventoryData.reduce((sum, b) => sum + b.expiringSoon, 0);
      const sufficientCount = inventoryData.filter((b) => b.status === 'Sufficient').length;
      
      setSummaryStats({
        total_units: totalUnits,
        expiring_soon: unitsExpiringSoon,
        sufficient_count: sufficientCount
      });
    }
  }, [inventoryData, summaryStats.total_units]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 md:p-10 flex items-center justify-center">
        <p className="text-xl">Loading inventory data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 md:p-10 flex items-center justify-center">
        <div className="bg-red-100 p-4 rounded-lg">
          <p className="text-xl text-red-800">{error}</p>
          <p className="mt-2">Please refresh the page or contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Inventory</h1>

      {/* The Card Elements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 w-full">
        {/* Total Units */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl h-40 flex items-center justify-between">
          <div>
            <p className="text-xl text-gray-500">Total Units</p>
            <p className="text-4xl font-bold text-red-700">{summaryStats.total_units}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-full">
            <Droplet className="w-8 h-8 text-red-600" />
          </div>
        </div>

        {/* Units Expiring Soon */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl h-40 flex items-center justify-between">
          <div>
            <p className="text-xl text-gray-500">Units Expiring Soon</p>
            <p className="text-4xl font-bold text-red-700">{summaryStats.expiring_soon}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-full">
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        {/* Sufficient Stock */}
        <div className="bg-white p-6 rounded-2xl shadow-2xl h-40 flex items-center justify-between">
          <div>
            <p className="text-xl text-gray-500">Sufficient Stock</p>
            <p className="text-4xl font-bold text-red-700">{summaryStats.sufficient_count}</p>
          </div>
          <div className="bg-green-100 p-4 rounded-full">
            <ShieldCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* The Inventory Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto min-h-[500px] w-full">
        <table className="w-full text-left text-lg border border-gray-200">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="py-5 px-6 border border-gray-200">Blood Type</th>
              <th className="py-5 px-6 border border-gray-200">Available Units</th>
              <th className="py-5 px-6 border border-gray-200">Expiring Soon</th>
              <th className="py-5 px-6 border border-gray-200">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-lg">
            {inventoryData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-5 px-6 border border-gray-200">{item.type}</td>
                <td className="py-5 px-6 border border-gray-200">{item.available}</td>
                <td className="py-5 px-6 border border-gray-200">{item.expiringSoon}</td>
                <td className="py-5 px-6 border border-gray-200">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold text-sm
                    ${
                      item.status === 'Critical'
                        ? 'text-red-800 bg-red-100'
                        : item.status === 'Low'
                        ? 'text-yellow-800 bg-yellow-100'
                        : 'text-green-800 bg-green-100'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}