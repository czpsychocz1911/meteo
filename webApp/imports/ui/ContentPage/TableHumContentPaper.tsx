import React from "react";
import { GraphAppBar } from "../AppBar/GraphAppBar";
import { TableHum } from "./TableHum";

export const TableHumContentPaper : React.FC = () => {
    return(
        <div>
            <GraphAppBar header="Table page"/>
            <TableHum/>
        </div>
    )
}