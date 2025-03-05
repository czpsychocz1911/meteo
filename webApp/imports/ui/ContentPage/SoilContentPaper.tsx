import React from "react";
import { GraphAppBar } from "../AppBar/GraphAppBar";
import { SensorDataProviderLong } from "../SensorDataProviderLong";
import { SoilPaper } from "./SoilPaper";

export const SoilContentPaper : React.FC = () => {
    return(
        <div>
            <GraphAppBar header="Graph page"/>
            <SensorDataProviderLong>
                <SoilPaper/>
            </SensorDataProviderLong>
        </div>
    )
}