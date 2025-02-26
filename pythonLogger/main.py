from mongoConnection import get_mongo_connection

def main():
    client, db = get_mongo_connection("mongodb://localhost:28080/meteor")

    if not(client):
        raise Exception("No client found")
    
    print("jdu spat")

if __name__ == "__main__":
    main()