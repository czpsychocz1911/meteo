import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { SensorData } from "../api/links";

export const TestComp : React.FC = () => {

    const [data, setData] = useState<SensorData>()

    const fetchedData = async() => {
        return Meteor.callAsync("get.sensor.data").then((res) => {
            console.log(res)
            setData(res)
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

        console.log(dataUr)

        console.log(data,"REAL")

        const interval = Meteor.setInterval(fetchedData, 1000)

        return () => Meteor.clearInterval(interval)
    })

    return(
        <>
        {data ? <p>{data.humidity.data.relHum}</p>: <p>neni</p>}
        </>
    )
}