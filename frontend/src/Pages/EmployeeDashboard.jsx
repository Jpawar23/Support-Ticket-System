import React, { useState } from 'react'
import DashboardCard from '../Components/DashboardCard';

const EmployeeDashboard = () => {
    const [dashboardData] = useState({
        totalFiles: 0,
        OpenTickets: 0,
        InProgressTickets: 0,
        ResolvedTickets: 0
    });
    return (
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <DashboardCard
                title="My Tickets"
                value={dashboardData.totalFiles}
            />

            <DashboardCard
                title="Open Tickets"
                value={dashboardData.OpenTickets}
            />
            <DashboardCard
                title="In Progress Tickets"
                value={dashboardData.InProgressTickets}
            />
            <DashboardCard
                title="Resolved Tickets"
                value={dashboardData.ResolvedTickets}
            />


        </div>
    )
}

export default EmployeeDashboard;


