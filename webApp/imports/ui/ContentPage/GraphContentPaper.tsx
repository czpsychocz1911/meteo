import { Paper } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { HistoricalSensorData, HumidityData, ParsedHumidity, ParsedSoil, ParsedTemp, SoilData, TempData } from "/imports/api/links";
import JSON5 from "json5"
import { LineChart } from "@mui/x-charts";

export const GraphContentPaper : React.FC = () => {

    const [tempData, setTempData] = useState<ParsedTemp[]>([])
    const [humData, setHumData] = useState<ParsedHumidity[]>([])
    const [soilData, setSoilData] = useState<ParsedSoil[]>([])

    const [x,setX] = useState<number[]>([])
    const [y,setY] = useState<number[]>([])

    const fetchedHistoricalData = async () => {
        try{
            const res : HistoricalSensorData = await Meteor.callAsync("get.sensor.data.history")
            
            const tempHist : ParsedTemp[] = []
            const humHist : ParsedHumidity[] = []
            const soilHist : ParsedSoil[] = []

            // biome-ignore lint/complexity/noForEach: <explanation>
            res.temp.forEach((val) => {
                const tmp : {timestamp: Date, data : string } = JSON5.parse(val)
                const data : TempData = JSON5.parse(tmp.data)
                const result : ParsedTemp = {
                    data: data,
                    timestamp: tmp.timestamp
                }
                tempHist.push(result)
            })

            // biome-ignore lint/complexity/noForEach: <explanation>
            res.humidity.forEach((val) => {
                const tmp : {timestamp: Date, data : string} = JSON5.parse(val)
                const data : HumidityData = JSON5.parse(tmp.data)
                const result : ParsedHumidity = {
                    data: data,
                    timestamp: tmp.timestamp
                }
                humHist.push(result)
            })

            // biome-ignore lint/complexity/noForEach: <explanation>
            res.soil.forEach((val) => {
                const tmp : {timestamp: Date, data : string} = JSON5.parse(val)
                const data : SoilData = JSON5.parse(tmp.data)
                const result : ParsedSoil = {
                    data: data,
                    timestamp: tmp.timestamp
                }
                soilHist.push(result)
            })

            setTempData(tempHist)
            setSoilData(soilHist)
            setHumData(humHist)

            const asdf : number[] = []
            const wsdf : number[] = []
            
            // biome-ignore lint/complexity/noForEach: <explanation>
            tempHist.forEach((val) => {
                asdf.push(val.data.updatedAt.getTime())
                wsdf.push(val.data.temp)    
            })

            setX(asdf)
            setY(wsdf)

        } catch (err) {
            console.error(err)
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        fetchedHistoricalData()
    },[])

    return(
        <Paper elevation={3}>
            <LineChart series={[{data: y},{data: x}]} xAxis={[{data: x,scaleType: "time"}]} height={500} sx={{width: "100%"}}/>
        </Paper>
    )
}