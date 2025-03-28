import { Meteor } from "meteor/meteor";
import { Redis } from "/server/redis";
import { HumidityData, ParsedHumidity, ParsedSoil, ParsedTemp, SensorData, SensorKeys, SoilData, TempData } from "../links";

let cachedSensorData: SensorData
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
            const soilData : string = await Redis.get(SensorKeys.Soil)
            const tempData : string = await Redis.get(SensorKeys.Temp,true)
            const humidityData : string = await Redis.get(SensorKeys.Humidity,true)
            
            cachedSensorData = {
                humidity: humidityData,
                soil: soilData,
                temp: tempData
            }
    
            lastFetchTime = now
            return cachedSensorData
        } catch (err) {
            console.error("Error fetching data from redis", err)
            throw new Meteor.Error("5xx","Failed to fetch sensor data")
        }
    },
    async "get.sensor.data.history"(){
        const user = await Meteor.userAsync()

        if(!user) throw new Meteor.Error("404","You are not logged in")

        try{
            const soilHistory = await Redis.lRange(`${SensorKeys.Soil}:history`,0,-1)
            const tempHistory = await Redis.lRange(`${SensorKeys.Temp}:history`,0,-1)
            const humidityHistory = await Redis.lRange(`${SensorKeys.Humidity}:history`,0,-1)

            const sensorData = {
                humidity: humidityHistory,
                temp: tempHistory,
                soil: soilHistory
            }

            return sensorData
        } catch (err) {
            console.error("Error ")
        }
    }
})