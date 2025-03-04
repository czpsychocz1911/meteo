import { Stack } from "@mui/material";
import React from "react";

function roundValue(val : string | number, roundValue : number){
    // If value is not a number, return it as is
    if (typeof val !== "number") {
        return val.toString();
    }
    const precision = Math.max(1, Math.min(21, roundValue));
    const formattedNumber = val.toFixed(precision);
    return formattedNumber.replace(/\.?0+$/, '');
}

export const SensorComp : React.FC<{value : string | number, unit: string, roundDef? : number}> = ({value, unit, roundDef = 1}) => {

    return(
        <Stack direction="column" spacing={2}>
            <p>{roundValue(value,roundDef)}</p>
            <p>{unit}</p>
        </Stack>
    )
}