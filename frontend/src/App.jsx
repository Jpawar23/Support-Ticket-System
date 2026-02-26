import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import TicketList from "./Pages/TicketList";
import TicketForm from "./Pages/TicketForm";
import Dashboard from "./Pages/Dashboard";
import EmployeeDashboard from "./Pages/EmployeeDashboard";
import EmployeeTicketList from "./Pages/EmployeeTicketList";
import TicketDetail from "./Pages/TicketDetail";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./utils/AuthContext";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            {/* Admin Routes */}

            <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/ticket" element={<TicketList />}></Route>
              {/* <Route path="/ticket/:id" element={<TicketDetail />}></Route> */}
            </Route>

            {/* User Routes */}
            <Route element={<ProtectedRoutes allowedRoles={["user"]} />}>
              <Route
                path="/user-ticket"
                element={<EmployeeTicketList />}
              ></Route>
              <Route path="/create-ticket" element={<TicketForm />}></Route>
            </Route>

            {/* other Routes */}
            <Route path="/ticket/:id" element={<TicketDetail />}></Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
export default App;
