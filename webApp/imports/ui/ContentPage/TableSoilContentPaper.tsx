import React from "react";
import { GraphAppBar } from "../AppBar/GraphAppBar";
import { TableSoil } from "./TableSoil";

export const TableSoilContentPaper : React.FC = () => {
    return(
        <div>
            <GraphAppBar header="Table page"/>
            <TableSoil/>
        </div>
    )
}