import React from "react"
import { MainAppBar } from "./MainAppBar"
import { SensorDataComp } from "./SensorDataComp"

export const MainPage: React.FC = () => {


    return(
        <div>
            <MainAppBar/>
            <SensorDataComp/>
        </div>
    )
}