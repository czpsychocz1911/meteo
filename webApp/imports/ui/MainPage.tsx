import React from "react"
import { MainAppBar } from "./AppBar/MainAppBar"
import { MainContentPaper } from "./ContentPage.tsx/MainContentPaper"

export const MainPage: React.FC = () => {


    return(
        <div>
            <MainAppBar/>
            <MainContentPaper/>
        </div>
    )
}