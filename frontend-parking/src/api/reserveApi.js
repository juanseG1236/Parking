import axios from "axios";


export const getReservesRequest = async () =>{
  const  headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  
   return await axios.get('http://192.168.50.186:4000/api/Reserve', { headers })
  }
export const createReserveRequest = async (Reserve) =>{
  const  headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };

   return await axios.post('http://192.168.50.186:4000/api/Reserve', Reserve , { headers })
  }


export const updateReserveRequest = async (Reserve) =>
  axios.put(`/api/Reserve/${Reserve._id}`, Reserve);

export const deleteReserveRequest = async (id) => axios.delete(`/api/Reserve/${id}`);

export const getReserveRequest = async () =>{
  const  headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  
   return await axios.get('http://192.168.50.186:4000/api/Reserve/Find', { headers })
  }

