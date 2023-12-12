import { useMediaQuery } from "@react-hook/media-query";
import Buttons from "../Componentes/Buttons";
import InfoDashboard from "../Componentes/InfoDashboard";
import Navbar from "../Componentes/Navbar";
import ProfileDashboard from "../Componentes/profileDashboard";
import VehicleDashboard from "../Componentes/VehicleDashboard";
import { useEffect, useState } from "react";
import { useUsers } from "../context/usercontext";
import { useVehicles } from "../context/vehicleContext";
import { useTickets } from "../context/ticketContext";
import newvehicle from "../Componentes/newvehicle";
import NewVehicle from "../Componentes/newvehicle";
import ModUser from "../Componentes/modUser";
import { useRoute } from "wouter";
import { navigate } from "wouter/use-location";
import { useReserves } from "../context/reserveContext";

export default function Dashboardhome() {
  const isMobile = useMediaQuery("(max-width: 800px)");

  const { user, userData } = useUsers();
  const { vehicle, vehicleData } = useVehicles();
  const { ticket, ticketData } = useTickets();

  const [renderContent, setRenderContent] = useState(false);

  useEffect(() => {
    const allData = async () => {
      if (!user || !vehicle || !ticket) {
        await userData();
        await vehicleData();
        await ticketData();

        setRenderContent(true); // Habilitar el renderizado una vez que tengamos los datos.
      }

      setRenderContent(true); // Habilitar el renderizado una vez que tengamos los datos.
    };

    allData();
  }, [ticket, user]);

  //Logic PopUps
  const [showPopupVehicle, setShowPopupVehicle] = useState(false);
  const [showPopupUser, setShowPopupUser] = useState(false);

  const togglePopup = (option) => () => {
    switch (option) {
      case "Vehicle":
        setShowPopupVehicle(true);
        break;
      case "User":
        setShowPopupUser(true);
        break;
      default:
        break;
    }
  };

  const closePopup = (option) => () => {
    switch (option) {
      case "Vehicle":
        setShowPopupVehicle(false);
        break;
      case "User":
        setShowPopupUser(false);
        break;
      default:
        break;
    }
  };

  if (!renderContent) {
    // No renderizar nada si aún no tenemos los datos.
    return null;
  }

  return (
    <div style={{ height: `calc(100vh - ${4 * 16}px)` }}>
      <Navbar />
      <div className="flex flex-col self-center py-10 px-20 h-full gap-7 max-sm:px-10 ">
        {isMobile ? (
          <div className="w-full flex  justify-between">
            <div className=" w-[32%]">
              <Buttons text="Añadir vehículo" />
            </div>
            <div className=" w-[32%]">
              <Buttons text="Modificar información" />
            </div>
            <div className=" w-[32%]">
              <Buttons text="Hacer una reserva" />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex h-1/2 justify-between max-sm:flex-col max-sm:h-full max-sm:m-5">
          <div className="w-[48%] max-sm:w-full max-sm:mb-8">
            <ProfileDashboard {...user} />
          </div>
          <div className="w-[48%] max-sm:w-full max-sm:mb-8">
          <VehicleDashboard {...(vehicle || { noData: 'no data' })} />
          </div>
        </div>
        <div className="flex justify-between w-full h-1/2">
          <div className="w-[32%] pr-3 max-sm:w-1/2">
            <InfoDashboard
              data={[
                ["Placa", vehicle && vehicle.plate ? vehicle.plate : "No data"],
                [
                  "Entrada",
                  ticket && ticket.length > 0 && ticket[0].timeEntry
                    ? ticket[0].timeEntry
                    : "No data",
                ],
                [
                  "Salida",
                  ticket && ticket.length > 0 && ticket[0].timeExit
                    ? ticket[0].timeExit
                    : "No data",
                ],
                [
                  "Coste",
                  ticket && ticket.length > 0 && ticket[0].price
                    ? ticket[0].price
                    : "No data",
                ],
              ]}
              title="Información comprobante"
              isBold
            />
          </div>
          <div className="pr-3 w-[32%]  max-sm:w-1/2">
            <InfoDashboard
              data={[
                ["Placa", vehicle && vehicle.plate ? vehicle.plate : "No data"],
                [
                  "Entrada",
                  ticket && ticket.length > 1 && ticket[1].timeEntry
                    ? ticket[1].timeEntry
                    : "No data",
                ],
                [
                  "Salida",
                  ticket && ticket.length > 1 && ticket[1].timeExit
                    ? ticket[1].timeExit
                    : "No data",
                ],
                [
                  "Coste",
                  ticket && ticket.length > 1 && ticket[1].price
                    ? ticket[1].price
                    : "No data",
                ],
              ]}
              title="Información comprobante"
              isBold
            />
          </div>
          {isMobile ? (
            <></>
          ) : (
            <div className="w-[32%] flex flex-col justify-between">
              <div className=" h-[30%]">
                <Buttons
                  text="Añadir vehículo"
                  onClick={togglePopup("Vehicle")}
                />
              </div>
              <div className=" h-[30%]">
                <Buttons
                  text="Modificar información"
                  onClick={togglePopup("User")}
                />
              </div>
              <div
                className=" h-[30%]"
                onClick={() => {
                  navigate("reservation");
                }}
              >
                <Buttons text="Hacer una reserva" />
              </div>
            </div>
          )}
        </div>
      </div>
      <NewVehicle show={showPopupVehicle} handleClose={closePopup("Vehicle")} />
      <ModUser show={showPopupUser} handleClose={closePopup("User")} />
    </div>
  );
}
