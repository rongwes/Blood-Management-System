import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RecentBloodRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/api/blood-requests/with-facility')
      .then(response => {
        if (response.data && response.data.requests) {
          // Transform the data to match the component's expected format
          const formattedRequests = response.data.requests.map(req => ({
            id: req.id,
            facility: req.facility_name,
            bloodType: req.blood_type,
            status: req.status || 'pending',
            date: req.request_date.split('T')[0], // Format the date to YYYY-MM-DD
          }));
          setRequests(formattedRequests);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blood requests:', error);
        setError('Failed to load blood requests data');
        setLoading(false);
      });
  }, []);

  function getStatusStyles(status) {
    if (status === "pending") {
      return "bg-[#FFF1DD] text-[#EF9415]";
    }
    if (status === "processing") {
      return "bg-[#C9D8FF] text-[#0A2C81]";
    }
    if (status === "fulfilled") {
      return "bg-[#DDFFF0] text-[#0A813B]";
    }
    return "";
  }

  const headerStyle = { color: "#F5F5F5", fontFamily: "Inter", fontWeight: 500, fontSize: 11 };
  const cellStyle = { color: "#807C7C", fontFamily: "Inter", fontWeight: 500, fontSize: 9 };

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full mt-8 overflow-x-auto">
      <div className="font-inter font-semibold text-[20px] text-[#686868] mb-4">Recent Blood Requests</div>
      <table className="min-w-full bg-white border border-gray-200 rounded">
        <thead>
          <tr style={{ background: "#272727" }}>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Request ID</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Facility</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Blood Type</th>
            <th className="px-4 py-2 text-left border-b border-gray-200 border-r border-gray-200" style={headerStyle}>Status</th>
            <th className="px-4 py-2 text-left border-b border-gray-200" style={headerStyle}>Date</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id} className="hover:bg-[#CFCDCD]">
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{req.id}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{req.facility}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>{req.bloodType}</td>
              <td className="px-4 py-2 border-b border-gray-200 border-r border-gray-200" style={cellStyle}>
                <span className={`px-3 py-1 font-semibold rounded ${getStatusStyles(req.status)}`}>
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-2 border-b border-gray-200" style={cellStyle}>{req.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}