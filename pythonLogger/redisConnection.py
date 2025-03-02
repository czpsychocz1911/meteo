import asyncio
import redis.asyncio as redis
import json
from enum import Enum
import time
import logging

class SensorRedisKeys(Enum):
    Soil = "soil"
    Temp = "temp"
    Humidity = "humidity"


REDIS_EXPIRY = 3600
REDIS_HISTORY_MAX_LEN = 100
REDIS_HOST = "localhost"
REDIS_HOST_PORT = "6379"

async def init_redis(host=REDIS_HOST_PORT,port=REDIS_HOST_PORT ):
    global redis_client
    redis_client = redis.Redis(host,port)
    pong = await redis_client()
    return pong

async def log_to_redis(sensor_type : SensorRedisKeys, data):
    try:
        latest_key = f"{sensor_type.value}"
        history_key = f"{sensor_type.name.lower()}:history"
        
        if hasattr(data, 'dict'):
            data_dict = data.dict()
        else:
            data_dict = data
            
        timestamped_data = {
            "timestamp": int(time.time()),
            "data": data_dict
        }
        
        json_data = json.dumps(timestamped_data)
        await redis_client.set(latest_key, json_data)
        await redis_client.expire(latest_key, REDIS_EXPIRY)
        await redis_client.lpush(history_key, json_data)
        await redis_client.ltrim(history_key, 0, REDIS_HISTORY_MAX_LEN - 1)
        await redis_client.expire(history_key, REDIS_EXPIRY)

    except Exception as e:
        print(f"Redis error: {e}")

async def read_from_redis(sensor_type : SensorRedisKeys, limit=REDIS_HISTORY_MAX_LEN):
    try: 
        history_key = f"{sensor_type.name.lower()}:history"
        data = await redis_client.lrange(history_key, 0 , limit - 1)

        res = []
        for item in data:
            res.append(json.loads(item))
        return res
    except Exception as e:
        print(f"Failed to retrive data from redis: {e}")

async def test_redis():
    print("Starting Redis test...")
    
    # Clear any old data
    for key in SensorRedisKeys:
        redis_client.delete(f"{key.value}")
        redis_client.delete(f"{key.name.lower()}:history")
    
    # Simulate writing sensor data
    for i in range(5):
        # Simulate temp data
        temp_data = {"temp": 20 + i, "temp_unit": "Celsius"}
        success = await log_to_redis(SensorRedisKeys.Temp, temp_data)
        print(f"Temp data write success: {success}")
        
        # Simulate soil data
        soil_data = {"ADraw": 1000 + i, "ADvolt": 3.3 - (i * 0.1), "soilHumidity": 60 + i}
        success = await log_to_redis(SensorRedisKeys.Soil, soil_data)
        print(f"Soil data write success: {success}")
        
        print(f"Added sample {i+1}/5")
        await asyncio.sleep(1)

        print("\nReading temperature history...")
        temp_history = await read_from_redis(SensorRedisKeys.Temp)
        print(f"Retrieved {len(temp_history)} temp records")
        for entry in temp_history:
            print(f"Time: {entry['timestamp']}, Data: {entry['data']}")
    
        print("\nReading soil history...")
        soil_history = await read_from_redis(SensorRedisKeys.Soil)
        print(f"Retrieved {len(soil_history)} soil records")
        for entry in soil_history:
            print(f"Time: {entry['timestamp']}, Data: {entry['data']}")
    
        return "Test completed successfully"
