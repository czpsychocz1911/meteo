import { Stack } from "@mui/material";
import React, { useState } from "react";

function roundValue(val : string | number, roundValue : number){
    if(typeof val !== "number"){
        return val
    }

    if(roundValue < 1){
       return val.toPrecision(1)
    }

    if(roundValue > 21){
       return val.toPrecision(21)
    }

    return val.toPrecision(roundValue)
}

export const SensorComp : React.FC<{value : string | number, unit: string, roundDef? : number}> = ({value, unit, roundDef = 1}) => {

    return(
        <Stack direction="column" spacing={2}>
            <p>{roundValue(value,roundDef)}</p>
            <p>{unit}</p>
        </Stack>
    )
}