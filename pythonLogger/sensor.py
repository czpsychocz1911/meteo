import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
from humidityTemp import get_relative_humidity
from humidityTemp import get_temp

MOISTURE_LOWER_BOUND = 1.258
MOISTURE_UPPER_BOUND = 3.4

i2c = busio.I2C(board.SCL,board.SDA)

ads = ADS.ADS1115(i2c)
ads.gain = 1

a0 = AnalogIn(ads,ADS.P0)

try: 
    while True:
        print(get_relative_humidity(i2c))
        print(get_temp(i2c))
        print()
        time.sleep(1)
except KeyboardInterrupt:
    print("Stopped by user")