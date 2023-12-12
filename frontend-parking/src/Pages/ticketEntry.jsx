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

export default function TicketEntry() {
  const { createTicket } = useTickets();

  const [ticketData, setTicketData] = useState({
    plate: "",
    color: "",
    type: "",
    tariff: "",


  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (fieldName, value) => {
    setTicketData({ ...ticketData, [fieldName]: value })
    console.log(ticketData.plate);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realiza una solicitud POST al endpoint de creación de usuarios en tu backend
      const res = await createTicket(ticketData);
      alert('este es el id de su ticket:    ' + res.data._id)

      // Si la creación del usuario es exitosa, muestra una respuesta o realiza alguna acción necesaria

      // También puedes redirigir al usuario o realizar otras acciones aquí
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      alert("Error al crear el vehiculo :", error);

      // También puedes mostrar un mensaje de error al usuario si es necesario
    }
  };

  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div style={{ height: `calc(100vh - ${4 * 16}px)` }}>
      <Navbar />
      <div className="flex flex-col self-center py-10 px-20 h-full gap-7 max-sm:px-10 ">
        <div className="flex flex-col self-center  bg-[#fff] p-7 pt-5 rounded-modules w-[90%] h-[90%]">
          <div className="flex grow justify-evenly items-center ">
            <div className="flex flex-col w-[80%] mt-[6%] h-full max-sm:pt-1">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col h-[60%] mt-[0%] max-sm:h-[45%] justify-between"
              >
                <div className="flex w-full flex-row  justify-between">
                  <div className="w-alfull">
                    <InputTextLogin
                      text="placa"
                      fieldName="plate"
                      fieldValue={ticketData.name}
                      onChange={handleInputChange}
                      required
                      pattern="{6}$"
                      title="El nombre debe tener entre 2 y 50 caracteres y solo se permiten letras y tildes."
                    />
                  </div>
                  <div className="w-alfull">
                  <InputSelect
                text="tipo"
                fieldName="type"
                fieldValue={ticketData.tipo}
                onChange={handleInputChange}
                options={[
                    { value: 'automovil', label: 'Carro' },
                    { value: 'motocicleta', label: 'motocicleta' },
                  ]}
              />
                  </div>
                </div>
                <div className="flex w-full flex-row  justify-between">
                  <div className="w-alfull">
                    <InputTextLogin
                      text="color"
                      fieldName="color"
                      fieldValue={ticketData.name}
                      onChange={handleInputChange}
                      required
                      pattern="^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s']{2,50}$"
                      title="El nombre debe tener entre 2 y 50 caracteres y solo se permiten letras y tildes."
                    />
                  </div>
                  <div className="w-alfull">
                    <InputTextLogin
                      text="tarifa"
                      fieldName="tariff"
                      fieldValue={ticketData.lastname}
                      onChange={handleInputChange}
                      pattern="{2,50}$"
                      title="El nombre debe tener entre 2 y 50 caracteres y solo se permiten letras y tildes."
                    />
                  </div>
                </div>
                <div>
                  <Buttons text="crear ticket" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
