import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { useState } from "react";
import Buttons from "../Componentes/Buttons";
import { ImgCircle } from "../Componentes/imgCircle";
import InputSelect from "../Componentes/InputSelect";
import InputTextLogin from "../Componentes/InputTextLogin";
import Navbar from "../Componentes/Navbar";
import { useTickets } from "../context/ticketContext";
import { useUsers } from "../context/usercontext";

export default function TicketExit() {
  const { exitTicket } = useTickets();

  const [ticketData, setTicketData] = useState({
    idTicket: "",
    


  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (fieldName, value) => {
    setTicketData({ ...ticketData, [fieldName]: value })
    console.log(ticketData.idTicket);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      console.log(ticketData)
      const res = await exitTicket(ticketData);
    
      if (res && res.data) {
        if (res.data.message) {
          // Si hay un campo 'message', significa que el servidor envió un mensaje de error
          alert(res.data.message);
        } else {
          // Si no hay un campo 'message', significa que la respuesta es exitosa
          const { price, timeEntry, timeExit } = res.data.ticketUpdated;
    
          if (price !== undefined && timeEntry !== undefined && timeExit !== undefined) {
            const alertMessage = `------------ TICKET DE SALIDA -------------\nPrecio: ${price}\nTiempo de Entrada: ${timeEntry}\nTiempo de Salida: ${timeExit}`;
            alert(alertMessage);
          } else {
            alert('TICKET NO EXISTE');
          }
        }
      } else {
        alert('Ese ticket no existe');
      }
    } catch (error) {
      alert("Error al crear el vehiculo: " + error);
    }
    
    
  };

  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div style={{ height: `calc(100vh - ${4 * 16}px)` }}>
      <Navbar />
      <div className="flex flex-col self-center py-10 px-20 h-full gap-7 max-sm:px-10 ">
        <div className="flex flex-col self-center  bg-[#fff] p-7 pt-5 rounded-modules w-[90%] h-[90%]">
          <div className="flex grow justify-evenly items-center ">
            <div className="flex flex-col w-[80%] mt-[6%] h-full max-sm:pt-1 justify-center">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col h-[60%] mt-[0%] max-sm:h-[45%] gap-32 "
              >
                <div className="w-alfull self-center">
                    <InputTextLogin
                      text="id del ticket"
                      fieldName="idTicket"
                      fieldValue={ticketData.idTicket}
                      onChange={handleInputChange}
                      required
                      title="El nombre debe tener entre 2 y 50 caracteres y solo se permiten letras y tildes."
                    />
                    </div>
                <div>
                  <Buttons text="crear ticket de salida" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
