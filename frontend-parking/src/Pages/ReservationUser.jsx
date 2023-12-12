import ReservationModule from "../Componentes/ReservationModule";
import Navbar from "../Componentes/Navbar";
import NewReserveUser from "../Componentes/newReserveUser";
import { useReserves } from "../context/reserveContext";
import { useVehicles } from "../context/vehicleContext";
import { useState, useEffect } from "react";

export default function ReservationUser() {
  const [renderContent, setRenderContent] = useState(false);
  const { vehicle, vehicleData } = useVehicles();
  const { reserve, reserveData } = useReserves();

  useEffect(() => {
    const getData = async () => {
      if (!reserve) {
        await reserveData();
        await vehicleData();

        setRenderContent(true); // Habilitar el renderizado una vez que tengamos los datos.
      }else{
        setRenderContent(false); // Habilitar el renderizado una vez que tengamos los datos.
      }
    };

    getData();
  }, [reserve]);

  if (!renderContent) {
    // No renderizar nada si aún no tenemos los datos.

    return null;
  }
  return (
    <>
      <div style={{ height: `calc(100vh - ${4 * 16}px)` }}>
        <Navbar />

        <div className="flex self-center py-10 px-20 h-full gap-10 justify-evenly max-sm:flex-col max-sm:px-10 max-sm:pt-80 ">
          <div className=" basis-5/12">
            <ReservationModule
                fecha={reserve && reserve.length > 0 ? reserve[0].date : "no data"}
               placa={ vehicle ? vehicle.plate : "no data"}
            />
          </div>
          <div className=" basis-5/12">
            <NewReserveUser />
          </div>
        </div>
      </div>
    </>
  );
}
