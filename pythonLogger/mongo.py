from pymongo import MongoClient
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError

def get_mongo_connection(uri="mongodb://localhost:28080/meteor"):
    """
    Connects to MongoDB and returns the connection if successful.
    Prints error messages if connection fails.
    
    Args:
        uri (str): MongoDB connection string
        
    Returns:
        tuple: (client, db) if successful, (None, None) if failed
    """
    try:
        # Try to connect with a short timeout
        client = MongoClient(uri, serverSelectionTimeoutMS=3000)
        
        # Force a connection check
        client.admin.command('ismaster')
        
        # Get database from URI
        db_name = uri.split('/')[-1]
        db = client[db_name]
        
        print(f"✅ Successfully connected to MongoDB at {uri}")
        return client, db
        
    except ConnectionFailure:
        print(f"❌ Connection ERROR: Could not connect to MongoDB at {uri}")
        print("   Check if MongoDB is running and the URI is correct")
        return None, None
        
    except ServerSelectionTimeoutError:
        print(f"❌ Timeout ERROR: Could not connect to MongoDB at {uri}")
        print("   Possible causes:")
        print("   - MongoDB is not running")
        print("   - MongoDB is not bound to the correct IP/interface")
        print("   - Firewall blocking the connection")
        return None, None
        
    except Exception as e:
        print(f"❌ Unexpected ERROR: {str(e)}")
        return None, None