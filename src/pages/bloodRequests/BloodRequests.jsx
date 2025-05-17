import React from 'react'
import { Link } from "react-router-dom";

export default function BloodRequests(){
    return (
        <div>
            <p>Blood requests page</p>
            {<Link to="/">Go to Analytics</Link>}
        </div>
    )
}