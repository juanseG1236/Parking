import axios from "axios";
import apiURL from '../config.js';

const headers = {
  'authorization': `${sessionStorage.getItem("token")}`,
};

export const createVehicleRequest = async (Vehicle) => {
  return await axios.post(`${apiURL}/api/Vehicles`, Vehicle, { headers });
};

export const updateVehicleRequest = async (Vehicle) => {
  return await axios.put(`${apiURL}/api/Vehicle/${Vehicle._id}`, Vehicle);
};

export const deleteVehicleRequest = async (id) => {
  return await axios.delete(`${apiURL}/api/Vehicle/${id}`);
};

export const getVehicleRequest = async () => {
  return await axios.get(`${apiURL}/api/Vehicles/Find`, { headers });
};

export const getVehiclesRequest = async () => {
  return await axios.get(`${apiURL}/api/Vehicles`, { headers });
};
