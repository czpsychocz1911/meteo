MONGODB_VERSION="r7.0.14-rpi-unofficial"
MONGODB_PORT=28080
MONGODB_DIR="$HOME/mdb-binaries"
MONGODB_DATA="/data/db/test_db"
MONGODB_LOG="$MONGODB_DATA/mongod.log"
MONGODB_DOWNLOAD_URL="https://github.com/themattman/mongodb-raspberrypi-binaries/releases/download/$MONGODB_VERSION/mongodb.ce.pi4.$MONGODB_VERSION.tar.gz"
MONGODB_ARCHIVE="mongodb.ce.pi4.$MONGODB_VERSION.tar.gz"

LOGS_DIR="$HOME/logs"

mkdir -p "$LOGS_DIR"


setup_mongodb(){
    echo "setting up mongodb..."

    mkdir -p "$MONGODB_DIR"
    mkdir -p "$MONGODB_DATA"

    if [ ! -f "$MONGODB_DIR/$MONGODB_ARCHIVE" ]; then
        echo "Downloading MongoDB ARM binaries..."
        cd "$MONGODB_DIR"
        wget "$MONGODB_DOWNLOAD_URL" -O "$MONGODB_ARCHIVE"
    else
        echo "MongoDB archive already exists, skipping download."
        cd "$MONGODB_DIR"
    fi



    if [ ! -f "$MONGODB_DIR/mongod" ]; then
        echo "Extracting MongoDB binaries..."
        tar xzvf "$MONGODB_ARCHIVE"
    else
        echo "MongoDB already extracted, skipping extraction."
    fi

    echo "Setting up permissions..."
    sudo chown -R ${USER}:${USER} /data 2>/dev/null || {
        sudo mkdir -p /data
        sudo chown -R ${USER}:${USER} /data
    }
    touch "$MONGODB_LOG"

    if netstat -tuln | grep ":$MONGODB_PORT " > /dev/null; then
        echo "MongoDB is already running on port $MONGODB_PORT"
    else
        # Start MongoDB as a background service
        echo "Starting MongoDB server on port $MONGODB_PORT..."
        "$MONGODB_DIR/mongod" --dbpath "$MONGODB_DATA" --fork --logpath "$MONGODB_LOG" --port "$MONGODB_PORT"
        echo "MongoDB started successfully!"
    fi
    
    echo "MongoDB setup complete!"
}


setup_python_logger(){
    if [ ! -d "env" ]; then
        python -m venv env
        echo "Virtual env created"
    else 
        echo "Virtual env already exists."
    fi

    echo "Activating virtual env"
    source env/bin/activate
    pip install -r requirements.txt
    cd pythonLogger
    python3 main.py
}

start_webApp(){
    echo "Starting web app"
    cd webApp

    if ! command -v meteor &> /dev/null; then
        echo "Did not find meteor. Gonna try to install it..."
        curl https://install.meteor.com/ | sh
    fi

    if [ ! -d "node_modules" ]; then
        echo "Installing npm deps..."
        meteor npm install
    fi

    echo "Running meteor app"
    MONGO_URL="mongodb://localhost:$MONGODB_PORT/meteor" meteor run > "$LOGS_DIR/meteor_app.log" 2>&1 &
    echo $! > "$LOGS_DIR/meteor_app.pid"
    echo "Meteor app started! Logs available at: $LOGS_DIR/meteor_app.log"
}


main(){
    echo "Setting up mongodb"
    setup_mongodb

    echo "Starting python logger"
    cd "$HOME/meteo"
    setup_python_logger

    echo "Starting web application"
    cd "$HOME/meteo"
    start_webApp
}

main











