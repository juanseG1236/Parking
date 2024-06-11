import axios from "axios";
import apiURL from '../config.js';

export const getTicketsRequest = async () => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };
  return await axios.get(`${apiURL}/api/Ticket`, { headers });
};

export const getTicketExitRequest = async (ticket) => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };
  return await axios.post(`${apiURL}/api/Ticket/Exit`, ticket, { headers });
};

export const createticketRequest = async (ticket) => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };
  return await axios.post(`${apiURL}/api/Ticket/`, ticket, { headers });
};

export const updateTicketRequest = async (ticket) => {
  return axios.put(`${apiURL}/api/ticket/${ticket._id}`, ticket);
};

export const deleteTicketRequest = async (id) => {
  return axios.delete(`${apiURL}/api/ticket/${id}`);
};

export const getTicketRequest = async (p) => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };
  if (p) {
    return await axios.get(`${apiURL}/api/Ticket/Find`, { headers });
  } else {
    return await axios.get(`${apiURL}/api/Ticket/FindP`, { headers });
  }
};
