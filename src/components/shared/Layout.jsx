import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="p-4">
        {/*<div>header</div>*/}
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
}
