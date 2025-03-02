import { Mongo } from 'meteor/mongo';

enum TempUnitsEnum {
  Celsius = "C",
  Kelvin = "K",
  Fahrenheit = "F",
}

export interface Link {
  _id?: string;
  title: string;
  url: string;
  createdAt: Date;
}

export interface BaseModel {
  _id: string,
  createdAt: Date
  updatedAt: Date
}

export type SoilModel = BaseModel & {
  soilHumidity: number
  ADraw: number
  ADvolt: number
}

export type TempModel = BaseModel & {
  temp: number
  temp_unit: TempUnitsEnum
}

export type RelHumidityModel = BaseModel & {
  relHum : number
}

export const LinksCollection = new Mongo.Collection<Link>('links')
export const SoilModelCollection = new Mongo.Collection<SoilModel>("soil_moisture")
export const TempModelCollection = new Mongo.Collection<TempModel>("temperature")
export const RelHumidityModelCollection = new Mongo.Collection<RelHumidityModel>("relative_humidity")

