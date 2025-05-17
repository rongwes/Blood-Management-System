import React from 'react'

export default function SideBar(){
    return (
        <div style={{ backgroundColor: '#F5F5F5', color: '#807C7C' ,  borderRight: '1px solid #807C7C',}} className=' flex flex-col w-60 p-3'>
            <div className='flex items-center gap-2 px-1 py-3'>
                <img src="../../../" alt=""/>
            </div>
            <div className='flex-1'>top part</div>
            <div>bottom part</div>
        </div>
    )
}