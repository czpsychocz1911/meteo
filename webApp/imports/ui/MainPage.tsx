import React, { useEffect } from "react"
import { MainAppBar } from "./MainAppBar"
import { useTracker } from 'meteor/react-meteor-data';
import { TempModelCollection } from "../api/links";

export const MainPage: React.FC = () => {

    const tempData = useTracker(() => TempModelCollection.find({}).fetch());

    useEffect(() => {
        console.log(tempData)
    },[tempData])

    return(
        <div>
            <MainAppBar/>
        </div>
    )
}