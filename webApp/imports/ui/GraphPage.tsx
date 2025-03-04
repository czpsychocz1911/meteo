import React from "react";
import { GraphAppBar } from "./AppBar/GraphAppBar";
import { GraphContentPaper } from "./ContentPage/GraphContentPaper";

export const GraphPage : React.FC = () => {
    return(
        <div>
            <GraphAppBar/>
            <GraphContentPaper/>
        </div>
    )
}