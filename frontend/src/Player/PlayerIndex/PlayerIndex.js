import React, { Component } from 'react';
import {Link, NavLink} from "react-router-dom";
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Sticky, Rail } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import PlayerShipTable from '../PlayerTable/PlayerShipTable.js';
import PlayerShipTableMobile from '../PlayerTable/PlayerShipTableMobile.js';
import PlayerRankTable from '../PlayerTable/PlayerRankTable.js';
import PlayerRankTableMobile from '../PlayerTable/PlayerRankTableMobile.js';
import PlayerShipTypeTable from '../PlayerTable/PlayerShipTypeTable.js';
import PlayerShipTierTable from '../PlayerTable/PlayerShipTierTable.js';
import PlayerShipNationTable from '../PlayerTable/PlayerShipNationTable.js';
import PlayerShipTypeTableMobile from '../PlayerTable/PlayerShipTypeTableMobile.js';
import PlayerShipTierTableMobile from '../PlayerTable/PlayerShipTierTableMobile.js';
import PlayerShipNationTableMobile from '../PlayerTable/PlayerShipNationTableMobile.js';
import PlayerShipTypeGraph from '../PlayerGraph/PlayerShipTypeGraph.js';
import PlayerShipNationGraph from '../PlayerGraph/PlayerShipNationGraph.js';
import PlayerShipTierGraph from '../PlayerGraph/PlayerShipTierGraph.js';

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
      account_id: '',
      achievementsVisible: window.innerWidth>400?true:false,
      playerTableVisible: window.innerWidth>=1920?true:false,
      playerShipTableData: null,
      playerRankTableData: null,
      shipdetails: null,
      shipnames: null,
      rankshipnames: null,
      seasonOptions: [{key: '0', value: 'all', text: ''}],
      data: {"last_battle_time":0,"account_id":0,"leveling_tier":0,"created_at":1457320991,"leveling_points":12806,"updated_at":1555877501,"private":null,"hidden_profile":false,"logout_at":1555877490,"karma":null,"statistics":{"distance":496492,"battles":12716,"pvp":{"max_xp":6511,"damage_to_buildings":619131,"main_battery":{"max_frags_battle":8,"frags":9655,"hits":763954,"max_frags_ship_id":3765384944,"shots":2056909},"max_ships_spotted_ship_id":3751786288,"max_damage_scouting":334282,"art_agro":4000000001,"max_xp_ship_id":3760109008,"ships_spotted":14066,"second_battery":{"max_frags_battle":3,"frags":364,"hits":98556,"max_frags_ship_id":3751753712,"shots":488873},"max_frags_ship_id":4184815568,"xp":20988609,"survived_battles":5087,"dropped_capture_points":0,"max_damage_dealt_to_buildings":213600,"torpedo_agro":848533559,"draws":4,"control_captured_points":99320,"battles_since_510":9057,"max_total_agro_ship_id":4276041424,"planes_killed":48366,"battles":11055,"max_ships_spotted":12,"max_suppressions_ship_id":4276041424,"survived_wins":4322,"frags":14915,"damage_scouting":257570466,"max_total_agro":4793200,"max_frags_battle":8,"capture_points":0,"ramming":{"max_frags_battle":1,"frags":117,"max_frags_ship_id":3760109008},"suppressions_count":3,"max_suppressions_count":1,"torpedoes":{"max_frags_battle":4,"frags":1359,"hits":6254,"max_frags_ship_id":4282267344,"shots":82849},"max_planes_killed_ship_id":4288591856,"aircraft":{"max_frags_battle":7,"frags":1551,"max_frags_ship_id":3763320816},"team_capture_points":1112945,"control_dropped_points":64546,"max_damage_dealt":342198,"max_damage_dealt_to_buildings_ship_id":4282333168,"max_damage_dealt_ship_id":4276041424,"wins":6872,"losses":4179,"damage_dealt":892778787,"max_planes_killed":83,"max_scouting_damage_ship_id":4279219920,"team_dropped_capture_points":542979,"battles_since_512":8542}},"nickname":"","stats_updated_at":1555877501},
      clandata: {"0":{"members_count":46,"name":"Hiryu Ride Face","creator_name":"Aikun96","clan_id":0,"created_at":1484747968,"updated_at":1555210651,"leader_name":"ChipsChan","members_ids":[1003333910],"creator_id":1016393566,"tag":"KUMA","old_name":null,"is_clan_disbanded":false,"renamed_at":null,"old_tag":null,"leader_id":1013587959,"description":""}},
      achievements:{"battle":{"FOOLSDAY_TROOPER":9}},
      clansummary: "",
      rankdata:null,
    }
    this.buildAchievements = this.buildAchievements.bind(this);
    this.buildRankSummary = this.buildRankSummary.bind(this);
    this.buildSprintRankSummary = this.buildSprintRankSummary.bind(this);
    this.reloadData = this.reloadData.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({account_id:nextProps.account_id});
    this.reloadData(nextProps.account_id);
  }
  componentDidMount(){
    this.reloadData(this.props.account_id);
  }
  reloadData(account_id){
    axios.get("https://api.worldofwarships.com/wows/account/info/?application_id=" + application_id + "&account_id=" + account_id)
    .then((response)=>{
        this.setState({data: response.data.data[account_id]});
    })
    .catch((error) => console.log(error));
    axios.get("https://api.worldofwarships.com/wows/clans/accountinfo/?application_id=" + application_id + "&account_id=" + account_id)
    .then((response)=>{
        var clan_id = response.data.data[account_id].clan_id;
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
    axios.get("https://api.worldofwarships.com/wows/account/achievements/?application_id=" + application_id + "&account_id=" + account_id)
    .then((response)=>{
        this.setState({achievements:response.data.data[account_id]})
    })
    .catch((error) => console.log(error));
    axios.get("https://api.worldofwarships.com/wows/seasons/accountinfo/?application_id=" + application_id + "&account_id=" + account_id)
    .then((response)=>{
        this.setState({rankdata:response.data.data[account_id].seasons})
    })
    .catch((error) => console.log(error));
    var playerShipTableData = [];
    var playerRankTableData = [];
    var playerRankTableData = [];
    var rankstatdata = {};
    var rankship_ids = [];
    var rankshipnames = [];
    var seasonOptions = [];
    var seasons = new Set();
    var statdata = {};
    var ship_ids = [];
    var shipnames = [];
    var shipdetails = [];
    this.setState({playerShipTableData:null, playerRankTableData:null});
    axios.get("https://api.worldofwarships.com/wows/ships/stats/?application_id=" + application_id + "&account_id=" + account_id)
    .then((response)=>{
        var res = response.data.data[account_id];
        res.forEach((ship) => {
          ship_ids.push(ship.ship_id);
          statdata[ship.ship_id]={
              ship_id: ship.ship_id,
              wins: ship.pvp.wins,
              battles: (ship.pvp.wins+ship.pvp.losses+ship.pvp.draws),
              win_rate: division(ship.pvp.wins,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              survival_rate: division(ship.pvp.survived_battles,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),

              max_xp: ship.pvp.max_xp,
              max_frags_battle: ship.pvp.max_frags_battle,
              max_damage_dealt: ship.pvp.max_damage_dealt,
              max_planes_killed: ship.pvp.max_planes_killed,

              ave_xp: divisionWhole(ship.pvp.xp,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              ave_frags: division(ship.pvp.frags,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              ave_damage_dealt: divisionWhole(ship.pvp.damage_dealt,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              ave_planes_killed: division(ship.pvp.planes_killed,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),

              main_battery_max_frags_battle: ship.pvp.main_battery.max_frags_battle,
              main_battery_frags: division(ship.pvp.main_battery.frags,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              main_battery_hit_rate: division(ship.pvp.main_battery.hits,ship.pvp.main_battery.shots),

              torpedoes_max_frags_battle: ship.pvp.torpedoes.max_frags_battle,
              torpedoes_frags: division(ship.pvp.torpedoes.frags,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              torpedoes_hit_rate: division(ship.pvp.torpedoes.hits,ship.pvp.torpedoes.shots),

              second_battery_max_frags_battle: ship.pvp.second_battery.max_frags_battle,
              second_battery_frags: division(ship.pvp.second_battery.frags,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              second_battery_hit_rate: division(ship.pvp.second_battery.hits,ship.pvp.second_battery.shots),

              aircraft_max_frags_battle: ship.pvp.aircraft.max_frags_battle,
              aircraft_frags: division(ship.pvp.aircraft.frags,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),

              ramming_max_frags_battle: ship.pvp.ramming.max_frags_battle,
              ramming_frags: division(ship.pvp.ramming.frags,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),


              team_capture_points: ship.pvp.team_capture_points,
              dropped_capture_points: ship.pvp.dropped_capture_points,
              ships_spotted: ship.pvp.ships_spotted,
              max_damage_scouting: ship.pvp.max_damage_scouting,
              survived_wins: ship.pvp.survived_wins,
          }
        })
    })
    .then(()=>{
      var slice = 99;
      for(var i = 0; i < ship_ids.length/slice; i++){
        var ship_id_strings = "";
        if (i * slice + slice < ship_ids.length){
          var limit = i * slice + slice;
        }else{
          var limit = ship_ids.length;
        }
        for(var j = i * slice; j < limit; j++){
          ship_id_strings += ship_ids[j] + ",";
        }
        axios.get("https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=" + application_id,{params:{ship_id:ship_id_strings.substring(0,ship_id_strings.length-1)}})
        .then((shipresponse)=>{
          for (const [ship_id, shipres] of Object.entries(shipresponse.data.data)) {
            if(shipres && statdata[ship_id.toString()]){
              shipnames.push({key: shipres.name, value: shipres.name, text: shipres.name});
              shipdetails.push({
                ship_id: shipres.ship_id,
                name: shipres.name,
                image: shipres.images.small,
                nation: shipres.nation,
                tier: shipres.tier,
                type: shipres.type,
              });
              playerShipTableData.push({
                ship_id: shipres.ship_id,
                name: shipres.name,
                image: shipres.images.small,
                nation: shipres.nation,
                tier: shipres.tier,
                type: shipres.type,

                wins: statdata[ship_id.toString()].wins,
                battles: statdata[ship_id.toString()].battles,
                win_rate:statdata[ship_id.toString()].win_rate,
                survival_rate: statdata[ship_id.toString()].survival_rate,

                max_xp: statdata[ship_id.toString()].max_xp,
                max_frags_battle: statdata[ship_id.toString()].max_frags_battle,
                max_damage_dealt: statdata[ship_id.toString()].max_damage_dealt,
                max_planes_killed: statdata[ship_id.toString()].max_planes_killed,

                ave_xp: statdata[ship_id.toString()].ave_xp,
                ave_frags: statdata[ship_id.toString()].ave_frags,
                ave_damage_dealt: statdata[ship_id.toString()].ave_damage_dealt,
                ave_planes_killed: statdata[ship_id.toString()].ave_planes_killed,

                main_battery_max_frags_battle: statdata[ship_id.toString()].main_battery_max_frags_battle,
                main_battery_frags: statdata[ship_id.toString()].main_battery_frags,
                main_battery_hit_rate: statdata[ship_id.toString()].main_battery_hit_rate,

                torpedoes_max_frags_battle: statdata[ship_id.toString()].torpedoes_max_frags_battl,
                torpedoes_frags: statdata[ship_id.toString()].torpedoes_frags,
                torpedoes_hit_rate: statdata[ship_id.toString()].torpedoes_hit_rate,

                second_battery_max_frags_battle: statdata[ship_id.toString()].second_battery_max_frags_battle,
                second_battery_frags: statdata[ship_id.toString()].second_battery_frags,
                second_battery_hit_rate: statdata[ship_id.toString()].second_battery_hit_rate,

                aircraft_max_frags_battle: statdata[ship_id.toString()].aircraft_max_frags_battle,
                aircraft_frags: statdata[ship_id.toString()].aircraft_frags,

                ramming_max_frags_battle: statdata[ship_id.toString()].ramming_max_frags_battle,
                ramming_frags: statdata[ship_id.toString()].ramming_frags,


                team_capture_points: statdata[ship_id.toString()].team_capture_points,
                dropped_capture_points: statdata[ship_id.toString()].dropped_capture_points,
                ships_spotted: statdata[ship_id.toString()].ships_spotted,
                max_damage_scouting: statdata[ship_id.toString()].max_damage_scouting,
                survived_wins: statdata[ship_id.toString()].survived_wins,
              });
            }
          }
          this.setState({playerShipTableData :playerShipTableData ,shipnames:shipnames,shipdetails:shipdetails});
        })
        .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
    axios.get("https://api.worldofwarships.com/wows/seasons/shipstats/?application_id=" + application_id + "&account_id=" + account_id)
    .then((response)=>{
        var res = response.data.data[account_id];
        res.forEach((ship) => {
          rankship_ids.push(ship.ship_id);
          for (const [season, data] of Object.entries(ship.seasons)) {
            if(data.rank_solo){
              seasons.add(season);
              rankstatdata[ship.ship_id.toString()+","+season.toString()]={
                  ship_id: ship.ship_id,
                  wins: data.rank_solo.wins,
                  battles: (data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws),
                  win_rate: division(data.rank_solo.wins,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),
                  survival_rate: division(data.rank_solo.survived_battles,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),

                  max_xp: data.rank_solo.max_xp,
                  max_frags_battle: data.rank_solo.max_frags_battle,
                  max_damage_dealt: data.rank_solo.max_damage_dealt,
                  max_planes_killed: data.rank_solo.max_planes_killed,

                  ave_xp: divisionWhole(data.rank_solo.xp,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),
                  ave_frags: division(data.rank_solo.frags,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),
                  ave_damage_dealt: divisionWhole(data.rank_solo.damage_dealt,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),
                  ave_planes_killed: division(data.rank_solo.planes_killed,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),

                  main_battery_max_frags_battle: data.rank_solo.main_battery.max_frags_battle,
                  main_battery_frags: division(data.rank_solo.main_battery.frags,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),
                  main_battery_hit_rate: division(data.rank_solo.main_battery.hits,data.rank_solo.main_battery.shots),

                  torpedoes_max_frags_battle: data.rank_solo.torpedoes.max_frags_battle,
                  torpedoes_frags: division(data.rank_solo.torpedoes.frags,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),
                  torpedoes_hit_rate: division(data.rank_solo.torpedoes.hits,data.rank_solo.torpedoes.shots),

                  second_battery_max_frags_battle: data.rank_solo.second_battery.max_frags_battle,
                  second_battery_frags: division(data.rank_solo.second_battery.frags,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),
                  second_battery_hit_rate: division(data.rank_solo.second_battery.hits,data.rank_solo.second_battery.shots),

                  aircraft_max_frags_battle: data.rank_solo.aircraft.max_frags_battle,
                  aircraft_frags: division(data.rank_solo.aircraft.frags,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),

                  ramming_max_frags_battle: data.rank_solo.ramming.max_frags_battle,
                  ramming_frags: division(data.rank_solo.ramming.frags,(data.rank_solo.wins+data.rank_solo.losses+data.rank_solo.draws)),

                  survived_wins: data.rank_solo.survived_wins,
              }
            }
          }
        })
    })
    .then(()=>{
      for (let season of seasons){
        if (season >= 100){
          seasonOptions.push({key: season, value: season, text: "Season: Sprint " + (parseInt(season)-100).toString()});
        }else{
          seasonOptions.push({key: season, value: season, text: "Season: " + season});
        }
      }
      var slice = 99;
      for(var i = 0; i < rankship_ids.length/slice; i++){
        var ship_id_strings = "";
        if (i * slice + slice < rankship_ids.length){
          var limit = i * slice + slice;
        }else{
          var limit = rankship_ids.length;
        }
        for(var j = i * slice; j < limit; j++){
          ship_id_strings += rankship_ids[j] + ",";
        }
        axios.get("https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=" + application_id,{params:{ship_id:ship_id_strings.substring(0,ship_id_strings.length-1)}})
        .then((shipresponse)=>{
          for (const [ship_id, shipres] of Object.entries(shipresponse.data.data)) {
            if(shipres){
              rankshipnames.push({key: shipres.name, value: shipres.name, text: shipres.name});
              for (let season of seasons){
                if(rankstatdata[ship_id.toString()+","+season.toString()]){
                  playerRankTableData.push({
                    ship_id: shipres.ship_id,
                    season: season,
                    name: shipres.name,
                    image: shipres.images.small,
                    nation: shipres.nation,
                    tier: shipres.tier,
                    type: shipres.type,

                    wins: rankstatdata[ship_id.toString()+","+season.toString()].wins,
                    battles: rankstatdata[ship_id.toString()+","+season.toString()].battles,
                    win_rate:rankstatdata[ship_id.toString()+","+season.toString()].win_rate,
                    survival_rate: rankstatdata[ship_id.toString()+","+season.toString()].survival_rate,

                    max_xp: rankstatdata[ship_id.toString()+","+season.toString()].max_xp,
                    max_frags_battle: rankstatdata[ship_id.toString()+","+season.toString()].max_frags_battle,
                    max_damage_dealt: rankstatdata[ship_id.toString()+","+season.toString()].max_damage_dealt,
                    max_planes_killed: rankstatdata[ship_id.toString()+","+season.toString()].max_planes_killed,

                    ave_xp: rankstatdata[ship_id.toString()+","+season.toString()].ave_xp,
                    ave_frags: rankstatdata[ship_id.toString()+","+season.toString()].ave_frags,
                    ave_damage_dealt: rankstatdata[ship_id.toString()+","+season.toString()].ave_damage_dealt,
                    ave_planes_killed: rankstatdata[ship_id.toString()+","+season.toString()].ave_planes_killed,

                    main_battery_max_frags_battle: rankstatdata[ship_id.toString()+","+season.toString()].main_battery_max_frags_battle,
                    main_battery_frags: rankstatdata[ship_id.toString()+","+season.toString()].main_battery_frags,
                    main_battery_hit_rate: rankstatdata[ship_id.toString()+","+season.toString()].main_battery_hit_rate,

                    torpedoes_max_frags_battle: rankstatdata[ship_id.toString()+","+season.toString()].torpedoes_max_frags_battl,
                    torpedoes_frags: rankstatdata[ship_id.toString()+","+season.toString()].torpedoes_frags,
                    torpedoes_hit_rate: rankstatdata[ship_id.toString()+","+season.toString()].torpedoes_hit_rate,

                    second_battery_max_frags_battle: rankstatdata[ship_id.toString()+","+season.toString()].second_battery_max_frags_battle,
                    second_battery_frags: rankstatdata[ship_id.toString()+","+season.toString()].second_battery_frags,
                    second_battery_hit_rate: rankstatdata[ship_id.toString()+","+season.toString()].second_battery_hit_rate,

                    aircraft_max_frags_battle: rankstatdata[ship_id.toString()+","+season.toString()].aircraft_max_frags_battle,
                    aircraft_frags: rankstatdata[ship_id.toString()+","+season.toString()].aircraft_frags,

                    ramming_max_frags_battle: rankstatdata[ship_id.toString()+","+season.toString()].ramming_max_frags_battle,
                    ramming_frags: rankstatdata[ship_id.toString()+","+season.toString()].ramming_frags,

                    survived_wins: rankstatdata[ship_id.toString()+","+season.toString()].survived_wins,
                  });
                }
              }
            }
          }
          this.setState({playerRankTableData:playerRankTableData,rankshipnames:rankshipnames,seasonOptions:seasonOptions});
        })
        .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
  }

  buildAchievements() {
    var arr = [];
    var achievements = this.state.achievements.battle;
    for (const [name, number] of Object.entries(this.state.achievements.battle)) {
      if(achievementsDict[name]){
        arr.push(
          <Card raised key={name}>
            <Image src={achievementsDict[name].image} size={window.innerWidth>400?window.innerWidth>1080?'medium':'medium':'small'} />
            <Card.Content key="cardcnt"
              style={{
                padding: '0.5em',
              }}
            >
              <Card.Header >{achievementsDict[name].text}</Card.Header>
              <Card.Header >{number}</Card.Header>
            </Card.Content>
          </Card>
        )
      }
    }
    return arr;
  }

  buildRankSummary() {
    var arr = [];
    if(this.state.rankdata){
      for (const [season, data] of Object.entries(this.state.rankdata)) {
        if(this.state.rankdata[season].rank_solo && parseInt(season) < 100){
          arr.push(
            <List.Item
            key={season}
            style={{
              margin:'2.5em',
            }}
            >
              <List.Content>
                <List.Header>{"Season " + season + ": "}</List.Header>
                <Statistic color={this.state.rankdata[season].rank_info.rank<=5?'red':this.state.rankdata[season].rank_info.rank<=10?'green':this.state.rankdata[season].rank_info.rank<=15?'blue':'grey'}>
                  <Statistic.Value>{this.state.rankdata[season].rank_info.rank}</Statistic.Value>
                  <Statistic.Label>Rank: </Statistic.Label>
                </Statistic>
              </List.Content>
            </List.Item>
          )
        }
      }
    }
    return arr;
  }

  buildSprintRankSummary() {
    var arr = [];
    if(this.state.rankdata){
      for (const [season, data] of Object.entries(this.state.rankdata)) {
        if(this.state.rankdata[season].rank_solo && parseInt(season) >= 100){
          arr.push(
            <List.Item
            style={{
              margin:'2.5em',
            }}
            key = {season}
            >
              <List.Content>
                <List.Header>{"Sprint " + (parseInt(season)-100).toString() + ": "}</List.Header>
                <Statistic color={this.state.rankdata[season].rank_info.rank<=1?'red':this.state.rankdata[season].rank_info.rank<=3?'green':this.state.rankdata[season].rank_info.rank<=5?'blue':'grey'}>
                  <Statistic.Value>{this.state.rankdata[season].rank_info.rank}</Statistic.Value>
                  <Statistic.Label>Rank: </Statistic.Label>
                </Statistic>
              </List.Content>
            </List.Item>
          )
        }
      }
    }
    return arr;
  }

  render() {
    return (
      <Container fluid>
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
          <Header as='h2'
            style={{
              fontSize: window.innerWidth>860?'1.7em':'1.2em',
              fontWeight: 'normal',
              marginTop: window.innerWidth>860?'0.5em':'0.25em',
            }}
            >
            <NavLink to={{pathname: '/clan',state: {clan_id: this.state.clandata.clan_id}}}>{this.state.clansummary}</NavLink>
          </Header>
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
            <Statistic.Value>{(division(this.state.data.statistics.pvp.wins,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses)*100).toFixed(0) + "%"}</Statistic.Value>
            <Statistic.Label>Win Rate</Statistic.Label>
          </Statistic>
          </div>
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
            <Statistic.Value>{division(this.state.data.statistics.pvp.frags,this.state.data.statistics.pvp.battles-this.state.data.statistics.pvp.survived_battles)}</Statistic.Value>
            <Statistic.Label>K/D</Statistic.Label>
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
          {this.buildSprintRankSummary()}
        </div>

        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4'>
            <Icon name='anchor' />
            Ship Category Summary
          </Header>
        </Divider>
        <Container
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent : 'center',
          alignItems: 'space-evenly',
          marginTop: '2.5em',
        }}
        >
          <PlayerShipTypeGraph data={this.state.playerShipTableData}/>
          <PlayerShipNationGraph data={this.state.playerShipTableData}/>
          <PlayerShipTierGraph data={this.state.playerShipTableData}/>
        </Container>

        <Container
        style={{
          margin: 'auto',
          display:window.innerWidth>=1080?'block':'none',
        }}
        >
        <Tab menu={{ secondary: true, pointing: true }} panes={
          [
            { menuItem: 'Type', render: () =>
            <Tab.Pane attached={false}>
              <Container fluid textAlign='center'>
                <Header size='small' style={{margin:'0'}}>Ship Stats By Type</Header>
                <PlayerShipTypeTable data={this.state.playerShipTableData}/>
              </Container>
            </Tab.Pane> },
            { menuItem: 'Tier', render: () =>
            <Tab.Pane attached={false}>
              <Container fluid textAlign='center'>
                <Header size='small' style={{margin:'0'}}>Ship Stats By Tier</Header>
                <PlayerShipTierTable data={this.state.playerShipTableData}/>
              </Container>
            </Tab.Pane> },
            { menuItem: 'Nation', render: () =>
            <Tab.Pane attached={false}>
              <Container fluid textAlign='center'>
                <Header size='small' style={{margin:'0'}}>Ship Stats By Nation</Header>
                <PlayerShipNationTable data={this.state.playerShipTableData}/>
              </Container>
            </Tab.Pane> },
          ]} />
        </Container>

        <Container
        style={{
          margin: 'auto',
          display:window.innerWidth>=1080?'none':'block',
        }}
        >
          <Container fluid textAlign='center' style={{marginBottom:"3em"}}>
            <Header size='small' style={{margin:'0'}}>Ship Stats By Type</Header>
            <PlayerShipTypeTableMobile data={this.state.playerShipTableData}/>
          </Container>

          <Container fluid textAlign='center' style={{marginBottom:"3em"}}>
            <Header size='small' style={{margin:'0'}}>Ship Stats By Tier</Header>
            <PlayerShipTierTableMobile data={this.state.playerShipTableData}/>
          </Container>

          <Container fluid textAlign='center' style={{marginBottom:"3em"}}>
            <Header size='small' style={{margin:'0'}}>Ship Stats By Nation</Header>
            <PlayerShipNationTableMobile data={this.state.playerShipTableData}/>
          </Container>
        </Container>

        <Divider horizontal
        style={{
            marginTop: '5em',
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
                <PlayerShipTable account_id = {this.state.account_id} data={this.state.playerShipTableData} shipnames={this.state.shipnames}/>
              </Container>
            </Tab.Pane> },
            { menuItem: 'Rank', render: () =>
            <Tab.Pane attached={false}>
              <Container fluid textAlign='center'>
                <PlayerRankTable account_id = {this.state.account_id} data={this.state.playerRankTableData} rankshipnames={this.state.rankshipnames} seasonOptions={this.state.seasonOptions}/>
              </Container>
            </Tab.Pane> },
          ]} />
        </div>

        <div
        style={{
          display:this.state.playerTableVisible?'none':'block',
        }}
        >
        <Container fluid textAlign='center'>
          <PlayerShipTableMobile account_id = {this.state.account_id} data={this.state.playerShipTableData} shipnames={this.state.shipnames}/>
        </Container>
        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4'>
            <Icon name='bar chart' />
            Rank Performance
          </Header>
        </Divider>
        <Container fluid textAlign='center'>
          <PlayerRankTableMobile account_id = {this.state.account_id} data={this.state.playerRankTableData} rankshipnames={this.state.rankshipnames} seasonOptions={this.state.seasonOptions}/>
        </Container>
        </div>

      </Container>
    );
  }
}
/*
<Button secondary onClick={() => this.setState({ playerTableVisible: this.state.playerTableVisible?false:true })}>

</Button>*/
