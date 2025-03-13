# Meteo
## Installation

Ensure that you are running Rasberry Pi os (based on debian) and all of the neccesera dependencies installed.

To install them use: 
```
sudo apt update && sudo apt upgrade -y 
sudo apt install python3
```

You need also node i would recommend using nvm (node version manager). Use version 22.13.1 LTS
```
https://github.com/nvm-sh/nvm
```

And you need meteor as well to install it:
```
curl https://install.meteor.com/ | sh
```

At last you need redis
```
https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/
```

## Setup
Clone the repository and navigate to project directory:
```
git clone https://github.com/czpsychocz1911/meteo
cd meteo
```

## Running the app
To start all of the services run:
```
chmod +x setup.sh
./setup.sh
```

This script will: 
- Set up and start MongoDB on your Rasberry Pi
- Start the Meteor Web App
- Start the Python logger

## Stopping the Application
To stop all of the services simply run: 
```
chmod +x stop.sh
./stop.sh
```

This will: 
-Stop all of the scripts

## Logs

All of the logs are stored in the `logs/` directory
- `python_logger.log` Logs for the python logger
- `meteor_app.log` Logs for the Meteor Web Application
- `mongod.log` Logs for MongoDB

## About
This project is made for my bachleor thesis and should be used with thesis it self. 