from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from schemas import BaseDocument, SoilModel, TempModel , TempUnitsEnum , RelHumidityModel
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from soilMoisture import read_soil_values, calculate_percentage_value_moisture, sensorValue as soilEnum
from humidityTemp import get_temp, get_relative_humidity
from time import sleep, time
from redisConnection import log_to_redis, SensorRedisKeys, read_from_redis

models = [BaseDocument, SoilModel, TempModel , RelHumidityModel ] 

#CONSTS

MOISTURE_LOWER_BOUND = 1.258
MOISTURE_UPPER_BOUND = 3.4
MONGO_UPDATE_VALUE = 60
SENSOR_UPDATE_VALUE = 5
i2c = busio.I2C(board.SCL,board.SDA)
ads = ADS.ADS1115(i2c)

def canUpdateMongo(nextTick: float):
    return time() >= nextTick

async def logSoilModel(mongoUpdate: bool):
    soilVoltage = read_soil_values(ads,ADS.P1, soilEnum.VOLTAGE)
    soilRawValue = read_soil_values(ads, ADS.P1, soilEnum.VALUE)
    soilPercentage = calculate_percentage_value_moisture(soilVoltage,MOISTURE_UPPER_BOUND,MOISTURE_LOWER_BOUND)

    out = SoilModel(ADraw=soilRawValue,ADvolt=soilVoltage,soilHumidity=soilPercentage)

    await log_to_redis(SensorRedisKeys.Soil,out)
    
    if(mongoUpdate):
        await SoilModel.insert(out)

async def logTempHumidity(mongoUpdate: bool):
    temp = TempModel(temp=get_temp(i2c),temp_unit=TempUnitsEnum.Celsius)
    relHum = RelHumidityModel(relHum=get_relative_humidity(i2c))

    await log_to_redis(SensorRedisKeys.Temp, temp)
    await log_to_redis(SensorRedisKeys.Humidity, relHum)


    if(mongoUpdate):
        await TempModel.insert(temp)
        await RelHumidityModel.insert(relHum)

async def initDB(mongodb_url: str = "mongodb://localhost:28080", db_name: str = "meteor"):
    client = AsyncIOMotorClient(mongodb_url)
    db = client[db_name]
    await init_beanie(database=db, document_models=models)

async def main():
    try:
        await initDB()
        nextTick = time() + MONGO_UPDATE_VALUE
        while(True):

            mongoUpdate = canUpdateMongo(nextTick)

            await logSoilModel(mongoUpdate)
            await logTempHumidity(mongoUpdate)

            sleep(SENSOR_UPDATE_VALUE)

            if(mongoUpdate):
                nextTick = time() + MONGO_UPDATE_VALUE
            

            print(await read_from_redis(SensorRedisKeys.Temp))
    except Exception as e:
        print(f"Error happened at: {e}")
    except KeyboardInterrupt:
        print("Program terminated by user")