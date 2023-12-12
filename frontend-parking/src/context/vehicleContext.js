import { createContext, useContext, useEffect, useState } from "react";
import { createVehicleRequest, getVehicleRequest, getVehiclesRequest } from "../api/vehicleApi";
import { useLocation, useRoute } from "wouter";
import { navigate } from "wouter/use-location";
import { IoLogoClosedCaptioning } from "react-icons/io5";

const VehicleContext = createContext();

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (!context) throw new Error("usevehicles must be used within a vehicleProvider");
  return context;
};

export function VehicleProvider({ children }) {
  const [vehicle, setvehicle] = useState(null);
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/:rest*');

  const vehicleData = async () => {
    try {
      const res = await getVehicleRequest();
    setvehicle(res.data);
    } catch (error) {
      console.log(error)
    }
    
  };


  const vehiclesData = async () => {

    const res = await getVehiclesRequest();
    setvehicle(res.data);
  };

  const createVehicle = async (Vehicle) => {
    try {
      const res = await createVehicleRequest(Vehicle);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };








  useEffect(() => {
    const fetchData = async () => {
      await vehicleData();
    };

    if (!match && !location.includes('/Parking/Login')) {
      const token = localStorage.getItem("token");

      if (!vehicle && token) {
        fetchData();
      } else if (!token) {
        navigate("/parking");
      }
    }
  }, [location, vehicleData, vehicle, match]);


  return (
    <VehicleContext.Provider value={{ vehicle, vehicleData, vehiclesData , createVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
}
