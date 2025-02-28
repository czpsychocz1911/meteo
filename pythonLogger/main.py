import time
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn
from soilMoisture import read_soil_values, calculate_percentage_value_moisture, sensorValue as soilEnum

#ADS.P1 is soil moisture sensor

MOISTURE_LOWER_BOUND = 1.258
MOISTURE_UPPER_BOUND = 3.4
i2c = busio.I2C(board.SCL,board.SDA)
ads = ADS.ADS1115(i2c)

def main():

    if not(client):
        raise Exception("No client found")
    
    try:
        while True:
            soilVol = read_soil_values(ads,ADS.P1, soilEnum.VOLTAGE)
            soildPer = calculate_percentage_value_moisture(soilVol,MOISTURE_UPPER_BOUND,MOISTURE_LOWER_BOUND)
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopped by user")



if __name__ == "__main__":
    main()