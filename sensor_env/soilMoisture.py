import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
from enum import Enum

class sensorValue(Enum):
    VOLTAGE = 0
    VALUE = 1


def read_soil_values(ads: ADS.ADS1115, channel , sensorOutput: sensorValue) -> float:
    """
    Reads soil moisture sensor value from the given ADS1015 channel.

    Parameters:
        ads (ADS.ADS1015): The ADS1015 instance.
        channel (ADS.ADS1015.Px): The ADC channel to read from (ADS.P0, ADS.P1, etc.).
        sensorOutput (SensorValue): Selects whether to return voltage or raw ADC value.

    Returns:
        float: The measured voltage or raw ADC value.
    """
        
    analog_input = AnalogIn(ads,channel)

    match sensorOutput:
        case sensorValue.VOLTAGE:
            return analog_input.voltage
        case sensorValue.VALUE:
            return analog_input.value

def calculate_percentage_value_moisture(voltage: float, upper_bound: float, lower_bound: float):
    """
    Converts voltage readings to a soil moisture percentage.

    Parameters:
        voltage (float): The measured sensor voltage.
        upper_bound (float): The voltage in completely dry soil.
        lower_bound (float): The voltage when fully submerged in water.

    Returns:
        float: The soil moisture percentage (0% to 100%).
    """
    moisture_percent = ((upper_bound - voltage) / (upper_bound - lower_bound)) * 100
    return max(0,min(100,moisture_percent))


