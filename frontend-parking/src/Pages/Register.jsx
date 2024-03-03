import Buttons from "../Componentes/Buttons";
import InputTextLogin from "../Componentes/InputTextLogin";
import Logo from "../Componentes/Logo";
import { useState, useEffect } from "react";
import { navigate } from "wouter/use-location";
import axios from "axios";
import { useLocation } from "wouter";

export default function Login() {
  const [location] = useLocation();

  // Verifica si la ubicación actual contiene "/Parking/Admin"
  const isAdmin = location.includes("/Admin");

  // Define un estado local para los datos del usuario
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    user: "",
    password: "",
    role: isAdmin ? "Admin" : "User", // Asigna "Admin" si es admin, de lo contrario, asigna "User"
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
      const response = await axios.post(
        "http://192.168.50.186:4000/api/User",
        userData
      );

      // Si la creación del usuario es exitosa, muestra una respuesta o realiza alguna acción necesaria
      alert("Usuario creado con éxito: " + response.data);

      // También puedes redirigir al usuario o realizar otras acciones aquí
    } catch (error) {
      // Maneja cualquier error que ocurra durante la solicitud
      alert("Error al crear el usuario");

      // También puedes mostrar un mensaje de error al usuario si es necesario
    }
  };

  return (
    <>
      <div className=" flex h-screen w-screen max-sm:flex-col-reverse">
        <div className="basis-1/2 h-full w-full bg-white1 flex justify-center items-center max-sm:basis-2/3">
          <div className="flex flex-col w-2/3 h-full -mt-14 justify-center ">
            <div className="flex flex-col justify-between">
              <div className=" w-[50%]">
                <Logo />
              </div>
              <h1 className=" font-bold text-6xl -mt-[7%]">Crear cuenta</h1>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col h-[40%] justify-between mt-[8%] max-sm:h-[45%]"
            >
              <div className="flex flex-row  justify-between	">
                <div className="w-48%">
                  <InputTextLogin
                    text="nombre"
                    fieldName="name"
                    fieldValue={userData.name}
                    onChange={handleInputChange}
                    required
                    pattern="^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s']{2,50}$"
                    title="El nombre debe tener entre 2 y 50 caracteres y solo se permiten letras y tildes."
                  />
                </div>
                <div className="w-50%">
                  <InputTextLogin
                    text="apellidos"
                    fieldName="lastname"
                    fieldValue={userData.lastname}
                    onChange={handleInputChange}
                    pattern="^[a-zA-ZáéíóúüÁÉÍÓÚÜ\s']{2,50}$"
                    title="El nombre debe tener entre 2 y 50 caracteres y solo se permiten letras y tildes."
                  />
                </div>
              </div>
              <InputTextLogin
                text="Usuario"
                fieldName="user"
                fieldValue={userData.user}
                onChange={handleInputChange}
                pattern=".{2,50}"
      title="El nombre debe tener entre 2 y 50 caracteres."
                
              />
              <InputTextLogin
                text="Contraseña"
                fieldName="password"
                fieldValue={userData.password}
                onChange={handleInputChange}
                pattern=".{2,}"
      title="El nombre debe tener al menos 2 caracteres."
              />
              <div>
                <Buttons text="Crear cuenta" type="submit" />
              </div>
            </form>
            <p className="mt-5">
              ya tienes una cuenta? &nbsp;
              <a className="text-yellow tex underline" href="/Login">
                incio de sesion
              </a>
            </p>
          </div>
        </div>
        <div className=" basis-1/2 h-full bg-cover bg-center login max-sm:basis-1/3"></div>
      </div>
    </>
  );
}
