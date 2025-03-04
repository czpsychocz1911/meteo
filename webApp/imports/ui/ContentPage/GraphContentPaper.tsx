import { Paper } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useEffect } from "react";
import type { HistoricalSensorData, HumidityData, ParsedHumidity, ParsedSoil, ParsedTemp, SoilData, TempData } from "/imports/api/links";
import JSON5 from "json5"

export const GraphContentPaper : React.FC = () => {

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
                const data : HumidityData = JSON5.parse(val)
                const result : ParsedHumidity = {
                    data: data,
                    timestamp: tmp.timestamp
                }
                humHist.push(result)
            })

            // biome-ignore lint/complexity/noForEach: <explanation>
            res.soil.forEach((val) => {
                const tmp : {timestamp: Date, data : string} = JSON5.parse(val)
                const data : SoilData = JSON5.parse(val)
                const result : ParsedSoil = {
                    data: data,
                    timestamp: tmp.timestamp
                }
                soilHist.push(result)
            })

            console.log(tempHist)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchedHistoricalData()
    })

    return(
        <Paper elevation={3}>

        </Paper>
    )
}