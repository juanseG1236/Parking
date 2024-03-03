import React from "react";
import Logo from "./Logo";
import { IoExitOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom"; // Cambiado a react-router-dom
import { useMediaQuery } from "@react-hook/media-query";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const location = useLocation();
  const user = location.pathname.startsWith("/User"); // Verifica si la ruta comienza con "/User"


  return (
    <>
      {isMobile ? (
        <nav className="bg-[#fff] drop-shadow-2xl">
          <div className="flex flex-row h-12 w-screen justify-between bg-darkBlue">
            <div className="h-full basis-40 bg-darkBlue">
              <div className="h-full w-full flex">
                <Link to="/">
                  <a className="w-full h-full">
                    <Logo />
                  </a>
                </Link>
              </div>
            </div>

            <div className="bg-yellow basis-12 flex justify-center items-center">
              <IoExitOutline className="h-full w-10/12" />
            </div>
          </div>
          <div className="flex justify-center items-center">
            <ul className="flex flex-row items-center w-full  justify-evenly h-16">
              <li>
                <Link to={`/${user ? "User" : "Admin"}/Dashboard`}>
                  <a
                    className="pt-1 relative font-bold text-xl  group"
                  >
                    Dashboard
                    <span className="bg-yellow absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to={`/${user ? "User" : "Admin"}/Reservation`}>
                  <a
                    className="pt-1 relative font-bold text-xl group"
                  >
                    Reserva
                    <span className="bg-yellow absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                  </a>
                </Link>
              </li>
              <li>
                <Link to={`/${user ? "User" : "Admin"}/Register`}>
                  <a className="pt-1 relative font-bold text-xl group">
                    Registro
                    <span className="bg-yellow absolute -top-3 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <nav className="bg-[#fff] drop-shadow-2xl w-screen">
          <div className="flex flex-row h-16 w-screen justify-between">
            <div className="h-full basis-40 bg-darkBlue">
              <div className="h-full w-full flex">
                <Link to="/">
                  <a className="w-full h-full">
                    <Logo />
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <ul className="flex flex-row items-center gap-32 h-full">
                <li>
                  <Link to={`/${user ? "User" : "Admin"}/Dashboard`}>
                    <a
                      className="pt-1 relative font-bold text-2xl group"
                    >
                      Dashboard
                      <span className="bg-yellow absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={`/${user ? "User" : "Admin"}/Reservation`}>
                    <a
                      className="pt-1 relative font-bold text-2xl group"
                    >
                      Reserva
                      <span className="bg-yellow absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link to={`/${user ? "User" : "Admin"}/Register`}>
                    <a className="pt-1 relative font-bold text-2xl group">
                    Registro

                      <span className="bg-yellow absolute -top-3 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="bg-yellow basis-12 flex justify-center items-center">
              <Link to="/">
                <a className="w-full h-full">
                  <IoExitOutline className="h-full w-9/12" />
                </a>
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
