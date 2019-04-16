import pymongo
from servant_src import servant_list
import pandas as pd
from bs4 import BeautifulSoup
import requests

base_url = "https://fategrandorder.fandom.com/wiki/"

client = pymongo.MongoClient("mongodb+srv://chuangk2:Tea890122@caldeadb-buuxb.mongodb.net/test?retryWrites=true")
db = client["chaldeadb"]
col = db["servants"]
response = requests.get(base_url + servant_list[0]["name"])
soup = BeautifulSoup(response.text, 'lxml')
info = soup.find("div", class_="ServantInfoMain")
stats = info.find("div", class_="ServantInfoStatsWrapper").find_all("table")

print(stats[0])

# for svt in servants:
#     response = requests.get(base_url + svt["name"])
#     soup = BeautifulSoup(response.text, 'lxml')
#     print(soup.title)
#col.insert_many(servant_list)
