import { createContext, useContext, useEffect, useState } from "react";
import { createReserveRequest, getReserveRequest, getReservesRequest } from "../api/reserveApi";
import { useLocation, useRoute } from "wouter";
import { navigate } from "wouter/use-location";

const ReserveContext = createContext();

export const useReserves = () => {
  const context = useContext(ReserveContext);
  if (!context) throw new Error("useReserves must be used within a ReserveProvider");
  return context;
};

export function ReserveProvider({ children }) {
  const [reserve, setReserve] = useState(null);
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/:rest*');

  const reserveData = async () => {
    try {
      const res = await getReserveRequest();
      const data = res.data;
      setReserve(data)
    } catch (error) {
      alert("no hay reservas");
    }
  };

  const reservesData = async () => {
    try {
      const res = await getReservesRequest();
      const data = res.data;
      console.log(data)
      setReserve(data)
    } catch (error) {
      alert(error);
    }
  };

  const createReserve = async (Reserve) => {
    try {
      const res = await createReserveRequest(Reserve);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    const reserveDataInit = async () => {
      try {
        const res = await getReserveRequest();
        const data = res.data;
        setReserve(data)
      } catch (error) {
        alert(error);
      }
    };

    const init = async () => {
      if (!match && !location.includes('/Parking/Login')) {
        const token = localStorage.getItem("token");
  
        if (!reserve && token) {
          await reserveDataInit();
        } else if (!token) {
          navigate("/parking");
        }
      }
    }

    init()
   
  }, [reserve, location, match]);


  return (
    <ReserveContext.Provider value={{ reserve, reserveData, reservesData, createReserve }}>
      {children}
    </ReserveContext.Provider>
  );
}
