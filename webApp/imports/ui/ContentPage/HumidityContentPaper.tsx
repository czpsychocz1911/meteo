import React from "react";
import { GraphAppBar } from "../AppBar/GraphAppBar";
import { SensorDataProviderLong } from "../SensorDataProviderLong";
import { HumidityPaper } from "./HumidityPaper";

export const HumidityContentPaper : React.FC = () => {
    return(
        <div>
            <GraphAppBar/>
            <SensorDataProviderLong>
                <HumidityPaper/>
            </SensorDataProviderLong>
        </div>
    )
}