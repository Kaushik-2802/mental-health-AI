import React, { createContext, useState, useContext } from 'react';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  // Function to add a new alert
  const addAlert = (patient, message) => {
    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: prevAlerts.length + 1, patient, severity: "high", message, timestamp: new Date() }
    ]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
