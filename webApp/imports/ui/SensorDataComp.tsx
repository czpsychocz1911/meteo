import { Stack } from "@mui/material";
import React from "react";

export const SensorDataComp: React.FC<{value: string | number, unit: string, roundDec?: number}> = ({value,unit, roundDec = 1}) => {

    const updatedValue = () => {
        if(typeof value === "string"){
            return value
        }

        if(roundDec >= 1 || roundDec <= 21){
            return value.toPrecision(roundDec)
        }

        if(roundDec <= 1){
            return value
        }

        if(roundDec >= 21){
            return value.toPrecision(21)
        }
    }

    return(
        <Stack direction="column" spacing={2}>
            <p>{updatedValue()}</p>
            <p>{unit}</p>
        </Stack>
    )
}