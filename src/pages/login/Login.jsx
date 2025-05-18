import React from 'react';
import bloodImage from '/loginImage2.jpg'; 
import logo from '../../assets/logo.png'
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle logic, then redirect?
    navigate('/');
  };

  return (
    <div className="flex h-screen w-screen">
      
    
      <div className="w-1/2 h-full">
        <img
          src={bloodImage}
          alt="Login visual"
          className="w-full h-full object-cover object-center"
        />
      </div>

      
      <div className="w-1/2 flex flex-col justify-center items-center p-10">

         <div className="absolute top-6 right-105 flex items-center gap-2 px-5 py-5">
          <img src={logo} alt="blood bank logo" className="w-[34px] h-[34px]" />
          <span className="font-inter font-medium text-[20px] text-[#000000]">
            Blood Management System
          </span>
        </div>
      
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Log In
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="employeeId" className="block text-gray-700 font-medium mb-2">
                Employee ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="employeeId"
                placeholder="Enter your Employee ID"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
