import React, { useState } from 'react'
import DashboardCard from '../Components/DashboardCard';
const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        totalFiles: 0,
        OpenTickets: 0,
        InProgressTickets: 0,
        ResolvedTickets: 0
    });



    return (
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            <DashboardCard
                title="Total Files"
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

export default Dashboard;





