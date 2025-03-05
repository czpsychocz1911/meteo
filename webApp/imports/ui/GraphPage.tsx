import React from "react";
import { GraphAppBar } from "./AppBar/GraphAppBar";
import { GraphContentPaper } from "./ContentPage/GraphContentPaper";
import { SensorDataProviderLong } from "./SensorDataProviderLong";

export const GraphPage : React.FC = () => {
    return(
        <div>
            <GraphAppBar/>
            <SensorDataProviderLong>
                <GraphContentPaper/>
            </SensorDataProviderLong>
        </div>
    )
}