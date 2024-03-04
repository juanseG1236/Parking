import axios from "axios";
import apiURL from '../config.js';

const headers = {
  'authorization': `${sessionStorage.getItem("token")}`,
};

export const getUsersRequest = async () => axios.get(`${apiURL}/api/User`);

export const createUserRequest = async (User) => axios.post(`${apiURL}/api/User`, User);

export const updateUserRequest = async (id, User) =>
  axios.put(`${apiURL}/api/User/${id}`, User);

export const deleteUserRequest = async (id) => axios.delete(`${apiURL}/api/User/${id}`);

export const getUserRequest = async () => {
  return await axios.get(`${apiURL}/api/User/Data`, { headers });
};
