import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Buttons from "../Componentes/Buttons";
import InputTextLogin from "../Componentes/InputTextLogin";
import Logo from "../Componentes/Logo";
import axios from "axios";
import { Link, useLocation } from "react-router-dom"; // Cambiado a react-router-dom
import apiURL from '../config.js';

export default function Login() {
  // Obtén la función de navegación de React Router
  const navigate = useNavigate();
  const location = useLocation();
  console.log("Ruta completa:", window.location.href);
console.log("env", process.env.REACT_APP_BACKEND_API_URL)
  // Define un estado local para los datos del usuario
  const [userData, setUserData] = useState({
    user: "",
    password: "",
    // Otros campos del usuario
  });

  // Maneja los cambios en los campos del formulario
  const handleInputChange = (fieldName, value) => {
    setUserData({ ...userData, [fieldName]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviado maestro de la llama");
    try {
      // Realiza una solicitud POST al endpoint de inicio de sesión en tu backend
      const response = await axios.post(
        `${apiURL}/api/User/Validate`,
        userData
      );

      const token = response.headers["authorization"];
      sessionStorage.setItem("token", token);
      // Obtén el rol de la respuesta
      let res = response.data;
      let role = res.role;

      // Realiza la redirección según el rol
      if (role === "Admin") {
        navigate("/Admin/dashboard"); // Redirige a la página de administrador
      } else {
        navigate("/User/dashboard"); // Redirige a la página de usuario
      }
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      if (error.response) {
        // Si la respuesta contiene información sobre el error
        alert("Mensaje de error:   " + error.response.data);
      } else if (error.request) {
        // Si no se recibe respuesta del servidor
        console.error("No se pudo conectar al servidor.");
      } else {
        // Otros errores
        console.error("Error desconocido:" + error.data);
      }

      // También puedes mostrar un mensaje de error al usuario si es necesario
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen max-sm:flex-col-reverse">
        <div className="basis-1/2 h-full w-full bg-white1 flex justify-center items-center max-sm:basis-2/3">
          <div className="flex flex-col w-2/3 h-full -mt-14 justify-center ">
            <div className="flex flex-col justify-between">
              <div className="w-[50%]">
                <Logo />
              </div>
              <h1 className="font-bold text-6xl -mt-[7%]">Inicia Sesion</h1>
            </div>
            <form
              className="flex flex-col h-[30%] justify-between mt-[8%] max-sm:h-[45%]"
              onSubmit={handleSubmit}
            >
              <InputTextLogin
                text="Usuario"
                fieldName="user"
                fieldValue={userData.user}
                onChange={handleInputChange}
              />
              <InputTextLogin
                text="Contraseña"
                fieldName="password"
                fieldValue={userData.password}
                onChange={handleInputChange}
              />
              <div>
                <Buttons text="Iniciar sesión" type="submit" />
              </div>
            </form>
            <p className="mt-5">
              Todavía no tienes cuenta? &nbsp;
              <a className="text-yellow tex underline" href="/">
                Registrarsee
              </a>
            </p>
          </div>
        </div>
        <div className="basis-1/2 h-full bg-cover bg-center login max-sm:basis-1/3"></div>
      </div>
    </>
  );
}
