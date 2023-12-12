import InfoParkingDashboard from "../Componentes/InfoParkingDashboard";
import Navbar from "../Componentes/Navbar";
import VehicleDashboard from "../Componentes/VehicleDashboard";
import Buttons from "../Componentes/Buttons";
import List from "../Componentes/List";
import { useMediaQuery } from "@react-hook/media-query";
import AdminInfo from "../Componentes/adminInfo";
import { useEffect, useState } from "react";
import { useTickets } from "../context/ticketContext";
import { useVehicles } from "../context/vehicleContext";
import { useUsers } from "../context/usercontext";
import ModUser from "../Componentes/modUser";
import { navigate } from "wouter/use-location";
import { useReserves } from "../context/reserveContext";

export default function DashboardUser() {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const { user, userData } = useUsers();
  const { ticket, ticketsData } = useTickets();
  const { reserve, reservesData } = useReserves();
  const [arrayTicket, setArrayTicket] = useState([]);
  const [arrayReserve , setArrayReserve ] = useState([])


  const [renderContent, setRenderContent] = useState(false);

  useEffect(() => {
    const allData = async () => {
      if (!user) {
        await userData();
        await ticketsData();
        await reservesData();


        setRenderContent(true); // Habilitar el renderizado una vez que tengamos los datos.
      }

      setRenderContent(true); // Habilitar el renderizado una vez que tengamos los datos.
    };

    allData();
  }, [user, userData, ticket ]);

  useEffect(() => {
    const convertir = async () => {
      if (ticket && reserve) {
        setArrayTicket(Object.values(ticket));
        setArrayReserve(Object.values(reserve));
        console.log(arrayTicket)
        
      }
    };

    convertir();

  }, [ticket, reserve]);

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
              <Buttons text="Modificar información" />
            </div>
            <div className=" w-[32%]">
              <Buttons
                text="crear ticket salida"
                onClick={() => {
                  navigate("TicketExit");
                }}
              />
            </div>
            <div className=" w-[32%]">
              <Buttons
                text="crear ticket enrtrada"
                onClick={() => {
                  navigate("TicketEntry");
                }}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex h-1/2 justify-between max-sm:flex-col max-sm:h-auto">
          <div className="w-[32%] max-sm:w-full max-sm:mb-8">
            <AdminInfo {...user} />
          </div>
          <div className="w-[32%] max-sm:w-full  max-sm:mb-4">
            <InfoParkingDashboard />
          </div>
          {isMobile ? (
            <></>
          ) : (
            <div className="w-[32%] flex flex-col justify-between">
              <div className=" h-[30%]">
                <Buttons
                  text="Modificar información"
                  onClick={togglePopup("User")}
                />{" "}
              </div>
              <div className=" h-[30%]">
                <Buttons
                  text="crear ticket enrtrada"
                  onClick={() => {
                    navigate("TicketEntry");
                  }}
                />
              </div>
              <div className=" h-[30%]">
                <Buttons
                  text="crear ticket salida"
                  onClick={() => {
                    navigate("TicketExit");
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between h-1/2 max-sm:h-auto max-sm:flex-col">
          <div className="w-[48%] h-full max-sm:w-full max-sm:mb-14">
            <h1 className="title">Proximas Reservas</h1>
            {arrayReserve.length > 0  ? (

              <List
                type={"Reserve"}
                dataList={["Placa", "Hora entrada"]}
                dataItems={[arrayReserve]}
                isTiny
              />
            ) : (
          
              <p>no data</p>
            )}
          </div>
          <div className="w-[48%] h-full max-sm:w-full max-sm:mb-7">
            <h1 className="title">ultimos tickets</h1>
            {arrayTicket.length > 0  ? (
              <List
                type={"Ticket"}
                dataList={["Placa", "Hora entrada"]}
                dataItems={[arrayTicket]}
                isTiny
              />
            ) : (
              <p>no data</p>
            )}
          </div>
        </div>
      </div>
      <ModUser show={showPopupUser} handleClose={closePopup("User")} />
    </div>
  );
}
