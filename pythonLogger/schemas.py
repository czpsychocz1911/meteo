from mongoengine import Document, IntField , DateTimeField, FloatField, StringField, EnumField
import datetime
from enum import Enum

class TempEnum(Enum):
    Celsius = "C"
    Kelvin = "K"
    Fahrenheit = "F"

class BaseDocument(Document):
    meta = {"abstract": True}

    createdAt = DateTimeField(default=datetime.datetime.now())
    updatedAt = DateTimeField(default=datetime.datetime.now())

    def save(self, *args, **kwargs):
        if not self.createdAt:
            self.createdAt = datetime.datetime.now()
        self.updatedAt = datetime.datetime.now()
        return super(BaseDocument, self).save(*args, **kwargs)
    
class Temp(BaseDocument):
    value = FloatField(required=True)
    unit = StringField(required=True)

    meta = {
        "collection" : "temp_reading",
        "indexes" : [
            {"fields": ["createdAt"], "expireAfterSeconds" : 1440}
        ]
    }

class Humidity(BaseDocument):
    value = FloatField(required=True)
    scale = EnumField(TempEnum, default=TempEnum.Celsius)

    meta = {
        "collection" : "humidity_reading",
        "indexes" : [
            {"fields": ["createdAt"], "expireAfterSeconds" : 1440}
        ]
    }

class SoilHumidity(BaseDocument):
    value = FloatField(required=True)
    unit = StringField(required=True)

    meta = {
        "collection" : "soil_humidity_reading",
        "indexes" : [
            {"fields": ["createdAt"], "expireAfterSeconds" : 1440}
        ]
    }