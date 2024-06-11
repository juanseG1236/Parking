import axios from "axios";
import apiURL from '../config.js';

export const getReservesRequest = async () => {
  const headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  return await axios.get(`${apiURL}/api/Reserve`, { headers });
}

export const createReserveRequest = async (Reserve) => {
  const headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  return await axios.post(`${apiURL}/api/Reserve`, Reserve, { headers });
}

export const updateReserveRequest = async (Reserve) => {
  return axios.put(`${apiURL}/api/Reserve/${Reserve._id}`, Reserve);
}

export const deleteReserveRequest = async (id) => {
  return axios.delete(`${apiURL}/api/Reserve/${id}`);
}

export const getReserveRequest = async () => {
  const headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  return await axios.get(`${apiURL}/api/Reserve/Find`, { headers });
}
