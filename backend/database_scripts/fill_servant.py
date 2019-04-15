import pymongo
import servant_list from "../backend/database_scripts/servant_src"

client = pymongo.MongoClient("mongodb+srv://chuangk2:Tea890122@caldeadb-buuxb.mongodb.net/test?retryWrites=true")

db = client["chaldeadb"]

col = db["servants"]

col.insert_many(servant_list);
