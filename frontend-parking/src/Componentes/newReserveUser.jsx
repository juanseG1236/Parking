import Buttons from "./Buttons";
import { useState } from "react";
import dayjs from "dayjs";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputSelect from "./InputSelect";
import { useVehicles } from "../context/vehicleContext";
import { useReserves } from "../context/reserveContext";

export default function NewReserveUser({ vehicles }) {
  const [mode, setMode] = useState(true);
  const { vehicle } = useVehicles();
  const {createReserve} = useReserves()

  //manejo de formulario
  const [reserveData, setReserveData] = useState({
    vehiclePlate: "",
    date: "",
  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (fieldName, value) => {
    setReserveData({ ...reserveData, [fieldName]: value });
    alert(reserveData.date)
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      alert(reserveData.vehiclePlate);

      // Realiza una solicitud POST al endpoint de creación de usuarios en tu backend
      await createReserve(reserveData);

      // Si la creación del usuario es exitosa, muestra una respuesta o realiza alguna acción necesaria

      // También puedes redirigir al usuario o realizar otras acciones aquí
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      alert("Error al crear el vehiculo :", error);

      // También puedes mostrar un mensaje de error al usuario si es necesario
    }
  };

  //funcion cambio

  const changeComponent = () => {
    if (vehicle) {
      setMode(!mode);
      console.log(mode);
    } else {
      alert("primero debes crear un vehiculo en el dashboard")
    }
   
  };

  //renderizado

  if (mode) {
    return (
      <div className="flex flex-col  bg-[#fff] p-7 pt-5 rounded-modules w-full h-full justify-evenly items-center">
        <h1 className="title text-center text-2xl"> Reserva Ahora</h1>
        <p>No pierdas mas el tiempo buscando estacionamiento </p>
        <img
          className=" h-3/4 w-auto"
          src={require(`../Imagenes/Reserva.png`)}
          alt=""
        />

        <div className=" w-2/4">
          <Buttons text="Reserva Ahora" onClick={changeComponent} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col  bg-[#fff] p-7 pt-5 rounded-modules w-full h-full justify-evenly items-center">
        <div className="w-1/5  h-2 self-start">
        <Buttons text="cancelar" onClick={changeComponent} />

        </div>

        <h1 className="title text-center text-2xl"> Reserva Ahora</h1>
        <img
          className=" h-1/4 w-auto"
          src={require(`../Imagenes/Reserva.png`)}
          alt=""
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              fieldName = "date"
              value={reserveData.date}
              defaultValue={dayjs('2022-04-17T15:30')}
              onChange={(newValue) => setReserveData(prevState => ({
                ...prevState,
                date: newValue,
              }))}
              label="Fecha de la reserva"
            />
          </DemoContainer>
        </LocalizationProvider>
        <div className="w-3/4">
          <InputSelect
            text="Selecciona la placa"
            fieldName="vehiclePlate"
            fieldValue={reserveData.vehiclePlate}
            onChange={handleInputChange}
            options={
              Array.isArray(vehicle)
                ? vehicle.map((v) => ({
                    value: v.plate,
                    label: v.plate,
                  }))
                : [{ value: vehicle._id, label: vehicle.plate }]
            }
          />
        </div>

        <div className=" w-2/4">
          <Buttons text="Reserva Ahora" onClick={handleSubmit} />
        </div>
      </div>
    );
  }
}
