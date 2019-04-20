import pymongo
from servant_src import servant_list
# from servants import servant_list_test
import pandas as pd
from bs4 import BeautifulSoup
import requests

def connect():
    client = pymongo.MongoClient("mongodb+srv://chuangk2:Tea890122@caldeadb-buuxb.mongodb.net/test?retryWrites=true")
    db = client["test"]
    collection_servants_info = db["servants"]
    return collection_servants_info

def getSvtData(i):
    base_url = "https://fategrandorder.fandom.com/wiki/"
    response = requests.get(base_url + servant_list[i]["name"])
    soup = BeautifulSoup(response.text, 'lxml')

    # servants_info
    _class = soup.find("p", class_="ServantInfoClass").find("a")["title"]
    servant_list[i]["class"] = _class
    info = soup.find("div", class_="ServantInfoMain")
    stats = info.find("div", class_="ServantInfoStatsWrapper").find_all("table")
    # table 1
    row_00 = stats[0].find_all("tr")[0]
    col_000 = row_00.find_all("td")[0]
    japanese_name = col_000.find("span").get_text()
    servant_list[i]["japanese_name"] = japanese_name
    try:
        row_01 = stats[0].find_all("tr")[1]
        col_010 = row_01.find_all("td")[0]
        aka = col_010.get_text(strip=True)[4:].replace("?", "")
        servant_list[i]["aka"] = aka
    except:
        servant_list[i]["aka"] = ""
    # table 2
    row_10 = stats[1].find_all("tr")[0]
    col_101 = row_10.find_all("td")[1]
    cost = col_101.get_text()[9:-1]
    servant_list[i]["cost"] = cost
    if (i != 0):
        row_11 = stats[1].find_all("tr")[1]
        col_110 = row_11.find_all("td")[0]
        atk = col_110.get_text(strip=True)[4:]
        servant_list[i]["atk"] = atk
        col_111 = row_11.find_all("td")[1]
        hp = col_111.get_text(strip=True)[3:]
        servant_list[i]["hp"] = hp
    else:
        row_11 = stats[1].find_all("tr")[1]
        col_110 = row_11.find_all("td")[0]
        atk = col_110.get_text("|", strip=True).split("|")[3]
        servant_list[i]["atk"] = atk
        col_111 = row_11.find_all("td")[1]
        hp = col_111.get_text("|", strip=True).split("|")[3]
        servant_list[i]["hp"] = hp

    row_12 = stats[1].find_all("tr")[2]
    col_120 = row_12.find_all("td")[0]
    grail_atk = col_120.get_text(strip=True)[10:]
    servant_list[i]["grail_atk"] = grail_atk
    col_121 = row_12.find_all("td")[1]
    grail_hp = col_121.get_text(strip=True)[9:]
    servant_list[i]["grail_hp"] = grail_hp

    row_13 = stats[1].find_all("tr")[3]
    col_130 = row_13.find_all("td")[0]
    voice_actor = col_130.get_text(strip=True)[12:]
    servant_list[i]["voice_actor"] = voice_actor
    col_131 = row_13.find_all("td")[1]
    illustrator = col_131.get_text(strip=True)[12:]
    servant_list[i]["illustrator"] = illustrator

    row_14 = stats[1].find_all("tr")[4]
    col_140 = row_14.find_all("td")[0]
    attribute = col_140.get_text(strip=True)[10:]
    servant_list[i]["attribute"] = attribute
    col_141 = row_14.find_all("td")[1]
    growth_curve = col_141.get_text(strip=True)[13:]
    servant_list[i]["growth_curve"] = growth_curve

    row_15 = stats[1].find_all("tr")[5]
    col_150 = row_15.find_all("td")[0]
    star_absorption = col_150.get_text(strip=True)[16:]
    servant_list[i]["star_absorption"] = star_absorption
    col_151 = row_15.find_all("td")[1]
    star_generation = col_151.get_text(strip=True)[16:]
    servant_list[i]["star_generation"] = star_generation
    row_16 = stats[1].find_all("tr")[6]

    col_160 = row_16.find_all("td")[0]
    np_charge_atk = col_160.get_text(strip=True)[14:]
    servant_list[i]["np_charge_atk"] = np_charge_atk
    col_161 = row_16.find_all("td")[1]
    np_charge_def = col_161.get_text(strip=True)[14:]
    servant_list[i]["np_charge_def"] = np_charge_def
    row_17 = stats[1].find_all("tr")[7]

    col_170 = row_17.find_all("td")[0]
    death_rate = col_170.get_text(strip=True)[11:]
    servant_list[i]["death_rate"] = death_rate
    col_171 = row_17.find_all("td")[1]
    alignments = col_171.get_text(strip=True)[11:]
    servant_list[i]["alignments"] = alignments

    row_18 = stats[1].find_all("tr")[8]
    col_180 = row_18.find_all("td")[0]
    gender = col_180.get_text(strip=True)[7:]
    servant_list[i]["gender"] = gender

    # table 3
    row_20 = stats[2].find_all("tr")[0]
    col_200 = row_20.find_all("td")[0]
    traits = col_200.get_text(strip=True)[7:]
    servant_list[i]["traits"] = traits

    row_21 = stats[2].find_all("tr")[1]
    qab = row_21.find("th").find("img")["data-src"].split(".png")[0] + ".png"
    servant_list[i]["qab"] = qab

    # servants_imgs
    saint_graphs = []
    saint_graphs_gallery = soup.find("div", attrs={"title": "Saint Graphs"}).find_all("div", attrs={"class": "wikia-gallery-item"})
    for saint_graphs_gallery_item in saint_graphs_gallery:
        img_src = saint_graphs_gallery_item.find("img")["src"].split(".png")[0] + ".png"
        img_caption = saint_graphs_gallery_item.find("div", attrs={"class": "lightbox-caption"}).get_text().replace(".", " ").replace(" ", "_").lower()
        saint_graphs.append({img_caption : img_src})
    servant_list[i]["saint_graphs"] = saint_graphs

    icons = []
    icons_gallery = soup.find("div", attrs={"title": "Icons"}).find_all("div", attrs={"class": "wikia-gallery-item"})
    for icons_gallery_item in icons_gallery:
        img_src = icons_gallery_item.find("img")["src"].split(".png")[0] + ".png"
        img_caption = icons_gallery_item.find("div", attrs={"class": "lightbox-caption"}).get_text().replace(".", " ").replace(" ", "_").lower()
        icons.append({img_caption : img_src})
    servant_list[i]["icons"] = icons

    sprites = []
    if (i != 148):
        sprites_gallery = soup.find("div", attrs={"title": "Sprites"}).find_all("div", attrs={"class": "wikia-gallery-item"})
    else:
        sprites_gallery = soup.find("div", attrs={"title": "Sprite"}).find_all("div", attrs={"class": "wikia-gallery-item"})

    for sprites_gallery_item in sprites_gallery:
        img_src = sprites_gallery_item.find("img")["src"].split(".png")[0] + ".png"
        img_caption = sprites_gallery_item.find("div", attrs={"class": "lightbox-caption"}).get_text().replace(".", " ").replace(" ", "_").lower()
        sprites.append({img_caption : img_src})
    servant_list[i]["sprites"] = sprites

    # active_skills
    active_skills = []

    # passive_skills

    # print(servant_list[i])


def main():
    collection_servants_info = connect();
    # getSvtData(0);
    for i in range(0, 240):
        print(i)
        getSvtData(i)
    # print(servant_list)
    # with open("servants", "w") as f:
    #     print(servant_list, file=f)
    collection_servants_info.insert_many(servant_list)

if __name__ == "__main__":
     main()
