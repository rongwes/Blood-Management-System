import React from 'react'
import logo from '../../assets/logo.png'
import { DASHBOARD_SIDEBAR_LINKS } from './Navigation.jsx'
import { Link } from 'react-router-dom'

export default function SideBar(){
    return (
        <div style={{ backgroundColor: '#F5F5F5', color: '#807C7C' ,  borderRight: '1px solid #807C7C',}} className=' flex flex-col w-60 p-3'>
            <div className='flex items-center gap-2 px-1 py-3'>
                <img src={logo} alt="blood bank logo" className="w-[24px] h-[24px]"/>
                <span className="font-inter font-medium text-[14px] text-[#000000]">Blood Management System</span>
            </div>
            <div className='flex-1'>
                {DASHBOARD_SIDEBAR_LINKS.map((item)=>(
                    <SideBarLink key={item.key} item={item}/>
                ))}
            </div>
            <div>bottom part</div>
        </div>
    )
}

function SideBarLink({item}){
    return(
        <Link
            to={item.path}
            className="sidebar-link flex items-center gap-2 py-2 px-3 hover:bg-gray-200 rounded group"
        >
            <img
                src={item.icon}
                alt={item.label + " icon"}
                className="sidebar-icon w-5 h-5"
                style={{ transition: 'filter 0.2s' }}
            />
            <span
                className="sidebar-label font-inter font-medium text-[14px]"
                style={{
                    transition: 'color 0.2s'
                }}
            >
                {item.label}
            </span>
        </Link>
    )
}