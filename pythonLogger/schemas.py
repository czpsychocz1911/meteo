from datetime import datetime
from beanie import Document
from pydantic import Field
from idGen import generate_meteor_id
from enum import Enum

class TempUnitsEnum(str, Enum):
    Celsius = "C"
    Kelvin = "K"
    Fahrenheit = "F"

class BaseDocument(Document):  
    id: str = Field(default_factory=generate_meteor_id, alias="_id")
    createdAt: datetime = Field(default_factory=datetime.now)
    updatedAt: datetime = Field(default_factory=datetime.now)
    
    async def save(self, *args, **kwargs):
        self.updatedAt = datetime.now()
        return await super().save(*args, **kwargs)
   
class SoilModel(BaseDocument): 
    soilHumidity: float
    ADraw: int
    ADvolt: float
    class Settings:
        name = "soil_moisture"
        keep_nulls = False

class TempModel(BaseDocument):
    temp: float
    temp_unit: TempUnitsEnum
    class Settings: 
        name = "temperature"
        keep_nulls = False

class RelHumidityModel(BaseDocument):
    relHum: float
    class Settings:
        name = "relative_humidity"
        keep_nulls = False