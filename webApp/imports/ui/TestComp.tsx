import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import type { SensorDataResponse } from "../api/methods/redisMethods";

export const TestComp : React.FC = () => {

    const [sensorData, setSensorData] = useState<SensorDataResponse>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchSensorData = () => {
        setLoading(true)
        setError(null)

        Meteor.callAsync("get.sensor.data", (err : Meteor.Error, res) => {
            setLoading(false)

            if(err){
                console.error("Error fetching sensor data", err)
                setError(err.reason || null)
            } else {
                sensorData(res)
                console.log("sensor data:", res)
            }
        })
    }

    return(
        <p>
            ASDF
        </p>
    )
}