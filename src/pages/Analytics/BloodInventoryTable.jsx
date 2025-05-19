import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BloodInventoryTable() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/blood-inventory/stats')
      .then(response => {
        if (response.data && response.data.inventoryData) {
          // Transform the data to match the component's expected format
          const formattedInventory = response.data.inventoryData.map(item => ({
            bloodType: item.blood_type,
            availableUnits: item.available,
            expiringSoon: item.expiring_soon,
            status: item.status ? item.status.toLowerCase() : 'sufficient',
          }));
          setInventory(formattedInventory);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blood inventory:', error);
        setError('Failed to load blood inventory data');
        setLoading(false);
      });
  }, []);

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

  if (loading) return <div>Loading inventory...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full mt-8 overflow-x-auto">
      <div className="font-inter font-semibold text-[20px] text-[#686868] mb-4">Blood Inventory</div>
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