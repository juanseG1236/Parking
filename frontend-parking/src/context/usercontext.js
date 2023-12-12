import { createContext, useContext, useEffect, useState } from "react";
import { getUserRequest, updateUserRequest } from "../api/Users";
import { useLocation, useRoute } from "wouter";
import { navigate } from "wouter/use-location";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useLocation();
  const [match, params] = useRoute('/:rest*');

  const userData = async () => {

    const res = await getUserRequest();
    setUser(res.data);

  };


  const updateUser = async (userUpdate) => {
    try {
      const response = await updateUserRequest(user._id ,userUpdate);
      alert("actualizado")
      return response
    } catch (error) {
      console.error(error);
    }
  };






  useEffect(() => {
    const fetchData = async () => {
      await userData();
    };

    if (!match && !location.includes('/Parking/Login')) {
      const token = localStorage.getItem("token");

      if (!user && token) {
        fetchData();
      } else if (!token) {
        navigate("/parking");
      }
    }
  }, [location, userData, user, match]);


  return (
    <UserContext.Provider value={{ user, userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
