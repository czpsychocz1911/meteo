import { Meteor } from "meteor/meteor";
import React, { useEffect } from "react";

export const GraphContentPaper : React.FC = () => {

    const fetchedHistoricalData = async () => {
        const res = await Meteor.callAsync("get.sensor.data.history")

        console.log(res)
    }

    useEffect(() => {
        fetchedHistoricalData()
    })

    return(
        <p>TEST</p>
    )
}