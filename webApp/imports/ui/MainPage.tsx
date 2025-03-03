import React from "react"
import { MainAppBar } from "./MainAppBar"
import { TestComp } from "./TestComp"

export const MainPage: React.FC = () => {


    return(
        <div>
            <MainAppBar/>
            <TestComp/>
        </div>
    )
}