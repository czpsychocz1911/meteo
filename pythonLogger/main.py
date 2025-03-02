import asyncio
from mongoConnection import main
from redisConnection import test_redis

if __name__ == "__main__":
    result = asyncio.run(test_redis)
    print(result)
    asyncio.run(main)