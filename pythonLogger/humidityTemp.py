import busio
import adafruit_sht31d

def get_temp(i2c: busio.I2C):
    """
    Reads temp from sht31d

    Parameters:
        i2c (busio.I2C): The instance of I2C

    Returns:
        float: return temp in celcius
    """
    sensor = adafruit_sht31d.SHT31D(i2c)
    return sensor.temperature

def get_relative_humidity(i2c: busio.I2C):
    """
    Reads relative humidity from sht31d

    Parameters:
        i2c (busio.I2C): The instance of I2C

    Returns:
        float: return temp in relative humidity in %
    """
    sensor = adafruit_sht31d.SHT31D(i2c)
    return sensor.relative_humidity