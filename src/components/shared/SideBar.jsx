import React from "react";
import logo from "../../assets/logo.png";
import { DASHBOARD_SIDEBAR_LINKS } from "./Navigation.jsx";
import { Link, useLocation } from "react-router-dom";

export default function SideBar() {
  const location = useLocation();

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        color: "#807C7C",
        borderRight: "1px solid #807C7C",
      }}
      className="flex flex-col w-60 p-3"
    >
      <div className="flex items-center gap-2 px-1 py-3">
        <img src={logo} alt="blood bank logo" className="w-[24px] h-[24px]" />
        <span className="font-inter font-medium text-[14px] text-[#000000]">
          Blood Management System
        </span>
      </div>
      <div className="flex-1 mt-6">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SideBarLink
            key={item.key}
            item={item}
            active={location.pathname === item.path}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-4 mb-2">
        <button
          style={{width: 82,
            height: 32,backgroundColor: "#EEEEEE",borderRadius: 4,padding: 10,
            color: "#807C7C",fontWeight: 500,fontSize: 14,border: "none",
            cursor: "pointer",display: "flex",alignItems: "center",justifyContent: "center",}}>
          Sign out
        </button>
      </div>
    </div>
  );
}

function SideBarLink({ item, active }) {
  return (
    <Link
      to={item.path}
      className={`sidebar-link flex items-center gap-2 py-2 px-3 rounded group ${
        active ? "bg-[#FFE5E5]" : "hover:bg-[#FFE5E5]"
      }`}
      style={{...(active && { backgroundColor: "#FFE5E5" }),}}
    >
      <img
        src={item.icon}
        alt={item.label + " icon"}
        className="sidebar-icon w-5 h-5"
        style={{
          transition: "filter 0.2s",
          filter: active
            ? "brightness(0) saturate(100%) invert(34%) sepia(94%) saturate(749%) hue-rotate(338deg) brightness(101%) contrast(101%)"
            : undefined,
        }}
      />
      <span
        className="sidebar-label font-inter font-medium text-[14px]"
        style={{
          transition: "color 0.01s",
          color: active ? "#FF4747" : undefined,
        }}
      >
        {item.label}
      </span>
    </Link>
  );
}
