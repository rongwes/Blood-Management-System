import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";

export default function Layout() {
  return (
    <div style={{ backgroundColor: '#F5F5F5'}} className="flex flex-row h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="p-2 flex-1 overflow-y-auto" >
        <Header />
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}
