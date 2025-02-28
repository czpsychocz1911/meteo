from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from schemas import BaseDocument, SoilModel, TempModel , TempUnitsEnum , RelHumidityModel
import asyncio
import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
from soilMoisture import read_soil_values, calculate_percentage_value_moisture, sensorValue as soilEnum

models = [BaseDocument, SoilModel, TempModel , RelHumidityModel ] 

#CONSTS

MOISTURE_LOWER_BOUND = 1.258
MOISTURE_UPPER_BOUND = 3.4
i2c = busio.I2C(board.SCL,board.SDA)
ads = ADS.ADS1115(i2c)

async def logSoilModel():
    soilVoltage = read_soil_values(ads,ADS.P1, soilEnum.VOLTAGE)
    soilRawValue = read_soil_values(ads, ADS.P1, soilEnum.VALUE)
    soilPercentage = calculate_percentage_value_moisture(soilVoltage,MOISTURE_UPPER_BOUND,MOISTURE_LOWER_BOUND)

    out = SoilModel(ADraw=soilRawValue,ADvolt=soilVoltage,soilHumidity=soilPercentage)

    await SoilModel.insert(out)


async def initDB():
    client = AsyncIOMotorClient("mongodb://localhost:28080")
    db = client["meteor"]
    await init_beanie(database=db, document_models=models)

async def main():
    await initDB()
    await logSoilModel()


asyncio.run(main())