import { Paper } from "@mui/material";
import { Meteor } from "meteor/meteor";
import React, { useEffect, useState } from "react";
import type { HistoricalSensorData, HumidityData, ParsedHumidity, ParsedSoil, ParsedTemp, SoilData, TempData } from "/imports/api/links";
import JSON5 from "json5";
import { LineChart } from "@mui/x-charts";

export const GraphContentPaper: React.FC = () => {
    const [tempData, setTempData] = useState<ParsedTemp[]>([]);
    const [humData, setHumData] = useState<ParsedHumidity[]>([]);
    const [soilData, setSoilData] = useState<ParsedSoil[]>([]);
    const [x, setX] = useState<number[]>([]);
    const [y, setY] = useState<number[]>([]);

    const fetchedHistoricalData = async () => {
        try {
            const res: HistoricalSensorData = await Meteor.callAsync("get.sensor.data.history");
           
            const tempHist: ParsedTemp[] = [];
            const humHist: ParsedHumidity[] = [];
            const soilHist: ParsedSoil[] = [];
            
            // biome-ignore lint/complexity/noForEach: <explanation>
                                    res.temp.forEach((val) => {
                const tmp: {timestamp: Date, data: string} = JSON5.parse(val);
                const data: TempData = JSON5.parse(tmp.data);
                tempHist.push({ data, timestamp: tmp.timestamp });
            });
            
            // biome-ignore lint/complexity/noForEach: <explanation>
                                    res.humidity.forEach((val) => {
                const tmp: {timestamp: Date, data: string} = JSON5.parse(val);
                const data: HumidityData = JSON5.parse(tmp.data);
                humHist.push({ data, timestamp: tmp.timestamp });
            });
            
            // biome-ignore lint/complexity/noForEach: <explanation>
                                    res.soil.forEach((val) => {
                const tmp: {timestamp: Date, data: string} = JSON5.parse(val);
                const data: SoilData = JSON5.parse(tmp.data);
                soilHist.push({ data, timestamp: tmp.timestamp });
            });
            
            setTempData(tempHist);
            setSoilData(soilHist);
            setHumData(humHist);
            
            // Create x (timestamps) and y (temperature values) arrays for chart
            const timestamps: number[] = [];
            const tempValues: number[] = [];
            
            // biome-ignore lint/complexity/noForEach: <explanation>
                        tempHist.forEach((val) => {
                // biome-ignore lint/complexity/useOptionalChain: <explanation>
                if (val.data && val.data.updatedAt) {
                    timestamps.push(new Date(val.data.updatedAt).getTime());
                    tempValues.push(Number(val.data.temp));
                }
            });
            
            setX(timestamps);
            setY(tempValues);
        } catch (err) {
            console.error(err);
        }
    };
    
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
        useEffect(() => {
        fetchedHistoricalData();
    }, []);
    
    return (
        <Paper elevation={3}>
            <LineChart 
                series={[
                    { data: y, label: 'Temperature', color: '#ff6384' }
                ]} 
                xAxis={[
                    { data: x, scaleType: "time" }
                ]} 
                height={500} 
                sx={{ width: "100%" }}
            />
        </Paper>
    );
};