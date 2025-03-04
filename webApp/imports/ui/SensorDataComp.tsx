import React from "react";
import { SensorDataProvider } from "./SensorDataContext";


export const SensorDataComp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SensorDataProvider>
      {children}
    </SensorDataProvider>
  );
};