import React from "react";
import { useSensorData } from "./SensorContext";
import { SensorComp } from "./SensorComp";

export const SensorCompLiveFeed: React.FC = () => {
    const { sensorData } = useSensorData();
    
    return (
        <>
            <SensorComp unit={sensorData?.temp.data.temp_unit ?? "C"} value={sensorData?.temp.data.temp ?? ""} sensorType="Temperature"/>
            <SensorComp unit={"%"} value={sensorData?.soil.data.soilHumidity ?? ""} sensorType="Soil humidity"/>
            <SensorComp unit={"%"} value={sensorData?.humidity.data.relHum ?? ""} sensorType="Humidity"/>
        </>
    );
}