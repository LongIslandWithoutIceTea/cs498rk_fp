import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import PlayerShipTable from '../PlayerTable/PlayerShipTable.js'
import PlayerRankTable from '../PlayerTable/PlayerRankTable.js'

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";
const achievementsDict = {
    "DOUBLE_KILL":{'text':'Double Strike','image':'http://wiki.gcdn.co/images/f/f3/Icon_achievement_DOUBLE_KILL.png'},
    "MAIN_CALIBER":{'text':'High Caliber','image':'http://wiki.gcdn.co/images/5/51/Icon_achievement_MAIN_CALIBER.png'},
    "LIQUIDATOR":{'text':'Liquidator','image':'http://wiki.gcdn.co/images/3/3f/Icon_achievement_LIQUIDATOR.png'},
    "WITHERING":{'text':'Witherer','image':'http://wiki.gcdn.co/images/5/5f/Icon_achievement_WITHERING.png'},
    "FIREPROOF":{'text':'Fireproof','image':'http://wiki.gcdn.co/images/0/03/Icon_achievement_FIREPROOF.png'},
    "ARSONIST":{'text':'Arsonist','image':'http://wiki.gcdn.co/images/5/57/Icon_achievement_ARSONIST.png'},
    "DETONATED":{'text':'Detonation','image':'http://wiki.gcdn.co/images/f/f7/Icon_achievement_DETONATED.png'},
    "INSTANT_KILL":{'text':'Devastating Strike','image':'http://wiki.gcdn.co/images/0/01/Icon_achievement_INSTANT_KILL.png'},
    "UNSINKABLE":{'text':'Unsinkable','image':'http://wiki.gcdn.co/images/c/c0/Icon_achievement_UNSINKABLE.png'},
    "CLEAR_SKY":{'text':'Clear Sky','image':'http://wiki.gcdn.co/images/e/e4/Icon_achievement_AIRKING.png'},
    "DREADNOUGHT":{'text':'Dreadnought','image':'http://wiki.gcdn.co/images/2/24/Icon_achievement_DREADNOUGHT.png'},
    "FIRST_BLOOD":{'text':'First Blood','image':'http://wiki.gcdn.co/images/f/f4/Icon_achievement_FIRST_BLOOD.png'},
    "HEADBUTT":{'text':'Die-Hard','image':'http://wiki.gcdn.co/images/3/37/Icon_achievement_HEADBUTT.png'},
    "ONE_SOLDIER_IN_THE_FIELD":{'text':'Solo Warrior','image':'http://wiki.gcdn.co/images/5/50/Icon_achievement_ONE_SOLDIER_IN_THE_FIELD.png'},
    "WARRIOR":{'text':'Kraken Unleashed','image':'http://wiki.gcdn.co/images/0/0c/Icon_achievement_WARRIOR.png'},
    "SUPPORT":{'text':'Confederate','image':'http://wiki.gcdn.co/images/3/32/Icon_achievement_SUPPORT.png'},
    "ATBA_CALIBER":{'text':'Close Quarters Expert','image':'http://wiki.gcdn.co/images/1/1a/Icon_achievement_ATBA_CALIBER.png'},
    "RETRIBUTION":{'text':"It's Just A Flesh Wound!",'image':'http://wiki.gcdn.co/images/4/4d/Icon_achievement_RETRIBUTION.png'},
};

function division(a,b){
  if (b === 0){
    return 0;
  }else{
    return Math.round(a / b * 100) / 100;
  }
}

function divisionWhole(a,b){
  if (b === 0){
    return 0;
  }else{
    return Math.round(a / b);
  }
}

