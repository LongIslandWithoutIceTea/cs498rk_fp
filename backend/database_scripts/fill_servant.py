import pymongo
import servant_list from servant_src

client = pymongo.MongoClient("mongodb+srv://chuangk2:Tea890122@caldeadb-buuxb.mongodb.net/test?retryWrites=true")

db = client["chaldeadb"]

col = db["servants"]

servant_list = [
    { "_id": 1, "name": "Mashu Kyrielight"}
]

col.insert_many(servant_list);
