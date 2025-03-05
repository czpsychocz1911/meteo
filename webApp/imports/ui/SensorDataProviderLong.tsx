import { Meteor } from "meteor/meteor";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { HistoricalSensorData, HumidityData, ParsedHumidity, ParsedSoil, ParsedTemp, SoilData, TempData } from "/imports/api/links";
import JSON5 from "json5";

export interface SensorDataContextType {
  tempData: ParsedTemp[];
  humData: ParsedHumidity[];
  soilData: ParsedSoil[];
  loading: boolean;
  error: Error | null;
  refreshData: () => Promise<void>;
}

const SensorDataContext = createContext<SensorDataContextType | undefined>(undefined);

export const SensorDataProviderLong: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tempData, setTempData] = useState<ParsedTemp[]>([]);
  const [humData, setHumData] = useState<ParsedHumidity[]>([]);
  const [soilData, setSoilData] = useState<ParsedSoil[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchSensorData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res: HistoricalSensorData = await Meteor.callAsync("get.sensor.data.history");
      
      const tempHist: ParsedTemp[] = [];
      const humHist: ParsedHumidity[] = [];
      const soilHist: ParsedSoil[] = [];
      
      // biome-ignore lint/complexity/noForEach: keeping original structure
      res.temp.forEach((val) => {
        try {
          const tmp: {timestamp: Date, data: string} = JSON5.parse(val);
          const data: TempData = JSON5.parse(tmp.data);
          tempHist.push({ data, timestamp: tmp.timestamp });
        } catch (parseError) {
          console.error("Error parsing temperature data:", parseError);
        }
      });
      
      // biome-ignore lint/complexity/noForEach: keeping original structure
      res.humidity.forEach((val) => {
        try {
          const tmp: {timestamp: Date, data: string} = JSON5.parse(val);
          const data: HumidityData = JSON5.parse(tmp.data);
          humHist.push({ data, timestamp: tmp.timestamp });
        } catch (parseError) {
          console.error("Error parsing humidity data:", parseError);
        }
      });
      
      // biome-ignore lint/complexity/noForEach: keeping original structure
      res.soil.forEach((val) => {
        try {
          const tmp: {timestamp: Date, data: string} = JSON5.parse(val);
          const data: SoilData = JSON5.parse(tmp.data);
          soilHist.push({ data, timestamp: tmp.timestamp });
        } catch (parseError) {
          console.error("Error parsing soil data:", parseError);
        }
      });
      
      setTempData(tempHist);
      setSoilData(soilHist);
      setHumData(humHist);
      
    } catch (err) {
      console.error("Error fetching sensor data:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  };
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: keeping original style
  useEffect(() => {
    fetchSensorData();
  }, []);
  
  const contextValue: SensorDataContextType = {
    tempData,
    humData,
    soilData,
    loading,
    error,
    refreshData: fetchSensorData
  };
  
  return (
    <SensorDataContext.Provider value={contextValue}>
      {children}
    </SensorDataContext.Provider>
  );
};

export const useSensorDataLong = () => {
  const context = useContext(SensorDataContext);
  if (context === undefined) {
    throw new Error("useSensorData must be used within a SensorDataProvider");
  }
  return context;
};