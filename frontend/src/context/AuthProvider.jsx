import React, { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [stocks, setStocks] = useState();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response= await axios.get("http://localhost:4000/api/stocks/allstocks")
        // withCredentials:true;
        console.log(response)
        setStocks(response.data)
      } catch (error) {
        console.log("Error fetching stocks:", error);
      }
    };
fetchStocks(); // Call the function
  }, []); 

  return (
    <AuthContext.Provider value={{ stocks}}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth=()=>useContext(AuthContext)