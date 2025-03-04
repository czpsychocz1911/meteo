import { Meteor } from "meteor/meteor";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { ParsedSensorData, SensorData } from "../api/links";
import { getSensorData } from "../api/helpers/utils";

type SensorContextType = {
  sensorData: ParsedSensorData | undefined;
  loading: boolean;
  error: Error | null;
};

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const SensorDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sensorData, setSensorData] = useState<ParsedSensorData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSensorData = async () => {
    try {
      setLoading(true);
      const res: SensorData = await Meteor.callAsync("get.sensor.data");

      const result = getSensorData(res)
      
      setSensorData(result);
      setError(null);
    } catch (err) {
      if (err instanceof Meteor.Error) {
        console.error(err);
        setError(err);
      } else if (err instanceof Error) {
        console.error(err);
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSensorData();
    const interval = Meteor.setInterval(fetchSensorData, 1000);
    return () => Meteor.clearInterval(interval);
  });

  const value = {
    sensorData,
    loading,
    error
  };

  return <SensorContext.Provider value={value}>{children}</SensorContext.Provider>;
};

export const useSensorData = () => {
  const context = useContext(SensorContext);
  if (context === undefined) {
    throw new Error('useSensorData must be used within a SensorDataProvider');
  }
  return context;
};