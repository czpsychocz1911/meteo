from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from schemas import BaseDocument, SoilModel, TempModel , TempUnitsEnum , RelHumidityModel
import asyncio
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from soilMoisture import read_soil_values, calculate_percentage_value_moisture, sensorValue as soilEnum
from humidityTemp import get_temp, get_relative_humidity
from time import sleep

models = [BaseDocument, SoilModel, TempModel , RelHumidityModel ] 

#CONSTS

MOISTURE_LOWER_BOUND = 1.258
MOISTURE_UPPER_BOUND = 3.4
DEFAULT_WRITING_VALUE = 60
i2c = busio.I2C(board.SCL,board.SDA)
ads = ADS.ADS1115(i2c)

async def logSoilModel():
    soilVoltage = read_soil_values(ads,ADS.P1, soilEnum.VOLTAGE)
    soilRawValue = read_soil_values(ads, ADS.P1, soilEnum.VALUE)
    soilPercentage = calculate_percentage_value_moisture(soilVoltage,MOISTURE_UPPER_BOUND,MOISTURE_LOWER_BOUND)

    out = SoilModel(ADraw=soilRawValue,ADvolt=soilVoltage,soilHumidity=soilPercentage)

    await SoilModel.insert(out)

async def logTempHumidity():
    temp = TempModel(temp=get_temp(),temp_unit=TempUnitsEnum.Celsius)
    relHum = RelHumidityModel(relHum=get_relative_humidity())

    await TempModel.insert(temp)
    await RelHumidityModel.insert(relHum)

async def initDB(mongodb_url: str = "mongodb://localhost:28080", db_name: str = "meteor"):
    client = AsyncIOMotorClient(mongodb_url)
    db = client[db_name]
    await init_beanie(database=db, document_models=models)

async def main():
    try:
        await initDB()
        while(True):
            await logSoilModel()
            await logTempHumidity()
            sleep(DEFAULT_WRITING_VALUE)
    except Exception as e:
        print(f"Error happened at: {e}")
    except KeyboardInterrupt:
        print("Program terminated by user")