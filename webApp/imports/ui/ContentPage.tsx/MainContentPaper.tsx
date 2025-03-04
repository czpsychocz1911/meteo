import { Paper } from "@mui/material";
import React from "react";
import { SensorDataCard } from "../SensorDataCard";
import { SensorDataProvider, useSensorData } from "../SensorDataContext";

export const MainContentPaper : React.FC = () => {

    const { sensorData } = useSensorData()
    
    return(
        <div>
            <Paper elevation={3}>
                <SensorDataCard value={sensorData?.humidity.data.relHum ?? 0} valMax={100} valMin={0}/>
            </Paper>
        </div>
    )
}