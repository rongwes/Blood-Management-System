import React from 'react'
import DonorsGrid from './DonorsGrid'
import NewDonors from './NewDonors'
import DonorsTable from './DonorsTable'

export default function Donors() {
    return (
        <div className='flex flex-col gap-4'>
            <DonorsGrid />
            <div>
                <NewDonors />
            </div>
            <DonorsTable />
        </div>
    )
}