import axios from "axios";
import apiURL from '../config.js';

const headers = {
  authorization: `${sessionStorage.getItem("token")}`,
};

export const getTicketsRequest = async () => {
  return await axios.get(`${apiURL}/api/Ticket`, { headers });
};

export const getTicketExitRequest = async (ticket) => {
  return await axios.post(`${apiURL}/api/Ticket/Exit`, ticket, { headers });
};

export const createticketRequest = async (ticket) => {
  return await axios.post(`${apiURL}/api/Ticket/`, ticket, { headers });
};

export const updateticketRequest = async (ticket) =>
  axios.put(`${apiURL}/api/ticket/${ticket._id}`, ticket);

export const deleteticketRequest = async (id) =>
  axios.delete(`${apiURL}/api/ticket/${id}`);

export const getTicketRequest = async (p) => {
  if (p) {
    return await axios.get(`${apiURL}/api/Ticket/Find`, { headers });
  } else {
    return await axios.get(`${apiURL}/api/Ticket/FindP`, { headers });
  }
};
