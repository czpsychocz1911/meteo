import { Meteor } from "meteor/meteor";
import { type RelHumidityModel, SensorKeys, type SoilModel, type TempModel } from "../links";
import { Redis } from "/server/redis";

export interface sensorData {
    soil: SoilModel,
    temp: TempModel,
    humidity: RelHumidityModel,
    timestamp: Date
}

export type SensorDataResponse = sensorData | null

let cachedSensorData: SensorDataResponse = null
let lastFetchTime = 0
const CACHE_TTL = 500

Meteor.methods({
    async "get.sensor.data"(){
        const user = await Meteor.userAsync()

        if(!user) throw new Meteor.Error("404","You are not logged in")

        const now = Date.now()

        if (cachedSensorData && (now - lastFetchTime  < CACHE_TTL)){
            return cachedSensorData
        }

        try {
            const soilData : SoilModel = await Redis.get(SensorKeys.Soil)
            const tempData : TempModel = await Redis.get(SensorKeys.Temp,true)
            const humidityData : RelHumidityModel = await Redis.get(SensorKeys.Humidity,true)
            
            cachedSensorData = {
                soil: soilData,
                temp: tempData,
                humidity: humidityData,
                timestamp: new Date()
            }
    
            lastFetchTime = now
            console.log(cachedSensorData)
            return cachedSensorData
        } catch (err) {
            console.error("Error fetching data from redis", err)
            throw new Meteor.Error("5xx","Failed to fetch sensor data")
        }
    }
})