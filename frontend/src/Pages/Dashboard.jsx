import React, { useEffect, useState } from "react";
import DashboardCard from "../Components/DashboardCard";
import api from "../utils/axiosInstance";
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalFiles: 0,
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
  });

  const getdashboardapi = async () => {
    try {
      const res = await api.get("/dashboard");
      if (res.data.success) {
        setDashboardData({
          totalFiles: res.data.data.totalticket,
          openTickets: res.data.data.openTickets,
          inProgressTickets: res.data.data.inProgressTickets,
          resolvedTickets: res.data.data.resolvedTickets,
        });
      }
    } catch (error) {
      console.error("error", error.message);
    }
  };

  useEffect(() => {
    getdashboardapi();
  }, []);

  return (
    <div className="px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Total Files" value={dashboardData.totalFiles} />

      <DashboardCard title="Open Tickets" value={dashboardData.openTickets} />
      <DashboardCard
        title="In Progress Tickets"
        value={dashboardData.inProgressTickets}
      />
      <DashboardCard
        title="Resolved Tickets"
        value={dashboardData.resolvedTickets}
      />
    </div>
  );
};

export default Dashboard;
