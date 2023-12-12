import { createContext, useContext, useEffect, useState } from "react";
import { createticketRequest, getTicketExitRequest, getTicketRequest, getTicketsRequest } from "../api/ticketApi";
import { useLocation, useRoute } from "wouter";
import { navigate } from "wouter/use-location";

const TicketContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) throw new Error("usetickets must be used within a ticketProvider");
  return context;
};

export function TicketProvider({ children }) {
  const [ticket, setticket] = useState(null);
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/:rest*');

  const ticketData = async (p) => {
    
    try {
      if (p) {
        const res = await getTicketRequest(p);
        setticket(res.data);
        console.log(ticket)

      } else {
        const res = await getTicketRequest(p);
        setticket(res.data);
        console.log(ticket)

      }
    } catch (error) {
      console.log(error)
    }
  
   
  };

  const ticketsData = async () => {
    
      const res = await getTicketsRequest() ;
      setticket(res.data);
      console.log(res.data)
  };

  const createTicket = async (ticket) => {
    try {
      const res = await createticketRequest(ticket);
      console.log(res.data);
      return res
    } catch (error) {
      console.log(error);
    }
  };

  const exitTicket = async (ticket) => {
    try {
      const res = await getTicketExitRequest(ticket);
      console.log(res.data);
      return res
    } catch (error) {
      console.log(error);
    }
  };





  useEffect(() => {
    const fetchData = async (p) => {
      await ticketData(p);

    };

    if (!match && !location.includes('/Parking/Login')) {
      const token = localStorage.getItem("token");

      if (!ticket && token) {
        fetchData(false);
      } else if (!token) {
        navigate("/parking");
      }
    }
  }, [location, ticket, ticketData, match]);


  return (
    <TicketContext.Provider value={{ ticket,ticketsData, exitTicket,createTicket,ticketData }}>
      {children}
    </TicketContext.Provider>
  );
}
