import React from "react";
import ReactDOM from "react-dom/client";
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
import { Route } from "wouter";
import Navbar from "./Componentes/Navbar";
import NewVehivle from "./Componentes/newvehicle";
import { UserProvider } from "./context/usercontext";
import { VehicleProvider } from "./context/vehicleContext";
import { TicketProvider } from "./context/ticketContext";
import { ReserveProvider } from "./context/reserveContext";
import TicketEntry from "./Pages/ticketEntry";
import TicketExit from "./Pages/ticketExit";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <VehicleProvider>
        <ReserveProvider>
          <TicketProvider>
            <switch>
              <Route path="/Parking" component={Register} />
              <Route path="/Parking/Admin" component={Register} />
              <Route path="/Parking/Login" component={Login} />
              <Route path="/Admin/dashboard" component={DashboardUser} />
              <Route path="/Admin/Resgister" component={RegisterAdmin} />
              <Route path="/Admin/Reservation" component={ReservationAdmin} />
              <Route path="/Admin/TicketEntry" component={TicketEntry} />
              <Route path="/Admin/TicketExit" component={TicketExit} />

              <Route path="/User/dashboard" component={Dashboardhome} />
              <Route path="/User/Resgister" component={RegisterUser} />
              <Route path="/User/Reservation" component={ReservationUser} />
            </switch>
          </TicketProvider>
        </ReserveProvider>
      </VehicleProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
