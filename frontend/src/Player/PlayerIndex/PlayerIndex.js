import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import PlayerShipTable from '../PlayerTable/PlayerShipTable.js'

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

export default class PlayerIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {"last_battle_time":1555816434,"account_id":1019218342,"leveling_tier":15,"created_at":1457320991,"leveling_points":12806,"updated_at":1555877501,"private":null,"hidden_profile":false,"logout_at":1555877490,"karma":null,"statistics":{"distance":496492,"battles":12716,"pvp":{"max_xp":6511,"damage_to_buildings":619131,"main_battery":{"max_frags_battle":8,"frags":9655,"hits":763954,"max_frags_ship_id":3765384944,"shots":2056909},"max_ships_spotted_ship_id":3751786288,"max_damage_scouting":334282,"art_agro":4000000001,"max_xp_ship_id":3760109008,"ships_spotted":14066,"second_battery":{"max_frags_battle":3,"frags":364,"hits":98556,"max_frags_ship_id":3751753712,"shots":488873},"max_frags_ship_id":4184815568,"xp":20988609,"survived_battles":5087,"dropped_capture_points":0,"max_damage_dealt_to_buildings":213600,"torpedo_agro":848533559,"draws":4,"control_captured_points":99320,"battles_since_510":9057,"max_total_agro_ship_id":4276041424,"planes_killed":48366,"battles":11055,"max_ships_spotted":12,"max_suppressions_ship_id":4276041424,"survived_wins":4322,"frags":14915,"damage_scouting":257570466,"max_total_agro":4793200,"max_frags_battle":8,"capture_points":0,"ramming":{"max_frags_battle":1,"frags":117,"max_frags_ship_id":3760109008},"suppressions_count":3,"max_suppressions_count":1,"torpedoes":{"max_frags_battle":4,"frags":1359,"hits":6254,"max_frags_ship_id":4282267344,"shots":82849},"max_planes_killed_ship_id":4288591856,"aircraft":{"max_frags_battle":7,"frags":1551,"max_frags_ship_id":3763320816},"team_capture_points":1112945,"control_dropped_points":64546,"max_damage_dealt":342198,"max_damage_dealt_to_buildings_ship_id":4282333168,"max_damage_dealt_ship_id":4276041424,"wins":6872,"losses":4179,"damage_dealt":892778787,"max_planes_killed":83,"max_scouting_damage_ship_id":4279219920,"team_dropped_capture_points":542979,"battles_since_512":8542}},"nickname":"Quincy_0v0","stats_updated_at":1555877501},
      clandata: {"1000043952":{"members_count":46,"name":"Hiryu Ride Face","creator_name":"Aikun96","clan_id":1000043952,"created_at":1484747968,"updated_at":1555210651,"leader_name":"ChipsChan","members_ids":[1003333910,1004477726,1007175219,1008316697,1008625506,1009061145,1009661450,1010209482,1010323946,1010724543,1011528019,1013304000,1013334385,1013587959,1013999547,1015329727,1015357346,1015493067,1015610394,1018349928,1018526149,1021128077,1021760124,1021825753,1022169623,1023567781,1023915822,1023925788,1024488643,1024492045,1025308785,1025493071,1025871171,1026265082,1026478590,1026558717,1027538149,1027962043,1028085712,1029202697,1029258263,1029652630,1030351561,1030590838,1031351287,1033795111],"creator_id":1016393566,"tag":"KUMA","old_name":null,"is_clan_disbanded":false,"renamed_at":null,"old_tag":null,"leader_id":1013587959,"description":"If u know Kancolle, Warships Girls R, Azur Lane, Ars Nova(Blue Steel), High School Fleet than u can join us.\nPs: Girls und Panzer is a good anime! Watch it!"}},
      achievements:{"battle":{"FOOLSDAY_TROOPER":9,"COLLECTION_HAPPY_BIRTHDAY2018_COMPLETED":1,"ONE_SOLDIER_IN_THE_FIELD":5,"CAMPAIGN_VIVELAFRANCE_COMPLETED_EXCELLENT":1,"CLAN_SEASON_1_LEAGUE_3":3,"SEA_LEGEND":1,"CLAN_SEASON_1_LEAGUE_1":2,"CLAN_SEASON_1_LEAGUE_4":3,"COLLECTION_BRITISHARC_COMPLETED":1,"SCIENCE_OF_WINNING_TACTICIAN":1,"FOOLSDAY_ONE_STEP":1,"DOUBLE_KILL":122,"COLLECTION_DUNKIRK_COMPLETED":1,"BD2016_MANNERS":1,"MAIN_CALIBER":960,"COLLECTION_HSF2018_COMPLETED":1,"COLLECTION_AMERICANARC_COMPLETED":1,"BD2016_RUN_FOREST":1,"NY17_AIMING":1,"EV1APR19_ALLROUNDER":1,"CAMPAIGN_NEWYEAR2019PEF_COMPLETED":1,"FOOLSDAY_POEKHALI":1,"RASPUTIN":1,"COLLECTION_HAPPYNEWYEAR2019_COMPLETED":1,"LIQUIDATOR":34,"CLAN_SEASON_1_LEAGUE_2":3,"WITHERING":174,"BD2016_FIRESHOW":1,"FIREPROOF":116,"BD2_CONTAINERS":57,"BD2_FR":6,"CAMPAIGN_NEWYEAR2019STEELQUEST_COMPLETED_EXCELLENT":1,"EV1APR19_ATTDEF2":1,"AVACOMMON":1,"SUPPORT":976,"CAMPAIGN_VIVELAFRANCE_COMPLETED":1,"MERCENARY":1,"MESSENGER":1,"PVE_HON_PR_SAVE_1":1,"SCIENCE_OF_WINNING_ARSONIST":1,"BD2016_PARTY_CHECK_IN":1,"NY17_DRESS_THE_TREE":1,"WORKAHOLIC_L":1,"HEADBUTT":10,"BD2_CAMPAIGNS":1,"BD2_CREW":159,"ATBA_CALIBER":383,"MERCENARY_L":1,"EV1APR19_EPICENTER1":6,"AIRKING":24,"BD2_ARP":2,"NO_PRICE_FOR_HEROISM":1,"FILLALBUM_BRIT_CVARC_COMPLETED":1,"NEVER_ENOUGH_MONEY":1,"BD2016_FESTIV_SOUP":1,"ARSONIST":160,"WARRIOR":230,"WORKAHOLIC":1,"PVE_HON_PR_DONE_ALL_1":1,"DETONATED":81,"CHIEF_ENGINEER":1,"PVE_HON_FRAG_CLASS":11,"EV1APR19_DOMINATION2":3,"NO_DAY_WITHOUT_ADVENTURE_L":1,"EV1APR19_DOMINATION1":1,"CAMPAIGN_NEWYEAR2019STEELQUEST_COMPLETED":1,"NEWYEAR_LEADERBOARD":1,"SCIENCE_OF_WINNING_LUCKY":1,"CAMPAIGN_SB_COMPLETED":1,"BD2_RANKS":21,"COLLECTION_OVECHKIN_COMPLETED":1,"COLLECTION_HAPPYNEWYEAR2018_COMPLETED":1,"INSTANT_KILL":1594,"UNSINKABLE":8,"ENGINEER":1,"CAMPAIGN_HALSEY_COMPLETED":1,"CAMPAIGN_NEWYEAR2018BASIC_COMPLETED":1,"NY17_SAFECRACKER":1,"JUNIOR_PLANNER":1,"BD2_CAMO":15,"COLLECTION_VIVELAFRANCE_COMPLETED":1,"BD2016_RISE_OF_THE_MACHINES":1,"BD2016_SNATCH":1,"NO_DAY_WITHOUT_ADVENTURE":1,"CAMPAIGN_NEWYEAR2018ELITE_COMPLETED":1,"PVE_HERO_WIN_SUR":2,"COLLECTION_YAMAMOTO_COMPLETED":1,"DREADNOUGHT":509,"CLEAR_SKY":37,"HALLOWEEN_2017":1,"HALLOWEEN_2016":1,"HALLOWEEN_2018":1,"CAMPAIGN_BISMARCK_COMPLETED":1,"PVE_HON_PR_SAVE_2":1,"PVE_HERO_DAM_ENEM":11,"FOOLSDAY_SHIELDS":1,"FIGHTER":1,"NY17_500_LEAGUES":1,"MILLIONAIR":1,"CAMPAIGN_YAMAMOTO_COMPLETED":1,"EV1APR19_TORPEDO1":3,"BD2016_KING_OF_PARTY":1,"EV1APR19_TORPEDO3":4,"PVE_HON_PR_DONE_1":1,"EV1APR19_TORPEDO5":2,"MESSENGER_L":1,"BATTLE_HERO":1,"BD2016_WRONG_SOW":1,"PVE_HON_WIN_ALL_DONE":15,"CAMPAIGN1_COMPLETED":1,"BD2_GE":4,"BD2_GB":14,"BD2_CREDITS":44,"SCIENCE_OF_WINNING_HARD_EDGED":1,"VETERAN":1,"RETRIBUTION":335,"CAMPAIGN_NY17B_COMPLETED":1,"TWITCH_WG":1,"BD2016_PARTY_ANIMAL":1,"SCIENCE_OF_WINNING_TO_THE_BOTTOM":1,"GREATEEIGHT":18,"COLLECTION_BISMARCK_COMPLETED":1,"NY17_BREAK_THE_BANK":1,"ALL_THREE_HALLOWEEN_COMPLETE":1,"CAPITAL":1,"SCIENCE_OF_WINNING_BOMBARDIER":1,"PVE_DUNKERQUE_OPERATION_DYNAMO":1,"FIRST_BLOOD":1031,"COLLECTION_WOWSBIRTHDAY_COMPLETED":1,"AIRDEFENSEEXPERT":9,"NY17_WIN_AT_LEAST_ONE":1,"CAMPAIGN_NY17B_COMPLETED_EXCELLENT":1,"AMAUTEUR":1,"ATB_HEPHAESTUS":1},"progress":{"FIGHTER":0,"MILLIONAIR":0,"MERCENARY":0,"PVE_HON_PR_DONE_1":0,"PVE_HON_PR_SAVE_1":0,"ENGINEER":0,"BATTLE_HERO":0,"WORKAHOLIC_L":0,"PVE_HON_PR_SAVE_2":0,"JUNIOR_PLANNER":0,"MESSENGER_L":0,"VETERAN":0,"MERCENARY_L":0,"EV1APR19_ALLROUNDER":0,"NO_DAY_WITHOUT_ADVENTURE":0,"NEVER_ENOUGH_MONEY":0,"NO_PRICE_FOR_HEROISM":0,"ALL_THREE_HALLOWEEN_COMPLETE":0,"CAPITAL":0,"SCIENCE_OF_WINNING_BOMBARDIER":0,"WORKAHOLIC":0,"PVE_HON_PR_DONE_ALL_1":0,"SEA_LEGEND":0,"CHIEF_ENGINEER":0,"NO_DAY_WITHOUT_ADVENTURE_L":0,"MESSENGER":0,"AMAUTEUR":0}},
      clansummary: "",
    }
    this.build = this.build.bind(this);
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
  }

  build() {
    var arr = [];
    var achievements = this.state.achievements.battle;
    for (const [name, number] of Object.entries(this.state.achievements.battle)) {
      if(achievementsDict[name]){
        arr.push(
          <Card raised>
            <Image src={achievementsDict[name].image} size='medium'/>
            <Card.Content>
              <Card.Header>{achievementsDict[name].text}</Card.Header>
              <Card.Content description={number} />
            </Card.Content>
          </Card>
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
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '2em',
            }}
          />
          <Header as='h1' content={this.state.data.nickname}
            style={{
              fontSize: '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: '0.5em',
            }}
          />
          <Header as='h2' content={this.state.clansummary}
            style={{
              fontSize: '1.7em',
              fontWeight: 'normal',
              marginTop: '0.5em',
            }}
          />
        </Container>

        <Statistic.Group widths='four'
          style={{
            marginTop: '7em',
          }}
        >
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.battles.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Battles</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.max_xp.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Max XP</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.max_damage_dealt.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Max Damage</Statistic.Label>
          </Statistic>
          <Statistic>
            <Statistic.Value>{this.state.data.statistics.pvp.max_frags_battle.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Max Kills</Statistic.Label>
          </Statistic>
        </Statistic.Group>

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
          }}
        >
          <Statistic horizontal size="small" style={{marginLeft: '5em'}}>
            <Statistic.Value>{division(this.state.data.statistics.pvp.xp,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
            <Statistic.Label>Average XP</Statistic.Label>
          </Statistic>
          <Statistic horizontal size="small" style={{marginLeft: '5em'}}>
            <Statistic.Value>{division(this.state.data.statistics.pvp.damage_dealt,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
            <Statistic.Label>Average Damage</Statistic.Label>
          </Statistic>
          <Statistic horizontal size="small" style={{marginLeft: '5em'}}>
            <Statistic.Value>{division(this.state.data.statistics.pvp.frags,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
            <Statistic.Label>Average Kills</Statistic.Label>
          </Statistic>
          <Statistic horizontal size="small" style={{marginLeft: '5em'}}>
            <Statistic.Value>{division(this.state.data.statistics.pvp.survived_battles,this.state.data.statistics.pvp.wins+this.state.data.statistics.pvp.draws+this.state.data.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
            <Statistic.Label>Survival Rate</Statistic.Label>
          </Statistic>
          <Statistic horizontal size="small" style={{marginLeft: '5em'}}>
            <Statistic.Value>{division(this.state.data.statistics.pvp.main_battery.hits,this.state.data.statistics.pvp.main_battery.shots) * 100 + "%"}</Statistic.Value>
            <Statistic.Label>Main Battery Hit Rate</Statistic.Label>
          </Statistic>
        </div>

        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4'>
            <Icon name='trophy' />
            Achievements
          </Header>
        </Divider>

        <Container textAlign='center'>
          <Card.Group itemsPerRow={9} centered>
            {this.build()}
          </Card.Group>
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
        <Container fluid textAlign='center'>
          <PlayerShipTable account_id = {this.props.account_id}/>
        </Container>
      </Segment>
    );
  }
}
