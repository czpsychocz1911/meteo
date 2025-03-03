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

main() {
    echo "Stopping all services..."
    stop_python_logger
    stop_webapp
    
    echo "All services stopped."
}
main