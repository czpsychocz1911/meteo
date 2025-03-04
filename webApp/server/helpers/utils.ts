import JSON5 from 'json5';
import type { HumidityData, ParsedHumidity, ParsedSensorData, ParsedSoil, ParsedTemp, SensorData, SoilData, TempData } from '/imports/api/links';

export function getSensorData(data: SensorData){
    const humStep : {timestamp: Date, data: string} = JSON5.parse(data.humidity)
    const humStep2 : HumidityData = JSON5.parse(humStep.data)
    const humRes: ParsedHumidity = {
        data: humStep2,
        timestamp: humStep.timestamp
    }

    const soilStep: {timestamp: Date, data : string} = JSON5.parse(data.soil)
    const soilStep2 : SoilData = JSON5.parse(soilStep.data)
    const soilRes : ParsedSoil = {
        data: soilStep2,
        timestamp: soilStep.timestamp
    }

    const tempStep : {timestamp: Date, data : string} = JSON5.parse(data.temp)
    const tempStep2 : TempData = JSON5.parse(tempStep.data)
    const tempRes : ParsedTemp = {
        data: tempStep2,
        timestamp : tempStep.timestamp
    }

    const res : ParsedSensorData = {
        humidity: humRes,
        soil: soilRes,
        temp: tempRes
    }

    return res
}