import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { HumidityData, ParsedHumidity, ParsedSensorData, ParsedSoil, ParsedTemp, SensorData, SoilData, TempData } from "../api/links";
import JSON5 from 'json5'
import { SensorComp } from "./SensorComp";



export const SensorDataComp : React.FC = () => {

    const [data, setData] = useState<ParsedSensorData>()

    const fetchedData = async() => {
        return Meteor.callAsync("get.sensor.data").then((res: SensorData) => {
            const humStep: {timestamp: Date, data : string} = JSON5.parse(res.humidity)
            const humStep2: HumidityData = JSON5.parse(humStep.data)
            const humRes : ParsedHumidity = {
                timestamp: humStep.timestamp,
                data: humStep2
            }

            
            const soilStep: {timestamp : Date, data: string} = JSON5.parse(res.soil)
            const soilStep2: SoilData = JSON5.parse(soilStep.data)
            const soilRes : ParsedSoil = {
                timestamp: soilStep.timestamp,
                data: soilStep2
            }

            const tempStep: {timestamp: Date, data: string} = JSON5.parse(res.temp)
            const tempStep2: TempData = JSON5.parse(tempStep.data)
            const tempRes : ParsedTemp = {
                data: tempStep2,
                timestamp: tempStep.timestamp
            }

            const result : ParsedSensorData = {
                humidity: humRes,
                soil: soilRes,
                temp: tempRes
            }

            setData(result)
        }).catch((err) => {
            if(err instanceof Meteor.Error){
                console.error(err)
            }
        })
    }

    useEffect(() => {
        const dataUr = async() => {
            await fetchedData()
        }

        const interval = Meteor.setInterval(fetchedData, 1000)

        return () => Meteor.clearInterval(interval)
    })

    return(
        <>
        <SensorComp value={data?.humidity.data.relHum ?? ""} unit={"%"} sensorType="Relative humidity"/> 
        <SensorComp value={data?.soil.data.soilHumidity ?? ""} unit={"%"} sensorType="Soil humidity"/>
        <SensorComp value={data?.temp.data.temp ?? ""} unit={data?.temp.data.temp_unit ?? "C"} sensorType="Temperature"/>
        </>
    )
}