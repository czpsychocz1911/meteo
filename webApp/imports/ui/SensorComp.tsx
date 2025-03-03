import { Stack } from "@mui/material";
import React from "react";

export const SensorComp : React.FC<{value : string | number, unit: string}> = ({value, unit}) => {
    return(
        <Stack direction="row" spacing={2}>
            <p>{value}</p>
            <p>{unit}</p>
        </Stack>
    )
}