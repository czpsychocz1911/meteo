import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { HumidityData, ParsedHumidity, SensorData } from "../api/links";
import JSON5 from 'json5'



export const TestComp : React.FC = () => {

    const [data, setData] = useState<SensorData>()

    const fetchedData = async() => {
        return Meteor.callAsync("get.sensor.data").then((res: SensorData) => {
            const humStep: {timestamp: Date, data : string} = JSON5.parse(res.humidity)
            const resSoilStr = res.soil
            const resTempStr = res.temp

            const humStep2: HumidityData = JSON5.parse(humStep.data)

            const result : ParsedHumidity = {
                timestamp: humStep.timestamp,
                data: humStep2
            }

            console.log(result)
            console.log(resSoilStr)
            console.log(resTempStr)
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
        <p>test</p>
        </>
    )
}