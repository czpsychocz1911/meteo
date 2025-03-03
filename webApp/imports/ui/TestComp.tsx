import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { SensorDataResponse } from "../api/methods/redisMethods";

export const TestComp : React.FC = () => {

    const [sensorData, setSensorData] = useState<SensorDataResponse>()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchSensorData =  async() => {
        setLoading(true)
        setError(null)

        Meteor.callAsync("get.sensor.data", (err : Meteor.Error, res : SensorDataResponse) => {
            setLoading(false)

            if(err){
                console.error("Error fetching sensor data", err)
                setError(err.reason || null)
            } else {
                setSensorData(res)
                console.log("sensor data:", res)
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await fetchSensorData()
        }

        fetchData()

        const interval = Meteor.setInterval(fetchSensorData,30000)

        return () => Meteor.clearInterval(interval)
    })

    return(
        <p>
            ASDF
        </p>
    )
}