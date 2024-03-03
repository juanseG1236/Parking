import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Dashboardhome from "./Pages/dashboardAdmin";
import RegisterAdmin from "./Pages/RegisterAdmin";
import ReservationAdmin from "./Pages/ReservationAdmin";
import ReservationUser from "./Pages/ReservationUser";
import RegisterUser from "./Pages/RegisterUser";
import reportWebVitals from "./reportWebVitals";
import DashboardUser from "./Pages/DashboardUser";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Navbar from "./Componentes/Navbar";
import NewVehivle from "./Componentes/newvehicle";
import { UserProvider } from "./context/usercontext";
import { VehicleProvider } from "./context/vehicleContext";
import { TicketProvider } from "./context/ticketContext";
import { ReserveProvider } from "./context/reserveContext";
import TicketEntry from "./Pages/ticketEntry";
import TicketExit from "./Pages/ticketExit";
import Prueba from "./Pages/Prueba";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <VehicleProvider>
        <ReserveProvider>
          <TicketProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/Admin" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Admin/dashboard" element={<DashboardUser />} />
                <Route path="/Admin/Register" element={<RegisterAdmin />} />
                <Route path="/Admin/Reservation" element={<ReservationAdmin />} />
                <Route path="/Admin/TicketEntry" element={<TicketEntry />} />
                <Route path="/Admin/TicketExit" element={<TicketExit />} />
                <Route path="/Prueba" element={<Prueba />} />
                <Route path="/User/dashboard" element={<Dashboardhome />} />
                <Route path="/User/Register" element={<RegisterUser />} />
                <Route path="/User/Reservation" element={<ReservationUser />} />
              </Routes>
            </Router>
          </TicketProvider>
        </ReserveProvider>
      </VehicleProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
