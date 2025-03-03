import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { SensorData } from "../api/links";

export const TestComp : React.FC = () => {

    const [data, setData] = useState<SensorData>()

    const fetchedData = async() => {
        return Meteor.callAsync("get.sensor.data").then((res: SensorData) => {
            setData(res)

            const test = JSON.parse(res.humidity)
            console.log(test)
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