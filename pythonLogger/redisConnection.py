import redis
import json
from enum import Enum
import time

class SensorRedisKeys(Enum):
    Soil = "soil"
    Temp = "temp"
    Humidity = "humidity"


REDIS_EXPIRY = 3600
REDIS_HISTORY_MAX_LEN = 100
REDIS_HOST = "localhost"
REDIS_HOST_PORT = "6379"

redis_client = redis.Redis(REDIS_HOST,REDIS_HOST_PORT)

async def log_to_redis(sensor_type, data):
    try:

        #I dont like this code need to make a bit nicer???
        latest_key = f"{sensor_type.value}"
        history_key = f"{sensor_type.name.lower()}:history"

        timestamped_data = {
            "timestamp" : int(time.time()),
            "data" : data
        }

        json_data = json.dumps(timestamped_data)

        redis_client.set(latest_key, json_data)
        redis_client.expire(latest_key, REDIS_EXPIRY)

        redis_client.lpush(history_key, json_data)
        redis_client.ltrim(history_key, 0 , REDIS_HISTORY_MAX_LEN - 1)
        redis_client.expire(history_key, REDIS_EXPIRY)

    except Exception as e:
        print(f"Redis error: {e}")

async def read_from_redis(sensor_type, limit=REDIS_HISTORY_MAX_LEN):
    try: 
        history_key = f"{sensor_type.name.lower()}:history"
        data = redis_client.lrange(history_key, 0 , limit - 1)

        res = []
        for item in data:
            res.append(json.loads(item))
    except Exception as e:
        print(f"Failed to retrive data from redis: {e}")