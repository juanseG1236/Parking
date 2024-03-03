import axios from "axios";


export const createVehicleRequest = async (Vehicle) =>{
  const  headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  alert(sessionStorage.getItem("token"))
   return await axios.post('http://192.168.50.186:4000/api/Vehicles', Vehicle , { headers })
  }


export const updateVehicleRequest = async (Vehicle) =>
  axios.put(`/api/Vehicle/${Vehicle._id}`, Vehicle);

export const deleteVehicleRequest = async (id) => axios.delete(`/api/Vehicle/${id}`);

export const getVehicleRequest = async () =>{
  const  headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
  
   return await axios.get('http://192.168.50.186:4000/api/Vehicles/Find', { headers })
  }


  export const getVehiclesRequest = async () =>{
    const  headers = {
      'authorization': `${sessionStorage.getItem("token")}`,
    };
    
     return await axios.get('http://192.168.50.186:4000/api/Vehicles', { headers })
    }

  
