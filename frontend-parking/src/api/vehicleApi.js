import axios from "axios";
import apiURL from '../config.js';

export const createVehicleRequest = async (Vehicle) => {
  const headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  return await axios.post(`${apiURL}/api/Vehicles`, Vehicle, { headers });
};

export const updateVehicleRequest = async (Vehicle) => {
  return await axios.put(`${apiURL}/api/Vehicle/${Vehicle._id}`, Vehicle);
};

export const deleteVehicleRequest = async (id) => {
  return await axios.delete(`${apiURL}/api/Vehicle/${id}`);
};

export const getVehicleRequest = async () => {
  const headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  return await axios.get(`${apiURL}/api/Vehicles/Find`, { headers });
};

export const getVehiclesRequest = async () => {
  const headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  return await axios.get(`${apiURL}/api/Vehicles`, { headers });
};
