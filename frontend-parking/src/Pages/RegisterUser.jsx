import List from "../Componentes/List";
import Navbar from "../Componentes/Navbar";
import InputText from "../Componentes/InputText";
import Buttons from "../Componentes/Buttons";
import { useEffect, useState } from "react";
import { useTickets } from "../context/ticketContext";
import { useVehicles } from "../context/vehicleContext";
import { navigate } from "wouter/use-location";

export default function RegisterUser() {

  const { ticket, ticketData } = useTickets();
  const { vehicle, vehicleData } = useVehicles();
  const [renderContent, setRenderContent] = useState(false);
  const [arrayTicket , setArrayTicket ] = useState()

  useEffect(() => {
    const allData = async () => {
      if (!ticket) {
        await ticketData();
        await vehicleData()
        setRenderContent(true); // Habilitar el renderizado una vez que tengamos los datos.
        
      }
      setRenderContent(true); // Habilitar el renderizado una vez que tengamos los datos.
    };

    allData();
  }, [ticket, ticketData]);

useEffect(() => {
  const convertir = async () => {
    if (ticket) {
      setArrayTicket(Object.values(ticket));
    }
  };

  convertir();
}, [ticket]);




  
  
  if (!renderContent) {
    // No renderizar nada si aún no tenemos los datos.
    return null;
  }

  return (
    <>
      <div style={{ height: `calc(100vh - ${4 * 16}px)` }}>
        <Navbar />
      
        <div className="flex flex-col self-center py-10 px-20 h-full gap-7 max-sm:px-10 ">
          <div className="flex justify-between w-full max-sm:h-8">
            {/* <div className="flex basis-1/2 gap-4 max-sm:basis-2/3">
                <div className="flex basis-1/2 max-sm:basis-auto">
                <InputText/>
                </div>
                <div className="flex basis-1/4">

                <Buttons text="filtrar"/>
                </div>
            </div> */}
            <div className="p-0 m-0 flex justify-center items-center">
                    <Buttons text="Nueva reserva"   onClick={() => {
                  navigate("reservation");
                }}/>
            </div>
          </div>
          <div className="flex w-full justify-center">
            {arrayTicket ? 
            
            <List
          type ={"Ticket"}
          dataList={["Placa", "Hora entrada", "Hora Salida", "Coste", "Puesto "]}
          dataItems={[
            arrayTicket
          ]}
        /> : <p>no data</p>
            
            }
          
          </div>
        </div>
      </div>
    </>
  );
}
