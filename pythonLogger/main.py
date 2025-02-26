from mongoConnection import get_mongo_connection

def main():
    client, db = get_mongo_connection("mongodb://localhost:28080/meteor")

    if not(client):
        raise Exception("No client found")
    
    db.list_collection_names(client)

if __name__ == "__main__":
    main()