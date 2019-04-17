import pymongo
from servant_src import servant_list
import pandas as pd
from bs4 import BeautifulSoup
import requests

base_url = "https://fategrandorder.fandom.com/wiki/"

client = pymongo.MongoClient("mongodb+srv://chuangk2:Tea890122@caldeadb-buuxb.mongodb.net/test?retryWrites=true")
db = client["chaldeadb"]
collection = db["servants"]
response = requests.get(base_url + servant_list[7]["name"])
soup = BeautifulSoup(response.text, 'lxml')
info = soup.find("div", class_="ServantInfoMain")
stats = info.find("div", class_="ServantInfoStatsWrapper").find_all("table")
print(stats[0])
#table 1
row_00 = stats[0].find_all("tr")[0]
col_000 = row_00.find_all("td")[0]
japanese_name = col_000.find("span").get_text()
servant_list[7]["Japanede Name"] = japanese_name
try:
    row_01 = stats[0].find_all("tr")[1]
    col_010 = row_01.find_all("td")[0]
    aka = col_010.get_text(strip=True)[4:]
    print(aka)
    servant_list[7]["AKA"] = aka
except:
    servant_list[7]["AKA"] = ""
#table 2
row_10 = stats[1].find_all("tr")[0]
col_101 = row_10.find_all("td")[1]
cost = col_101.get_text()[9:-1]
servant_list[7]["Cost"] = cost
row_11 = stats[1].find_all("tr")[1]
col_110 = row_11.find_all("td")[0]
atk = col_110.get_text(strip=True)[4:]
servant_list[7]["ATK"] = atk
col_111 = row_11.find_all("td")[1]
hp = col_111.get_text(strip=True)[3:]
servant_list[7]["HP"] = hp
row_12 = stats[1].find_all("tr")[2]
col_120 = row_12.find_all("td")[0]
grail_atk = col_120.get_text(strip=True)[10:]
servant_list[7]["Grail ATK"] = grail_atk
col_121 = row_12.find_all("td")[1]
grail_hp = col_121.get_text(strip=True)[9:]
servant_list[7]["Grail HP"] = grail_hp
row_13 = stats[1].find_all("tr")[3]
col_130 = row_13.find_all("td")[0]
voice_actor = col_130.get_text(strip=True)[12:]
servant_list[7]["Voice Actor"] = voice_actor
col_131 = row_13.find_all("td")[1]
illustrator = col_131.get_text(strip=True)[12:]
servant_list[7]["Illustrator"] = illustrator
row_14 = stats[1].find_all("tr")[4]
col_140 = row_14.find_all("td")[0]
attribute = col_140.get_text(strip=True)[10:]
servant_list[7]["Attribute"] = attribute
col_141 = row_14.find_all("td")[1]
growth_curve = col_141.get_text(strip=True)[13:]
servant_list[7]["Growth Curve"] = growth_curve
row_15 = stats[1].find_all("tr")[5]
col_150 = row_15.find_all("td")[0]
star_absorption = col_150.get_text(strip=True)[16:]
servant_list[7]["Star Absorption"] = star_absorption
col_151 = row_15.find_all("td")[1]
star_generation = col_151.get_text(strip=True)[16:]
servant_list[7]["Star Generation"] = star_generation
row_16 = stats[1].find_all("tr")[6]
col_160 = row_16.find_all("td")[0]
np_charge_atk = col_160.get_text(strip=True)[14:]
servant_list[7]["NP Charge ATK"] = np_charge_atk
col_161 = row_16.find_all("td")[1]
np_charge_def = col_161.get_text(strip=True)[14:]
servant_list[7]["NP Charge DEF"] = np_charge_def
row_17 = stats[1].find_all("tr")[7]
col_170 = row_17.find_all("td")[0]
death_rate = col_170.get_text(strip=True)[11:]
servant_list[7]["Death Rate"] = death_rate
col_171 = row_17.find_all("td")[1]
alignments = col_171.get_text(strip=True)[11:]
servant_list[7]["Alignments"] = alignments
row_18 = stats[1].find_all("tr")[8]
col_180 = row_18.find_all("td")[0]
gender = col_180.get_text(strip=True)[7:]
servant_list[7]["Gender"] = gender
#table 3


print(servant_list[7])
# for svt in servants:
#     response = requests.get(base_url + svt["name"])
#     soup = BeautifulSoup(response.text, 'lxml')
#     print(soup.title)
#collection.insert_many(servant_list)
