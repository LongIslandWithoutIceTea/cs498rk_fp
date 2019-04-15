import pymongo
from servant_src import servant_list

client = pymongo.MongoClient("mongodb+srv://chuangk2:Tea890122@caldeadb-buuxb.mongodb.net/test?retryWrites=true")

db = client["chaldeadb"]

col = db["servants"]
print(servant_list)
col.insert_many(servant_list)
