import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        
        
      } catch (error) {
        console.log("Error fetching stocks:", error);
      }
    };
fetchBlogs(); // Call the function
  }, []); 

  return (
    <AuthContext.Provider value={{ }}>
      {children}
    </AuthContext.Provider>
  );
};