export default class PlayerIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      achievementsVisible: window.innerWidth>400?true:false,
      playerTableVisible: window.innerWidth>=1920?true:false,
      data: {"last_battle_time":1555816434,"account_id":1019218342,"leveling_tier":15,"created_at":1457320991,"leveling_points":12806,"updated_at":1555877501,"private":null,"hidden_profile":false,"logout_at":1555877490,"karma":null,"statistics":{"distance":496492,"battles":12716,"pvp":{"max_xp":6511,"damage_to_buildings":619131,"main_battery":{"max_frags_battle":8,"frags":9655,"hits":763954,"max_frags_ship_id":3765384944,"shots":2056909},"max_ships_spotted_ship_id":3751786288,"max_damage_scouting":334282,"art_agro":4000000001,"max_xp_ship_id":3760109008,"ships_spotted":14066,"second_battery":{"max_frags_battle":3,"frags":364,"hits":98556,"max_frags_ship_id":3751753712,"shots":488873},"max_frags_ship_id":4184815568,"xp":20988609,"survived_battles":5087,"dropped_capture_points":0,"max_damage_dealt_to_buildings":213600,"torpedo_agro":848533559,"draws":4,"control_captured_points":99320,"battles_since_510":9057,"max_total_agro_ship_id":4276041424,"planes_killed":48366,"battles":11055,"max_ships_spotted":12,"max_suppressions_ship_id":4276041424,"survived_wins":4322,"frags":14915,"damage_scouting":257570466,"max_total_agro":4793200,"max_frags_battle":8,"capture_points":0,"ramming":{"max_frags_battle":1,"frags":117,"max_frags_ship_id":3760109008},"suppressions_count":3,"max_suppressions_count":1,"torpedoes":{"max_frags_battle":4,"frags":1359,"hits":6254,"max_frags_ship_id":4282267344,"shots":82849},"max_planes_killed_ship_id":4288591856,"aircraft":{"max_frags_battle":7,"frags":1551,"max_frags_ship_id":3763320816},"team_capture_points":1112945,"control_dropped_points":64546,"max_damage_dealt":342198,"max_damage_dealt_to_buildings_ship_id":4282333168,"max_damage_dealt_ship_id":4276041424,"wins":6872,"losses":4179,"damage_dealt":892778787,"max_planes_killed":83,"max_scouting_damage_ship_id":4279219920,"team_dropped_capture_points":542979,"battles_since_512":8542}},"nickname":"Quincy_0v0","stats_updated_at":1555877501},
      clandata: {"1000043952":{"members_count":46,"name":"Hiryu Ride Face","creator_name":"Aikun96","clan_id":1000043952,"created_at":1484747968,"updated_at":1555210651,"leader_name":"ChipsChan","members_ids":[1003333910,1004477726,1007175219,1008316697,1008625506,1009061145,1009661450,1010209482,1010323946,1010724543,1011528019,1013304000,1013334385,1013587959,1013999547,1015329727,1015357346,1015493067,1015610394,1018349928,1018526149,1021128077,1021760124,1021825753,1022169623,1023567781,1023915822,1023925788,1024488643,1024492045,1025308785,1025493071,1025871171,1026265082,1026478590,1026558717,1027538149,1027962043,1028085712,1029202697,1029258263,1029652630,1030351561,1030590838,1031351287,1033795111],"creator_id":1016393566,"tag":"KUMA","old_name":null,"is_clan_disbanded":false,"renamed_at":null,"old_tag":null,"leader_id":1013587959,"description":"If u know Kancolle, Warships Girls R, Azur Lane, Ars Nova(Blue Steel), High School Fleet than u can join us.\nPs: Girls und Panzer is a good anime! Watch it!"}},
      achievements:{"battle":{"FOOLSDAY_TROOPER":9,"COLLECTION_HAPPY_BIRTHDAY2018_COMPLETED":1,"ONE_SOLDIER_IN_THE_FIELD":5,"CAMPAIGN_VIVELAFRANCE_COMPLETED_EXCELLENT":1,"CLAN_SEASON_1_LEAGUE_3":3,"SEA_LEGEND":1,"CLAN_SEASON_1_LEAGUE_1":2,"CLAN_SEASON_1_LEAGUE_4":3,"COLLECTION_BRITISHARC_COMPLETED":1,"SCIENCE_OF_WINNING_TACTICIAN":1,"FOOLSDAY_ONE_STEP":1,"DOUBLE_KILL":122,"COLLECTION_DUNKIRK_COMPLETED":1,"BD2016_MANNERS":1,"MAIN_CALIBER":960,"COLLECTION_HSF2018_COMPLETED":1,"COLLECTION_AMERICANARC_COMPLETED":1,"BD2016_RUN_FOREST":1,"NY17_AIMING":1,"EV1APR19_ALLROUNDER":1,"CAMPAIGN_NEWYEAR2019PEF_COMPLETED":1,"FOOLSDAY_POEKHALI":1,"RASPUTIN":1,"COLLECTION_HAPPYNEWYEAR2019_COMPLETED":1,"LIQUIDATOR":34,"CLAN_SEASON_1_LEAGUE_2":3,"WITHERING":174,"BD2016_FIRESHOW":1,"FIREPROOF":116,"BD2_CONTAINERS":57,"BD2_FR":6,"CAMPAIGN_NEWYEAR2019STEELQUEST_COMPLETED_EXCELLENT":1,"EV1APR19_ATTDEF2":1,"AVACOMMON":1,"SUPPORT":976,"CAMPAIGN_VIVELAFRANCE_COMPLETED":1,"MERCENARY":1,"MESSENGER":1,"PVE_HON_PR_SAVE_1":1,"SCIENCE_OF_WINNING_ARSONIST":1,"BD2016_PARTY_CHECK_IN":1,"NY17_DRESS_THE_TREE":1,"WORKAHOLIC_L":1,"HEADBUTT":10,"BD2_CAMPAIGNS":1,"BD2_CREW":159,"ATBA_CALIBER":383,"MERCENARY_L":1,"EV1APR19_EPICENTER1":6,"AIRKING":24,"BD2_ARP":2,"NO_PRICE_FOR_HEROISM":1,"FILLALBUM_BRIT_CVARC_COMPLETED":1,"NEVER_ENOUGH_MONEY":1,"BD2016_FESTIV_SOUP":1,"ARSONIST":160,"WARRIOR":230,"WORKAHOLIC":1,"PVE_HON_PR_DONE_ALL_1":1,"DETONATED":81,"CHIEF_ENGINEER":1,"PVE_HON_FRAG_CLASS":11,"EV1APR19_DOMINATION2":3,"NO_DAY_WITHOUT_ADVENTURE_L":1,"EV1APR19_DOMINATION1":1,"CAMPAIGN_NEWYEAR2019STEELQUEST_COMPLETED":1,"NEWYEAR_LEADERBOARD":1,"SCIENCE_OF_WINNING_LUCKY":1,"CAMPAIGN_SB_COMPLETED":1,"BD2_RANKS":21,"COLLECTION_OVECHKIN_COMPLETED":1,"COLLECTION_HAPPYNEWYEAR2018_COMPLETED":1,"INSTANT_KILL":1594,"UNSINKABLE":8,"ENGINEER":1,"CAMPAIGN_HALSEY_COMPLETED":1,"CAMPAIGN_NEWYEAR2018BASIC_COMPLETED":1,"NY17_SAFECRACKER":1,"JUNIOR_PLANNER":1,"BD2_CAMO":15,"COLLECTION_VIVELAFRANCE_COMPLETED":1,"BD2016_RISE_OF_THE_MACHINES":1,"BD2016_SNATCH":1,"NO_DAY_WITHOUT_ADVENTURE":1,"CAMPAIGN_NEWYEAR2018ELITE_COMPLETED":1,"PVE_HERO_WIN_SUR":2,"COLLECTION_YAMAMOTO_COMPLETED":1,"DREADNOUGHT":509,"CLEAR_SKY":37,"HALLOWEEN_2017":1,"HALLOWEEN_2016":1,"HALLOWEEN_2018":1,"CAMPAIGN_BISMARCK_COMPLETED":1,"PVE_HON_PR_SAVE_2":1,"PVE_HERO_DAM_ENEM":11,"FOOLSDAY_SHIELDS":1,"FIGHTER":1,"NY17_500_LEAGUES":1,"MILLIONAIR":1,"CAMPAIGN_YAMAMOTO_COMPLETED":1,"EV1APR19_TORPEDO1":3,"BD2016_KING_OF_PARTY":1,"EV1APR19_TORPEDO3":4,"PVE_HON_PR_DONE_1":1,"EV1APR19_TORPEDO5":2,"MESSENGER_L":1,"BATTLE_HERO":1,"BD2016_WRONG_SOW":1,"PVE_HON_WIN_ALL_DONE":15,"CAMPAIGN1_COMPLETED":1,"BD2_GE":4,"BD2_GB":14,"BD2_CREDITS":44,"SCIENCE_OF_WINNING_HARD_EDGED":1,"VETERAN":1,"RETRIBUTION":335,"CAMPAIGN_NY17B_COMPLETED":1,"TWITCH_WG":1,"BD2016_PARTY_ANIMAL":1,"SCIENCE_OF_WINNING_TO_THE_BOTTOM":1,"GREATEEIGHT":18,"COLLECTION_BISMARCK_COMPLETED":1,"NY17_BREAK_THE_BANK":1,"ALL_THREE_HALLOWEEN_COMPLETE":1,"CAPITAL":1,"SCIENCE_OF_WINNING_BOMBARDIER":1,"PVE_DUNKERQUE_OPERATION_DYNAMO":1,"FIRST_BLOOD":1031,"COLLECTION_WOWSBIRTHDAY_COMPLETED":1,"AIRDEFENSEEXPERT":9,"NY17_WIN_AT_LEAST_ONE":1,"CAMPAIGN_NY17B_COMPLETED_EXCELLENT":1,"AMAUTEUR":1,"ATB_HEPHAESTUS":1},"progress":{"FIGHTER":0,"MILLIONAIR":0,"MERCENARY":0,"PVE_HON_PR_DONE_1":0,"PVE_HON_PR_SAVE_1":0,"ENGINEER":0,"BATTLE_HERO":0,"WORKAHOLIC_L":0,"PVE_HON_PR_SAVE_2":0,"JUNIOR_PLANNER":0,"MESSENGER_L":0,"VETERAN":0,"MERCENARY_L":0,"EV1APR19_ALLROUNDER":0,"NO_DAY_WITHOUT_ADVENTURE":0,"NEVER_ENOUGH_MONEY":0,"NO_PRICE_FOR_HEROISM":0,"ALL_THREE_HALLOWEEN_COMPLETE":0,"CAPITAL":0,"SCIENCE_OF_WINNING_BOMBARDIER":0,"WORKAHOLIC":0,"PVE_HON_PR_DONE_ALL_1":0,"SEA_LEGEND":0,"CHIEF_ENGINEER":0,"NO_DAY_WITHOUT_ADVENTURE_L":0,"MESSENGER":0,"AMAUTEUR":0}},
      clansummary: "",
      rankdata:{"11":{"rank_info":{"max_rank":5,"start_rank":18,"stars":0,"rank":5,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":3,"draws":1,"max_xp":3810,"wins":38,"planes_killed":3,"losses":38,"torpedoes":{"max_frags_battle":1,"frags":8,"hits":51,"shots":1426},"battles":77,"max_damage_dealt":201841,"damage_dealt":6604119,"max_planes_killed":2,"aircraft":{"max_frags_battle":0,"frags":0},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":2,"frags":23,"hits":11134,"shots":31244},"second_battery":{"max_frags_battle":1,"frags":1,"hits":5,"shots":98},"survived_wins":34,"frags":45,"xp":122760,"survived_battles":49},"rank_div2":null},"10":{"rank_info":{"max_rank":6,"start_rank":23,"stars":0,"rank":6,"stage":2},"rank_div3":null,"rank_solo":{"max_frags_battle":4,"draws":0,"max_xp":4190,"wins":64,"planes_killed":216,"losses":57,"torpedoes":{"max_frags_battle":2,"frags":13,"hits":97,"shots":1168},"battles":121,"max_damage_dealt":219300,"damage_dealt":10793827,"max_planes_killed":52,"aircraft":{"max_frags_battle":2,"frags":2},"ramming":{"max_frags_battle":1,"frags":7},"main_battery":{"max_frags_battle":4,"frags":94,"hits":5933,"shots":16176},"second_battery":{"max_frags_battle":1,"frags":1,"hits":763,"shots":4151},"survived_wins":46,"frags":122,"xp":189900,"survived_battles":59},"rank_div2":null},"1":{"rank_info":{"max_rank":0,"start_rank":0,"stars":0,"rank":0,"stage":0},"rank_div3":null,"rank_solo":null,"rank_div2":null},"102":{"rank_info":{"max_rank":10,"start_rank":10,"stars":0,"rank":10,"stage":1},"rank_div3":null,"rank_solo":null,"rank_div2":null},"3":{"rank_info":{"max_rank":1,"start_rank":22,"stars":1,"rank":1,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":4,"draws":0,"max_xp":3564,"wins":95,"planes_killed":379,"losses":71,"torpedoes":{"max_frags_battle":2,"frags":51,"hits":346,"shots":4872},"battles":166,"max_damage_dealt":164993,"damage_dealt":7268326,"max_planes_killed":49,"aircraft":{"max_frags_battle":2,"frags":14},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":2,"frags":56,"hits":3319,"shots":15994},"second_battery":{"max_frags_battle":0,"frags":0,"hits":137,"shots":705},"survived_wins":83,"frags":137,"xp":227532,"survived_battles":111},"rank_div2":null},"2":{"rank_info":{"max_rank":7,"start_rank":18,"stars":1,"rank":7,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":4,"draws":0,"max_xp":3456,"wins":34,"planes_killed":234,"losses":20,"torpedoes":{"max_frags_battle":3,"frags":12,"hits":58,"shots":904},"battles":54,"max_damage_dealt":97509,"damage_dealt":1990521,"max_planes_killed":32,"aircraft":{"max_frags_battle":2,"frags":4},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":2,"frags":24,"hits":1166,"shots":4937},"second_battery":{"max_frags_battle":0,"frags":0,"hits":10,"shots":147},"survived_wins":33,"frags":43,"xp":68749,"survived_battles":44},"rank_div2":null},"5":{"rank_info":{"max_rank":9,"start_rank":23,"stars":1,"rank":9,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":3,"draws":0,"max_xp":3308,"wins":28,"planes_killed":52,"losses":13,"torpedoes":{"max_frags_battle":2,"frags":7,"hits":44,"shots":642},"battles":41,"max_damage_dealt":116460,"damage_dealt":2038916,"max_planes_killed":23,"aircraft":{"max_frags_battle":1,"frags":1},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":2,"frags":24,"hits":2005,"shots":5944},"second_battery":{"max_frags_battle":0,"frags":0,"hits":78,"shots":358},"survived_wins":22,"frags":37,"xp":53887,"survived_battles":25},"rank_div2":null},"4":{"rank_info":{"max_rank":8,"start_rank":22,"stars":1,"rank":9,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":4,"draws":0,"max_xp":2858,"wins":36,"planes_killed":40,"losses":28,"torpedoes":{"max_frags_battle":2,"frags":18,"hits":69,"shots":1038},"battles":64,"max_damage_dealt":104715,"damage_dealt":2180962,"max_planes_killed":8,"aircraft":{"max_frags_battle":0,"frags":0},"ramming":{"max_frags_battle":1,"frags":1},"main_battery":{"max_frags_battle":3,"frags":30,"hits":1920,"shots":6944},"second_battery":{"max_frags_battle":0,"frags":0,"hits":13,"shots":52},"survived_wins":28,"frags":65,"xp":82650,"survived_battles":36},"rank_div2":null},"7":{"rank_info":{"max_rank":13,"start_rank":23,"stars":1,"rank":13,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":3,"draws":0,"max_xp":1796,"wins":8,"planes_killed":7,"losses":7,"torpedoes":{"max_frags_battle":1,"frags":3,"hits":12,"shots":225},"battles":15,"max_damage_dealt":77177,"damage_dealt":595520,"max_planes_killed":4,"aircraft":{"max_frags_battle":0,"frags":0},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":2,"frags":10,"hits":1275,"shots":3712},"second_battery":{"max_frags_battle":0,"frags":0,"hits":9,"shots":68},"survived_wins":6,"frags":13,"xp":15226,"survived_battles":9},"rank_div2":null},"6":{"rank_info":{"max_rank":10,"start_rank":23,"stars":0,"rank":10,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":4,"draws":0,"max_xp":3236,"wins":16,"planes_killed":0,"losses":7,"torpedoes":{"max_frags_battle":2,"frags":9,"hits":49,"shots":700},"battles":23,"max_damage_dealt":137637,"damage_dealt":1068390,"max_planes_killed":0,"aircraft":{"max_frags_battle":0,"frags":0},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":2,"frags":14,"hits":1712,"shots":3954},"second_battery":{"max_frags_battle":0,"frags":0,"hits":0,"shots":0},"survived_wins":14,"frags":31,"xp":44907,"survived_battles":14},"rank_div2":null},"9":{"rank_info":{"max_rank":5,"start_rank":23,"stars":0,"rank":5,"stage":4},"rank_div3":null,"rank_solo":{"max_frags_battle":3,"draws":0,"max_xp":3459,"wins":54,"planes_killed":221,"losses":35,"torpedoes":{"max_frags_battle":1,"frags":3,"hits":32,"shots":567},"battles":89,"max_damage_dealt":190042,"damage_dealt":6949088,"max_planes_killed":41,"aircraft":{"max_frags_battle":2,"frags":7},"ramming":{"max_frags_battle":1,"frags":3},"main_battery":{"max_frags_battle":3,"frags":56,"hits":4083,"shots":11598},"second_battery":{"max_frags_battle":1,"frags":3,"hits":759,"shots":4874},"survived_wins":39,"frags":81,"xp":133269,"survived_battles":45},"rank_div2":null},"8":{"rank_info":{"max_rank":8,"start_rank":23,"stars":2,"rank":9,"stage":2},"rank_div3":null,"rank_solo":{"max_frags_battle":3,"draws":0,"max_xp":3032,"wins":38,"planes_killed":241,"losses":31,"torpedoes":{"max_frags_battle":2,"frags":10,"hits":51,"shots":956},"battles":69,"max_damage_dealt":127244,"damage_dealt":3251330,"max_planes_killed":46,"aircraft":{"max_frags_battle":1,"frags":3},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":2,"frags":35,"hits":7068,"shots":19502},"second_battery":{"max_frags_battle":1,"frags":1,"hits":16,"shots":122},"survived_wins":29,"frags":61,"xp":91871,"survived_battles":29},"rank_div2":null},"103":{"rank_info":{"max_rank":9,"start_rank":10,"stars":1,"rank":9,"stage":2},"rank_div3":null,"rank_solo":{"max_frags_battle":1,"draws":0,"max_xp":1082,"wins":1,"planes_killed":0,"losses":0,"torpedoes":{"max_frags_battle":0,"frags":0,"hits":0,"shots":4},"battles":1,"max_damage_dealt":23458,"damage_dealt":23458,"max_planes_killed":0,"aircraft":{"max_frags_battle":0,"frags":0},"ramming":{"max_frags_battle":0,"frags":0},"main_battery":{"max_frags_battle":1,"frags":1,"hits":24,"shots":78},"second_battery":{"max_frags_battle":0,"frags":0,"hits":0,"shots":0},"survived_wins":1,"frags":1,"xp":1082,"survived_battles":1},"rank_div2":null},"101":{"rank_info":{"max_rank":7,"start_rank":10,"stars":1,"rank":7,"stage":2},"rank_div3":null,"rank_solo":{"max_frags_battle":2,"draws":0,"max_xp":1965,"wins":3,"planes_killed":1,"losses":2,"torpedoes":{"max_frags_battle":0,"frags":0,"hits":0,"shots":0},"battles":5,"max_damage_dealt":123476,"damage_dealt":400646,"max_planes_killed":1,"aircraft":{"max_frags_battle":0,"frags":0},"ramming":{"max_frags_battle":1,"frags":1},"main_battery":{"max_frags_battle":2,"frags":5,"hits":214,"shots":582},"second_battery":{"max_frags_battle":1,"frags":1,"hits":88,"shots":322},"survived_wins":3,"frags":7,"xp":6368,"survived_battles":3},"rank_div2":null},"104":{"rank_info":{"max_rank":0,"start_rank":0,"stars":0,"rank":0,"stage":0},"rank_div3":null,"rank_solo":null,"rank_div2":null}},
    }
    this.buildAchievements = this.buildAchievements.bind(this);
    this.buildRankSummary = this.buildRankSummary.bind(this);
    this.buildMiniRankSummary = this.buildMiniRankSummary.bind(this);
  }
  componentDidMount() {
    axios.get("https://api.worldofwarships.com/wows/account/info/?application_id=" + application_id + "&account_id=" + this.props.account_id)
    .then((response)=>{
        this.setState({data: response.data.data[this.props.account_id]});
    })
    .catch((error) => console.log(error));
    axios.get("https://api.worldofwarships.com/wows/clans/accountinfo/?application_id=" + application_id + "&account_id=" + this.props.account_id)
    .then((response)=>{
        var clan_id = response.data.data[this.props.account_id].clan_id;
        axios.get("  https://api.worldofwarships.com/wows/clans/info/?application_id=" + application_id + "&clan_id=" + clan_id)
        .then((response)=>{
            this.setState({
              clandata: response.data.data[clan_id],
              clansummary: "[" + response.data.data[clan_id].tag + "] " + response.data.data[clan_id].name,
            });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
    axios.get("https://api.worldofwarships.com/wows/account/achievements/?application_id=" + application_id + "&account_id=" + this.props.account_id)
    .then((response)=>{
        this.setState({achievements:response.data.data[this.props.account_id]})
    })
    .catch((error) => console.log(error));
    axios.get("https://api.worldofwarships.com/wows/seasons/accountinfo/?application_id=" + application_id + "&account_id=" + this.props.account_id)
    .then((response)=>{
        this.setState({rankdata:response.data.data[this.props.account_id].seasons})
    })
    .catch((error) => console.log(error));
  }

  buildAchievements() {
    var arr = [];
    var achievements = this.state.achievements.battle;
    for (const [name, number] of Object.entries(this.state.achievements.battle)) {
      if(achievementsDict[name]){
        arr.push(
          <Card raised>
            <Image src={achievementsDict[name].image} size={window.innerWidth>400?window.innerWidth>1080?'medium':'medium':'small'} />
            <Card.Content
              style={{
                padding: '0.5em',
              }}
            >
              <Card.Header>{achievementsDict[name].text}</Card.Header>
              <Card.Header>{number}</Card.Header>
            </Card.Content>
          </Card>
        )
      }
    }
    return arr;
  }

  buildRankSummary() {
    var arr = [];
    for (const [season, data] of Object.entries(this.state.rankdata)) {
      if(this.state.rankdata[season].rank_solo && parseInt(season) < 100){
        arr.push(
          <List.Item
          style={{
            margin:'2.5em',
          }}
          >
            <List.Content>
              <List.Header>{"Season " + season + ": "}</List.Header>
              <Statistic>
                <Statistic.Value>{this.state.rankdata[season].rank_info.rank}</Statistic.Value>
                <Statistic.Label>Rank: </Statistic.Label>
              </Statistic>
            </List.Content>
          </List.Item>
        )
      }
    }
    return arr;
  }

  buildMiniRankSummary() {
    var arr = [];
    for (const [season, data] of Object.entries(this.state.rankdata)) {
      if(this.state.rankdata[season].rank_solo && parseInt(season) >= 100){
        arr.push(
          <List.Item
          style={{
            margin:'2.5em',
          }}
          >
            <List.Content>
              <List.Header>{"Mini " + (parseInt(season)-100).toString() + ": "}</List.Header>
              <Statistic>
                <Statistic.Value>{this.state.rankdata[season].rank_info.rank}</Statistic.Value>
                <Statistic.Label>Rank: </Statistic.Label>
              </Statistic>
            </List.Content>
          </List.Item>
        )
      }
    }
    return arr;
  }

  render() {
    return (
      <Segment>
        <Container text>
          <Icon name='user circle'
            style={{
              fontSize: window.innerWidth>860?'4em':'3em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: window.innerWidth>860?'2em':'1em',
            }}
          />
          <Header as='h1' content={this.state.data.nickname}
            style={{
              fontSize: window.innerWidth>860?'4em':'3em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: window.innerWidth>860?'0.5em':'0.25em',
            }}
          />
          <Header as='h2' content={this.state.clansummary}
            style={{
              fontSize: window.innerWidth>860?'1.7em':'1.2em',
              fontWeight: 'normal',
              marginTop: window.innerWidth>860?'0.5em':'0.25em',
            }}
          />
        </Container>

        <div
          style={{
            marginTop: '7em',
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent : 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div style={{margin: '1.5em'}}>
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.battles.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Battles</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.max_xp.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Max XP</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.max_damage_dealt.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Max Damage</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.max_frags_battle.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Max Kills</Statistic.Label>
          </Statistic>
          </div>

        </div>

        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4'>
            <Icon name='id card outline' />
            General Performance
          </Header>
        </Divider>

        <div
          style={{
            marginTop: '4em',
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent : 'center',
            alignItems: 'center',
          }}
        >
          <div style={{margin: '1.5em'}}>
          <Statistic horizontal size="small">
            <Statistic.Value>{divisionWhole(this.state.data.statistics.pvp.xp,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
            <Statistic.Label>Average XP</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic horizontal size="small">
            <Statistic.Value>{divisionWhole(this.state.data.statistics.pvp.damage_dealt,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
            <Statistic.Label>Average Damage</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic horizontal size="small">
            <Statistic.Value>{division(this.state.data.statistics.pvp.frags,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
            <Statistic.Label>Average Kills</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic horizontal size="small">
            <Statistic.Value>{division(this.state.data.statistics.pvp.survived_battles,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses) * 100 + "%"}</Statistic.Value>
            <Statistic.Label>Survival Rate</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic horizontal size="small">
            <Statistic.Value>{division(this.state.data.statistics.pvp.main_battery.hits,this.state.data.statistics.pvp.main_battery.shots) * 100 + "%"}</Statistic.Value>
            <Statistic.Label>Main Battery Hit Rate</Statistic.Label>
          </Statistic>
          </div>
        </div>

        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4' onClick={() => this.setState({ playerTableVisible: !this.state.playerTableVisible })}>
            <Icon name='trophy' />
            Achievements
          </Header>
        </Divider>

        <Container textAlign='center'
        style={{
            marginTop: '5em',
          }}
        >
          <Card.Group itemsPerRow={window.innerWidth>400?window.innerWidth>1080?9:4:2} centered>
            {this.buildAchievements()}
          </Card.Group>
        </Container>


        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4'>
            <Icon name='quidditch' />
            Rank Summary
          </Header>
        </Divider>
        <div
        style={{
          marginLeft: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent : 'center',
          alignItems: 'flex-start',
        }}
        >
          {this.buildRankSummary()}
        </div>
        <div
        style={{
          marginTop: '2em',
          marginLeft: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent : 'center',
          alignItems: 'flex-start',
        }}
        >
          {this.buildMiniRankSummary()}
        </div>

        <Divider horizontal
        style={{
            marginTop: '5em',
            visibility: this.state.playerTableVisible?'visible':'hidden',
          }}
        >
          <Header as='h4'>
            <Icon name='bar chart' />
            Detail Performance
          </Header>
        </Divider>

        <div
        style={{
          display:this.state.playerTableVisible?'block':'none',
        }}
        >
        <Tab menu={{ secondary: true, pointing: true }} panes={
          [
            { menuItem: 'Random', render: () =>
            <Tab.Pane attached={false}>
              <Container fluid textAlign='center'>
                <PlayerShipTable account_id = {this.props.account_id}/>
              </Container>
            </Tab.Pane> },
            { menuItem: 'Rank', render: () =>
            <Tab.Pane attached={false}>
              <Container fluid textAlign='center'>
                <PlayerRankTable account_id = {this.props.account_id}/>
              </Container>
            </Tab.Pane> },
          ]} />
        </div>

      </Segment>
    );
  }
}
/*
<Button secondary onClick={() => this.setState({ playerTableVisible: this.state.playerTableVisible?false:true })}>

</Button>*/
