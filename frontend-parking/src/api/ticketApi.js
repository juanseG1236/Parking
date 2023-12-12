import axios from "axios";

export const getTicketsRequest = async (p) => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };

  return await axios.get("http://localhost:4000/api/Ticket", { headers });
};

export const getTicketExitRequest = async (ticket) => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };

  return await axios.post("http://localhost:4000/api/Ticket/Exit", ticket, {
    headers,
  });
};

export const createticketRequest = async (ticket) => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };
  return await axios.post("http://localhost:4000/api/Ticket/", ticket, {
    headers,
  });
};

export const updateticketRequest = async (ticket) =>
  axios.put(`/api/ticket/${ticket._id}`, ticket);

export const deleteticketRequest = async (id) =>
  axios.delete(`/api/ticket/${id}`);

export const getTicketRequest = async (p) => {
  const headers = {
    authorization: `${sessionStorage.getItem("token")}`,
  };

  if (p) {
    return await axios.get("http://localhost:4000/api/Ticket/Find", {
      headers,
    });
  } else {
    return await axios.get("http://localhost:4000/api/Ticket/FindP", {
      headers,
    });
  }
};
