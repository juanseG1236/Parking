import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { useState } from "react";
import { useVehicles } from "../context/vehicleContext";
import Buttons from "./Buttons";
import { ImgCircle } from "./imgCircle";
import InputSelect from "./InputSelect";
import InputTextLogin from "./InputTextLogin";

export default function NewVehicle({ handleClose, show }) {
  const showHideClassName = show ? " fixed inset-0 flex items-center justify-center  h-screen  w-screen" : " hidden";

  const {createVehicle} = useVehicles()

  



  const [vehicleData, setVehicleData] = useState({
    plate: "",
    color: "",
    type: "",
  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (fieldName, value) => {
    setVehicleData({ ...vehicleData, [fieldName]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();


    try {

      // Realiza una solicitud POST al endpoint de creación de usuarios en tu backend
      const res = await createVehicle(vehicleData)
      alert(res)
      // Si la creación del usuario es exitosa, muestra una respuesta o realiza alguna acción necesaria

      // También puedes redirigir al usuario o realizar otras acciones aquí
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      alert("Error al crear el vehiculo");

      // También puedes mostrar un mensaje de error al usuario si es necesario
    }
  };

  const isMobile = useMediaQuery("(max-width: 800px)");

  return (
    <div className= {showHideClassName}>
      <div className="flex flex-col   bg-[#fff] p-7 pt-5 rounded-modules w-[90%] h-[90%] in">
        <div className="h-3 w-20 self-end">
        <Buttons text="cerrar" onClick={handleClose}/>

        </div>

        <div className="flex grow justify-evenly items-center ">

          <div className="flex basis-1/3">
            <ImgCircle pathI="carRed.png" />
          </div>

          <div className="flex flex-col w-1/2 mt-[6%] h-full max-sm:pt-1">

            <form
              className="flex flex-col h-[70%] justify-between mt-[8%] max-sm:h-[45%]"
              onSubmit={handleSubmit}
            >
        
              <InputTextLogin
                text="Placa del vehiculo"
                fieldName="plate"
                fieldValue={vehicleData.placa}
                onChange={handleInputChange}
              />

              <InputSelect
                text="tipo"
                fieldName="type"
                fieldValue={vehicleData.tipo}
                onChange={handleInputChange}
                options={[
                    { value: 'automovil', label: 'automovil' },
                    { value: 'motocicleta', label: 'motocicleta' },
                  ]}
              />

              <InputSelect
                text="Color"
                fieldName="color"
                fieldValue={vehicleData.color}
                onChange={handleInputChange}
                options={[
                    { value: 'rojo', label: 'Rojo' },
                    { value: 'negro', label: 'Negro' },
                    { value: 'blanco', label: 'Blanco' },
                  ]}
              />
              <div>
                <Buttons text="Enviar" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
