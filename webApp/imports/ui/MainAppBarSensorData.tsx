import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { SensorDataResponse } from "../api/methods/redisMethods";
import { SensorDataComp } from "./SensorDataComp";

export const MainAppBarSensorData: React.FC = () => {

    const [data,setData] = useState<SensorDataResponse>()
    const [err,setErr] = useState(false)
    const [errMsg, setErrMsg] = useState("")

	const fetchedData = async () => {
		return Meteor.callAsync("get.sensor.data")
			.then((res : SensorDataResponse) => {
                setData(res)
			})
			.catch((err) => {
				if (err instanceof Meteor.Error) {
                    setErr(true)
                    setErrMsg(err.message)
				}
			});
	};

    useEffect(() => {
        const funf = async() => {
            await fetchedData
        }
        funf()

        const interval = Meteor.setInterval(fetchedData, 1000)

        return () => Meteor.clearInterval(interval)
    },)

	return (
        <>
        {data ? <SensorDataComp unit={"%"} value={data.humidity.relHum}/>:<p>no succ</p>}
        </>
    )
};
