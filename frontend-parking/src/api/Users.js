import axios from "axios";
import apiURL from '../config.js';


const headers = {
  'authorization': `${sessionStorage.getItem("token")}`,
};

console.log(headers)

export const getUsersRequest = async () => axios.get(`${apiURL}/api/User`);

export const createUserRequest = async (User) => axios.post(`${apiURL}/api/User`, User);

export const updateUserRequest = async (id, User) =>
  axios.put(`${apiURL}/api/User/${id}`, User);

export const deleteUserRequest = async (id) => axios.delete(`${apiURL}/api/User/${id}`);

export const getUserRequest = async () => {
  const headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };

  console.log(sessionStorage.getItem("token"));
  console.log(headers);

  return await axios.get(`${apiURL}/api/User/Data`, { headers });
};