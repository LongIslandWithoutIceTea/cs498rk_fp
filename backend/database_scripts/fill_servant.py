import pymongo
from servant_src import servant_list
from servants import servant_list_test
import pandas as pd
from bs4 import BeautifulSoup
import requests

def connect():
    client = pymongo.MongoClient("mongodb+srv://chuangk2:Tea890122@caldeadb-buuxb.mongodb.net/test?retryWrites=true")
    db = client["chaldeadb"]
    collection = db["servants"]
    return collection

def getSvtData(i):
    base_url = "https://fategrandorder.fandom.com/wiki/"
    response = requests.get(base_url + servant_list[i]["name"])
    soup = BeautifulSoup(response.text, 'lxml')
    info = soup.find("div", class_="ServantInfoMain")
    stats = info.find("div", class_="ServantInfoStatsWrapper").find_all("table")
    #table 1
    row_00 = stats[0].find_all("tr")[0]
    col_000 = row_00.find_all("td")[0]
    japanese_name = col_000.find("span").get_text()
    servant_list[i]["Japanese Name"] = japanese_name
    try:
        row_01 = stats[0].find_all("tr")[1]
        col_010 = row_01.find_all("td")[0]
        aka = col_010.get_text(strip=True)[4:]
        servant_list[i]["AKA"] = aka
    except:
        servant_list[i]["AKA"] = ""
    #table 2
    row_10 = stats[1].find_all("tr")[0]
    col_101 = row_10.find_all("td")[1]
    cost = col_101.get_text()[9:-1]
    servant_list[i]["Cost"] = cost
    if (i != 0):
        row_11 = stats[1].find_all("tr")[1]
        col_110 = row_11.find_all("td")[0]
        atk = col_110.get_text(strip=True)[4:]
        servant_list[i]["ATK"] = atk
        col_111 = row_11.find_all("td")[1]
        hp = col_111.get_text(strip=True)[3:]
        servant_list[i]["HP"] = hp
    else:
        row_11 = stats[1].find_all("tr")[1]
        col_110 = row_11.find_all("td")[0]
        atk = col_110.get_text("|", strip=True).split("|")[3]
        servant_list[i]["ATK"] = atk
        col_111 = row_11.find_all("td")[1]
        hp = col_111.get_text("|", strip=True).split("|")[3]
        servant_list[i]["HP"] = hp

    row_12 = stats[1].find_all("tr")[2]
    col_120 = row_12.find_all("td")[0]
    grail_atk = col_120.get_text(strip=True)[10:]
    servant_list[i]["Grail ATK"] = grail_atk
    col_121 = row_12.find_all("td")[1]
    grail_hp = col_121.get_text(strip=True)[9:]
    servant_list[i]["Grail HP"] = grail_hp
    row_13 = stats[1].find_all("tr")[3]
    col_130 = row_13.find_all("td")[0]
    voice_actor = col_130.get_text(strip=True)[12:]
    servant_list[i]["Voice Actor"] = voice_actor
    col_131 = row_13.find_all("td")[1]
    illustrator = col_131.get_text(strip=True)[12:]
    servant_list[i]["Illustrator"] = illustrator
    row_14 = stats[1].find_all("tr")[4]
    col_140 = row_14.find_all("td")[0]
    attribute = col_140.get_text(strip=True)[10:]
    servant_list[i]["Attribute"] = attribute
    col_141 = row_14.find_all("td")[1]
    growth_curve = col_141.get_text(strip=True)[13:]
    servant_list[i]["Growth Curve"] = growth_curve
    row_15 = stats[1].find_all("tr")[5]
    col_150 = row_15.find_all("td")[0]
    star_absorption = col_150.get_text(strip=True)[16:]
    servant_list[i]["Star Absorption"] = star_absorption
    col_151 = row_15.find_all("td")[1]
    star_generation = col_151.get_text(strip=True)[16:]
    servant_list[i]["Star Generation"] = star_generation
    row_16 = stats[1].find_all("tr")[6]
    col_160 = row_16.find_all("td")[0]
    np_charge_atk = col_160.get_text(strip=True)[14:]
    servant_list[i]["NP Charge ATK"] = np_charge_atk
    col_161 = row_16.find_all("td")[1]
    np_charge_def = col_161.get_text(strip=True)[14:]
    servant_list[i]["NP Charge DEF"] = np_charge_def
    row_17 = stats[1].find_all("tr")[7]
    col_170 = row_17.find_all("td")[0]
    death_rate = col_170.get_text(strip=True)[11:]
    servant_list[i]["Death Rate"] = death_rate
    col_171 = row_17.find_all("td")[1]
    alignments = col_171.get_text(strip=True)[11:]
    servant_list[i]["Alignments"] = alignments
    row_18 = stats[1].find_all("tr")[8]
    col_180 = row_18.find_all("td")[0]
    gender = col_180.get_text(strip=True)[7:]
    servant_list[i]["Gender"] = gender
    #table 3

# print(row_19)
# print(servant_list[i])
def main():
    collection = connect();
    # for i in range(0, 239):
    #     print(i)
    #     getSvtData(i)
    # print(servant_list)
    # with open("servants", "w") as f:
    #     print(servant_list, file=f)
    collection.insert_many(servant_list_test)

if __name__ == "__main__":
     main()
