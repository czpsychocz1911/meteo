import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { SensorDataResponse } from "../api/methods/redisMethods";

export const TestComp : React.FC = () => {

    const fetchedData = async() => {
        return Meteor.callAsync("get.sensor.data").then((res) => {
            console.log(res)
        }).catch((err) => {
            if(err instanceof Meteor.Error){
                console.error(err)
            }
        })
    }

    useEffect(() => {
        const data = async() => {
            await fetchedData()
        }

        const interval = Meteor.setInterval(fetchedData, 1000)

        return () => Meteor.clearInterval(interval)
    })

    return(
        <p>
            ASDF
        </p>
    )
}