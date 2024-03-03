import axios from "axios";


export const getUsersRequest = async () => axios.get("/api/User");

export const createUserRequest = async (User) => axios.post("/api/User", User);

export const updateUserRequest = async (id,User) =>
  axios.put(`http://:4000/api/User/${id}`, User);

export const deleteUserRequest = async (id) => axios.delete(`/api/User/${id}`);

export const getUserRequest = async () =>{
  const  headers = {
    'authorization': `${sessionStorage.getItem("token")}`,
  };
   return await axios.get('http://192.168.50.186:4000/api/User/Data', { headers })
  }

