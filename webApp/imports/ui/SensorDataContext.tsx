import { Meteor } from "meteor/meteor";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { HumidityData, ParsedHumidity, ParsedSensorData, ParsedSoil, ParsedTemp, SensorData, SoilData, TempData } from "../api/links";
import JSON5 from 'json5';

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
      
      const humStep: {timestamp: Date, data: string} = JSON5.parse(res.humidity);
      const humStep2: HumidityData = JSON5.parse(humStep.data);
      const humRes: ParsedHumidity = {
        timestamp: humStep.timestamp,
        data: humStep2
      };
      
      const soilStep: {timestamp: Date, data: string} = JSON5.parse(res.soil);
      const soilStep2: SoilData = JSON5.parse(soilStep.data);
      const soilRes: ParsedSoil = {
        timestamp: soilStep.timestamp,
        data: soilStep2
      };
      
      const tempStep: {timestamp: Date, data: string} = JSON5.parse(res.temp);
      const tempStep2: TempData = JSON5.parse(tempStep.data);
      const tempRes: ParsedTemp = {
        data: tempStep2,
        timestamp: tempStep.timestamp
      };
      
      const result: ParsedSensorData = {
        humidity: humRes,
        soil: soilRes,
        temp: tempRes
      };
      
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