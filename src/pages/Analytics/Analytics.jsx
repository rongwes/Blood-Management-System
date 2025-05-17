import React from 'react'
import { Link } from "react-router-dom";

export default function Analytics() {
    return (
        <div>
            <p>Analytics</p>
            <Link to="/bloodRequests" className="underline">Go to blood requests</Link>
        </div>
    )
}