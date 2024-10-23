import React, { createContext, useState, useContext } from "react";
const GlobalContext = createContext();

// Proveedor del contexto
export const GlobalProvider = ({ children }) => {
  const [apples, setApples] = useState(0);

  const addApples = () => {
    setApples((prev) => (prev < 100 ? prev + 1 : prev));
  };

  const removeApples = () => {
    setApples((prev) => (prev != 0 ? prev - 1 : 0));
  };

  return (
    <GlobalContext.Provider
      value={{ apples, setApples, addApples, removeApples }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Hook para usar el contexto
export const useGlobalContext = () => useContext(GlobalContext);
