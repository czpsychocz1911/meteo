import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { ParsedHumidity, SensorData } from "../api/links";



export const TestComp : React.FC = () => {

    const [data, setData] = useState<SensorData>()

    const fetchedData = async() => {
        return Meteor.callAsync("get.sensor.data").then((res: SensorData) => {
            const resHumStr : ParsedHumidity  = JSON.parse(res.humidity, (key, val) => {
                if(key === "timestamp"){
                    return new Date(val)
                }

                if(key === "data"){
                    return JSON.parse(val, (index,value) => {
                        if(index === "id"){
                            const sad : string = value
                            return sad
                        }

                        if(index === "createdAt"){
                            return new Date(value)
                        }

                        if(index === "updatedAt"){
                            return new Date(value)
                        }

                        if(index === "relHum"){
                            const sad : string = value
                            return sad
                        }
                    })
                }
            })
            const resSoilStr = res.soil
            const resTempStr = res.temp

            console.log(resHumStr)
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