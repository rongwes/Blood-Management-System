import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <SideBar />
      <div className="flex-1 overflow-y-auto p-6">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

