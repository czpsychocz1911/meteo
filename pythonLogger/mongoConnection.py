from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from schemas import BaseDocument, TempModel 
from idGen import generate_meteor_id

models = [BaseDocument, TempModel] 

async def initDB():
    client = AsyncIOMotorClient("mongodb://localhost:28080")
    db = client["meteor"]
    await init_beanie(database=db, document_models=models)

import asyncio

async def main():
    await initDB()
    test = TempModel(temp=1, ADraw=100, ADvolt=100)
    await test.insert()
    out = await TempModel.find_all().to_list()
    print("jsem tu")
    print(out)

asyncio.run(main())