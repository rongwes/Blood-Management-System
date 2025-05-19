import React, { useState } from 'react';

const BloodBankNotifications = () => {
  const [notifications, setNotifications] = useState([
    { message: '🩸 New blood drive scheduled for May 25th.', type: 'success' },
    { message: '⚠️ Donor Jane Smith has a borderline hemoglobin level.', type: 'warning' },
    { message: '❗ Urgent: O- blood units are below minimum stock!', type: 'error' },
  ]);

  const addDonor = () => {
    const donor = {
      name: 'John Doe',
      bloodType: 'O+',
      age: 16, // Change this to 20 to simulate a valid donor
    };

    let message = '';
    let type = 'success';

    if (donor.age < 18) {
      message = `❌ Donor ${donor.name} is underage. Cannot add.`;
      type = 'error';
    } else if (
      !['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].includes(donor.bloodType)
    ) {
      message = `⚠️ Donor ${donor.name} has an invalid blood type.`;
      type = 'warning';
    } else {
      message = `✅ New donor added: ${donor.name} (${donor.bloodType})`;
      type = 'success';
    }

    setNotifications((prev) => [{ message, type }, ...prev]);
  };

  const getColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700';
      case 'warning':
        return 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800';
      case 'error':
        return 'bg-red-100 border-l-4 border-red-500 text-red-700';
      default:
        return 'bg-gray-100 border-l-4 border-gray-400 text-gray-800';
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-2xl font-bold text-red-600 text-center mb-6">
        🩸 Blood Bank Notification Center
      </h1>

      <button
        onClick={addDonor}
        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg block mx-auto mb-8"
      >
        ➕ Add Donor
      </button>

      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">🔔 Notifications</h2>
        <ul className="space-y-3">
          {notifications.map((note, index) => (
            <li
              key={index}
              className={`p-4 rounded-lg shadow-sm ${getColor(note.type)}`}
            >
              {note.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BloodBankNotifications;