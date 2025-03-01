import redis
import json
from enum import Enum

class SensorRedisKeys(Enum):
    Soil = "soil:latest"
    Temp = "temp:latest"
    Humidity = "humidity:latest"


REDIS_EXPIRY = 3600
REDIS_HISTORY_MAX_LEN = 100
REDIS_HOST = "localhost"
REDIS_HOST_PORT = "6379"

redis_client = redis.Redis(REDIS_HOST,REDIS_HOST_PORT)

async def log_to_redis(key,data):
    try:
        json_data = json.dumps(data)
        redis_client.set(key,json_data)
        redis_client.expire(key, REDIS_EXPIRY)
    except Exception as e:
        print(f"Redis error: {e}")