import React, { useEffect, useState } from "react";
import { useSensorDataLong } from "../SensorDataProviderLong";
import { Paper } from "@mui/material";
import { LineChart } from "@mui/x-charts";

export const HumidityPaper : React.FC = () => {

        const [x, setX] = useState<number[]>([])
        const [y, setY] = useState<number[]>([])
    
        const data = useSensorDataLong()

        const handleData = () => {
            const humidity : number[] = []
            const time : number[] = []

            data.humData.forEach((val,index) => {
                if(val.data?.updatedAt){
                    time.push(new Date(val.data.updatedAt).getTime())
                    humidity.push(Number(val.data.relHum))
                }
            })

            setX(time)
            setY(humidity)
        }

        // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
            handleData()
        },[data])

    return (
        <Paper elevation={3}>
        <LineChart 
            series={[
                { data: y, label: 'Humidity', color: '#ff6384' }
            ]} 
            xAxis={[
                { data: x, scaleType: "time" }
            ]} 
            height={500} 
            sx={{ width: "100%" }}
        />
    </Paper>
    )
}