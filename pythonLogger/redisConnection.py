import asyncio
import redis.asyncio as redis
import json
from enum import Enum
import time
import logging
from beanie import Document

class SensorRedisKeys(Enum):
    Soil = "soil"
    Temp = "temp"
    Humidity = "humidity"


REDIS_EXPIRY = 3600
REDIS_HISTORY_MAX_LEN = 100
REDIS_HOST = "localhost"
REDIS_HOST_PORT = "6379"

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger('redis_operations')

redis_client = None

async def init_redis(host=REDIS_HOST,port=REDIS_HOST_PORT ):

    global redis_client
    
    logger.info(f"Initializing Redis client: host={host}, port={port}")
    redis_client = redis.Redis(host=host, port=port)
    
    try:
        logger.info("Testing Redis connection with PING")
        pong = await redis_client.ping()
        logger.info(f"Redis connection test result: {pong}")
        return pong
    except Exception as e:
        logger.error(f"Redis connection error: {e}")
        return False

async def log_to_redis(sensor_type : SensorRedisKeys, data):
    try:
        # Define the keys
        latest_key = f"{sensor_type.value}"
        history_key = f"{sensor_type.name.lower()}:history"
        
        logger.info(f"Preparing data for Redis: type={sensor_type.name}, keys=[{latest_key}, {history_key}]")
           
        # Add timestamp
        timestamped_data = {
            "timestamp": int(time.time()),
            "data": data.model_dump_json(),
        }
       
        # Convert to JSON
        logger.info(f"Converting data to JSON: {timestamped_data}")
        json_data = timestamped_data
        
        # Store latest value
        logger.info(f"SET operation: key={latest_key}, size={len(json_data)} bytes")
        await redis_client.set(latest_key, json_data)
        
        # Set expiry on latest value
        logger.info(f"EXPIRE operation: key={latest_key}, ttl={REDIS_EXPIRY} seconds")
        await redis_client.expire(latest_key, REDIS_EXPIRY)
        
        # Push to history list
        logger.info(f"LPUSH operation: key={history_key}, adding new data point")
        length = await redis_client.lpush(history_key, json_data)
        logger.info(f"After LPUSH, list now has {length} items")
        
        # Trim history list
        logger.info(f"LTRIM operation: key={history_key}, keeping items 0-{REDIS_HISTORY_MAX_LEN - 1}")
        await redis_client.ltrim(history_key, 0, REDIS_HISTORY_MAX_LEN - 1)
        
        # Set expiry on history list
        logger.info(f"EXPIRE operation: key={history_key}, ttl={REDIS_EXPIRY} seconds")
        await redis_client.expire(history_key, REDIS_EXPIRY)
        
        logger.info(f"Successfully logged {sensor_type.name} data to Redis")
        return True
        
    except Exception as e:
        logger.error(f"Redis operation error: {e}")
        logger.exception("Detailed exception info:")
        return False

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
