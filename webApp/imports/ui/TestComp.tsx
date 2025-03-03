import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { SensorData } from "../api/links";

export const TestComp : React.FC = () => {

    const [data, setData] = useState<SensorData>()

    const fetchedData = async() => {
        return Meteor.callAsync("get.sensor.data").then((res: SensorData) => {
            setData(res)

            console.log(res, "res its self")
            console.log(() => (typeof res.humidity === "string"), "type of res.humidity")
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