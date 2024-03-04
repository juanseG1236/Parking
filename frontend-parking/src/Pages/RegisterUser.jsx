import { useEffect, useState } from "react";
import { useTickets } from "../context/ticketContext";
import { useVehicles } from "../context/vehicleContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

import List from "../Componentes/List";
import Navbar from "../Componentes/Navbar";
import InputText from "../Componentes/InputText";
import Buttons from "../Componentes/Buttons";


export default function RegisterUser() {
  const { ticket, ticketData } = useTickets();
  const { vehicle, vehicleData } = useVehicles();
  const [renderContent, setRenderContent] = useState(false);
  const [arrayTicket, setArrayTicket] = useState();
  const location = useLocation();
  
  const navigate = useNavigate();
  

  useEffect(() => {
    console.log("Ruta completa:", location.pathname);

    const allData = async () => {
      if (!ticket) {
        await ticketData();
        await vehicleData();
        setRenderContent(true);
      }
      setRenderContent(true);
    };

    allData();
  }, [ticket, ticketData, location.pathname]);

  useEffect(() => {
    const convertir = async () => {
      if (ticket) {
        setArrayTicket(Object.values(ticket));
      }
    };

    convertir();
  }, [ticket]);

  console.log(arrayTicket);
  console.log("Esta funcionando");

  if (!renderContent) {
    return null;
  }

  // Obtén el tipo de usuario de la URL (puede ser "User" o "Admin")
  const userType = location.pathname.split("/")[1];
  console.log(userType)

  return (
    <>
      <div style={{ height: `calc(100vh - ${4 * 16}px)` }}>
        <Navbar />
        <div className="flex flex-col self-center py-10 px-20 h-full gap-7 max-sm:px-10">
          <div className="flex justify-between w-full max-sm:h-8">
            <div className="p-0 m-0 flex justify-center items-center">
              {/* Utiliza el hook useNavigate para la navegación relativa */}
              <Link to={`/${userType}/Reservation`}>
                <Buttons text="Nueva reserva" />
              </Link>
            </div>
          </div>
          <div className="flex w-full justify-center">
            {arrayTicket ? (
              <List
                type={"Ticket"}
                dataList={["Placa", "Hora entrada", "Hora Salida", "Coste", "Puesto"]}
                dataItems={[arrayTicket]}
              />
            ) : (
              <p>No hay datos</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
