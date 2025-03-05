import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import { useSensorDataLong } from "../SensorDataProviderLong";

export const GraphContentPaper: React.FC = () => {


    const [x, setX] = useState<number[]>([])
    const [y, setY] = useState<number[]>([])

    const data = useSensorDataLong()

    const handleData = () => {
        const temp : number[] = []
        const time : number[] = []

        data.tempData.forEach((val,index) => {
            if(val.data?.updatedAt){
                time.push(new Date(val.data.updatedAt).getTime())
                temp.push(Number(val.data.temp))
            }
        })

        setX(time)
        setY(temp)
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        handleData()
    },[data])

    return (
        <Paper elevation={3}>
            <LineChart 
                series={[
                    { data: y, label: 'Temperature', color: '#ff6384' }
                ]} 
                xAxis={[
                    { data: x, scaleType: "time" }
                ]} 
                height={450} 
                sx={{ width: "100%" }}
            />
        </Paper>
    );
};