import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import TicketList from "./Pages/TicketList";
import TicketForm from "./Pages/TicketForm";
import Dashboard from "./Pages/Dashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import EmployeeTicketList from "./Pages/EmployeeTicketList";
import LoginPage from "./Pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />}></Route>
          <Route path="/ticket" element={<TicketList />}></Route>
          <Route path="/employee-ticket" element={<EmployeeTicketList />}></Route>
          <Route path="/create-ticket" element={<TicketForm />}></Route>
        </Route>
      </Routes>
    </>
  )
}
export default App;



