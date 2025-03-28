import { Stack } from "@mui/material";
import React from "react";

function roundValue(val : string | number, roundValue : number){
    if (typeof val !== "number") {
        return val.toString();
    }
    const precision = Math.max(1, Math.min(21, roundValue));
    const formattedNumber = val.toFixed(precision);
    return formattedNumber.replace(/\.?0+$/, '');
}

export const SensorComp : React.FC<{value : string | number, unit: string, roundDef? : number, sensorType: string}> = ({value, unit, roundDef = 1, sensorType}) => {

    return(
        <Stack direction="column" spacing={1}>
            <p>{sensorType}</p>
            <p>{roundValue(value,roundDef)}{unit}</p>
        </Stack>
    )
}