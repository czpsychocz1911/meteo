import { Mongo } from 'meteor/mongo';

export const SensorKeys = {
  Soil: "soil",
  Temp: "temp",
  Humidity: "humidity"
};

enum TempUnitsEnum {
  Celsius = "C",
  Kelvin = "K",
  Fahrenheit = "F",
}

export interface BaseData {
  _id: string
  createdAt: Date
  updatedAt: Date
}

export interface SoilData extends BaseData {
  soilHumidity: number;
  ADraw: number;
  ADvolt: number;
}

export interface TempData extends BaseData {
  temp: number
  temp_unit: "C" | "F" | "K"
}

export interface HumidityData extends BaseData {
  relHum: number
}

export interface ParsedSoil {
  timestamp: number;
  data: SoilData;
}

export interface ParsedTemp {
  timestamp: number;
  data: TempData;
}

export interface ParsedHumidity {
  timestamp: number;
  data: HumidityData;
}

export interface SensorData {
  soil: string
  temp: string
  humidity: string
}

export const SoilModelCollection = new Mongo.Collection<SoilData>("soil_moisture")
export const TempModelCollection = new Mongo.Collection<TempData>("temperature")
export const RelHumidityModelCollection = new Mongo.Collection<HumidityData>("relative_humidity")

