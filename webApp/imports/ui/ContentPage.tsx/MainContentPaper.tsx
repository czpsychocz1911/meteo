import { Paper } from "@mui/material";
import React from "react";
import { SensorDataCard } from "../SensorDataCard";

export const MainContentPaper : React.FC = () => {
    return(
        <div>
            <Paper elevation={3}>
                <SensorDataCard/>
            </Paper>
        </div>
    )
}