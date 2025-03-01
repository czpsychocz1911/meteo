#!/bin/bash

LOGS_DIR="$HOME/logs"
MONGODB_PORT=28080
MONGODB_DIR="$HOME/mdb-binaries"

stop_python_logger() {
    echo "Stopping Python logger..."
    if [ -f "$LOGS_DIR/python_logger.pid" ]; then
        PID=$(cat "$LOGS_DIR/python_logger.pid")
        if ps -p $PID > /dev/null; then
            echo "Killing Python logger process (PID: $PID)"
            kill $PID
            rm "$LOGS_DIR/python_logger.pid"
        else
            echo "Python logger process not running."
            rm "$LOGS_DIR/python_logger.pid"
        fi
    else
        echo "No Python logger PID file found."
    fi
}

stop_webapp() {
    echo "Stopping Meteor web application..."
    if [ -f "$LOGS_DIR/meteor_app.pid" ]; then
        PID=$(cat "$LOGS_DIR/meteor_app.pid")
        if ps -p $PID > /dev/null; then
            echo "Killing Meteor process (PID: $PID)"
            kill $PID
            rm "$LOGS_DIR/meteor_app.pid"
        else
            echo "Meteor process not running."
            rm "$LOGS_DIR/meteor_app.pid"
        fi
    else
        echo "No Meteor PID file found."
    fi
}

stop_mongodb() {
    echo "Stopping MongoDB server..."
    if netstat -tuln | grep ":$MONGODB_PORT " > /dev/null; then
        echo "MongoDB is running on port $MONGODB_PORT. Shutting down..."
        if [ -f "$MONGODB_DIR/mongod" ]; then
            "$MONGODB_DIR/mongod" --dbpath "/data/db/test_db" --shutdown
            echo "MongoDB shutdown complete."
        else
            echo "MongoDB binaries not found. Trying to kill process..."
            PID=$(lsof -i :$MONGODB_PORT -t)
            if [ ! -z "$PID" ]; then
                echo "Killing MongoDB process (PID: $PID)"
                kill $PID
            else
                echo "Couldn't identify MongoDB process."
            fi
        fi
    else
        echo "MongoDB not running on port $MONGODB_PORT."
    fi
}

main() {
    echo "Stopping all services..."
    stop_python_logger
    stop_webapp
    stop_mongodb
    
    echo "All services stopped."
}
main