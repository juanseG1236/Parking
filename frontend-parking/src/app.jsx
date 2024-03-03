import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboardhome from "./Pages/dashboardAdmin";
import RegisterAdmin from "./Pages/RegisterAdmin";
import ReservationAdmin from "./Pages/ReservationAdmin";
import ReservationUser from "./Pages/ReservationUser";
import RegisterUser from "./Pages/RegisterUser";
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

function App() {
  return (
      <div>
      <p>holaaaaaaaaaaaaaaaaaa</p>
      </div>
  );
}

export default App;
