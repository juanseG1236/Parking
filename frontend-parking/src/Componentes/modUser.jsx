import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { useState } from "react";
import { useUsers } from "../context/usercontext";
import Buttons from "./Buttons";
import { ImgCircle } from "./imgCircle";
import InputSelect from "./InputSelect";
import InputTextLogin from "./InputTextLogin";

export default function ModUser({ handleClose, show }) {
  const showHideClassName = show
    ? " fixed inset-0 flex items-center justify-center  h-screen  w-screen"
    : " hidden";

  const { updateUser } = useUsers();

  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (fieldName, value) => {
    setUserData({ ...userData, [fieldName]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // Realiza una solicitud POST al endpoint de creación de usuarios en tu backend
      const res = await updateUser(userData);
    alert(res.data)

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
    <div className={showHideClassName}>
      <div className="flex flex-col   bg-[#fff] p-7 pt-5 rounded-modules w-[90%] h-[90%] in">
        <div className="h-3 w-20 self-end">
          <Buttons text="cerrar" onClick={handleClose} />
        </div>

        <div className="flex grow justify-evenly items-center ">
          <div className="flex basis-1/3">
            <ImgCircle pathI="profile.png" />
          </div>

          <div className="flex flex-col w-1/2 mt-[6%] h-full max-sm:pt-1">
            <form
              className="flex flex-col h-[40%] justify-between mt-[24%] max-sm:h-[45%]"
              onSubmit={handleSubmit}
            >
              <InputTextLogin
                text="Nombre"
                fieldName="name"
                fieldValue={userData.name}
                onChange={handleInputChange}
              />

              <InputTextLogin
                text="contraseña"
                fieldName="password"
                fieldValue={userData.password}
                onChange={handleInputChange}
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
