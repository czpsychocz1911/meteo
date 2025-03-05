import React from "react";
import { GraphAppBar } from "../AppBar/GraphAppBar";
import { SensorDataProviderLong } from "../SensorDataProviderLong";
import { TableTemp } from "./TableTemp";

export const TableContentTempPaper : React.FC = () => {
    return(
        <div>
            <GraphAppBar header="Table page"/>
            <TableTemp/>
        </div>
    )
}