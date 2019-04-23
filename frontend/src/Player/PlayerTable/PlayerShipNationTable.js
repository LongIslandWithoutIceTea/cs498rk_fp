import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

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

const nationDict={
  'usa':{image: 'http://wiki.gcdn.co/images/f/f2/Wows_flag_USA.png', text: 'USA'},
  'ussr':{image: 'http://wiki.gcdn.co/images/0/04/Wows_flag_Russian_Empire_and_USSR.png',text: 'USSR'},
  'uk':{image: 'http://wiki.gcdn.co/images/3/34/Wows_flag_UK.png',text: 'UK'},
  'japan':{image: 'http://wiki.gcdn.co/images/5/5b/Wows_flag_Japan.png',text: 'Japan'},
  'france':{image: 'http://wiki.gcdn.co/images/7/71/Wows_flag_France.png', text: 'France'},
  'germany':{image: 'http://wiki.gcdn.co/images/6/6b/Wows_flag_Germany.png',text: 'Germany'},
  'poland':{image: 'http://wiki.gcdn.co/images/5/5f/Wows_flag_Poland.png', text: 'Poland'},
  'pan_asia':{image: 'http://wiki.gcdn.co/images/3/33/Wows_flag_Pan_Asia.png', text: 'Pan Asia'},
  'italy':{image: 'http://wiki.gcdn.co/images/d/d1/Wows_flag_Italy.png', text: 'Italy'},
  'commonwealth':{image: 'http://wiki.gcdn.co/images/3/3e/Wows_flag_Commonwealth.PNG', text: 'Common Wealth'},
  'pan_america':{image: 'http://wiki.gcdn.co/images/9/9e/Wows_flag_Pan_America.png', text: 'Pan America'}
}

export default class PlayerShipNationTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: false,
      data: {
        usa:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        ussr:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        uk:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        japan:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        france:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        germany:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        poland:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        pan_asia:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        italy:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        commonwealth:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        },
        pan_america:{
          wins:0,
          battles:0,
          win_rate:0,
          survival_rate: 0,
          max_xp:0,
          max_frags_battle:0,
          max_damage_dealt:0,
          max_planes_killed:0,
          ave_xp:0,
          ave_frags:0,
          ave_damage_dealt:0,
          ave_planes_killed:0,
          count: 0,
        }
      }
    }
    this.buildrows = this.buildrows.bind(this);
  }
  buildrows(){
    if(!this.props.data){return <Table.Row/>;}
    var data = {
      usa:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      ussr:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      uk:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      japan:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      france:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      germany:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      poland:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      pan_asia:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      italy:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      commonwealth:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      pan_america:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle:0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      }
    }
    this.props.data.forEach((row)=>{
      if(row.nation === "usa"){
        data.usa.max_damage_dealt = row.max_damage_dealt > data.usa.max_damage_dealt?row.max_damage_dealt:data.usa.max_damage_dealt;
        data.usa.max_frags_battle  = row.max_frags_battle > data.usa.max_frags_battle?row.max_frags_battle:data.usa.max_frags_battle ;
        data.usa.max_xp  = row.max_xp > data.usa.max_xp?row.max_xp:data.usa.max_xp ;
        data.usa.max_planes_killed  = row.max_planes_killed > data.usa.max_planes_killed?row.max_planes_killed:data.usa.max_planes_killed ;
        data.usa.ave_xp = divisionWhole((row.ave_xp + data.usa.ave_xp * data.usa.count),(data.usa.count+1))
        data.usa.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.usa.ave_damage_dealt * data.usa.count),(data.usa.count+1))
        data.usa.ave_frags = division((row.ave_frags + data.usa.ave_frags * data.usa.count),(data.usa.count+1))
        data.usa.ave_planes_killed = division((row.ave_planes_killed + data.usa.ave_planes_killed * data.usa.count),(data.usa.count+1))
        data.usa.battles += row.battles
        data.usa.wins += row.wins
        data.usa.win_rate = division(data.usa.wins,data.usa.battles);
        data.usa.survival_rate = division((row.survival_rate + data.usa.survival_rate * data.usa.count),(data.usa.count+1))
        data.usa.count ++;
      }else if(row.nation === "ussr"){
        data.ussr.max_damage_dealt = row.max_damage_dealt > data.ussr.max_damage_dealt?row.max_damage_dealt:data.ussr.max_damage_dealt;
        data.ussr.max_frags_battle  = row.max_frags_battle > data.ussr.max_frags_battle?row.max_frags_battle:data.ussr.max_frags_battle ;
        data.ussr.max_xp  = row.max_xp > data.ussr.max_xp?row.max_xp:data.ussr.max_xp ;
        data.ussr.ave_xp = divisionWhole((row.ave_xp + data.ussr.ave_xp * data.ussr.count),(data.ussr.count+1))
        data.ussr.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.ussr.ave_damage_dealt * data.ussr.count),(data.ussr.count+1))
        data.ussr.ave_frags = division((row.ave_frags + data.ussr.ave_frags * data.ussr.count),(data.ussr.count+1))
        data.ussr.battles += row.battles
        data.ussr.wins += row.wins
        data.ussr.win_rate = division(data.ussr.wins,data.ussr.battles);
        data.ussr.survival_rate = division((row.survival_rate + data.ussr.survival_rate * data.ussr.count),(data.ussr.count+1))
        data.ussr.max_planes_killed  = row.max_planes_killed > data.ussr.max_planes_killed?row.max_planes_killed:data.ussr.max_planes_killed ;
        data.ussr.ave_planes_killed = division((row.ave_planes_killed + data.ussr.ave_planes_killed * data.ussr.count),(data.ussr.count+1))
        data.ussr.count ++;
      }else if(row.nation === "uk"){
        data.uk.max_damage_dealt = row.max_damage_dealt > data.uk.max_damage_dealt?row.max_damage_dealt:data.uk.max_damage_dealt;
        data.uk.max_frags_battle  = row.max_frags_battle > data.uk.max_frags_battle?row.max_frags_battle:data.uk.max_frags_battle ;
        data.uk.max_xp  = row.max_xp > data.uk.max_xp?row.max_xp:data.uk.max_xp ;
        data.uk.ave_xp = divisionWhole((row.ave_xp + data.uk.ave_xp * data.uk.count),(data.uk.count+1))
        data.uk.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.uk.ave_damage_dealt * data.uk.count),(data.uk.count+1))
        data.uk.ave_frags = division((row.ave_frags + data.uk.ave_frags * data.uk.count),(data.uk.count+1))
        data.uk.battles += row.battles
        data.uk.wins += row.wins
        data.uk.win_rate = division(data.uk.wins,data.uk.battles);
        data.uk.survival_rate = division((row.survival_rate + data.uk.survival_rate * data.uk.count),(data.uk.count+1))
        data.uk.max_planes_killed  = row.max_planes_killed > data.uk.max_planes_killed?row.max_planes_killed:data.uk.max_planes_killed ;
        data.uk.ave_planes_killed = division((row.ave_planes_killed + data.uk.ave_planes_killed * data.uk.count),(data.uk.count+1))
        data.uk.count ++;
      }else if(row.nation === "japan"){
        data.japan.max_damage_dealt = row.max_damage_dealt > data.japan.max_damage_dealt?row.max_damage_dealt:data.japan.max_damage_dealt;
        data.japan.max_frags_battle  = row.max_frags_battle > data.japan.max_frags_battle?row.max_frags_battle:data.japan.max_frags_battle ;
        data.japan.max_xp  = row.max_xp > data.japan.max_xp?row.max_xp:data.japan.max_xp ;
        data.japan.ave_xp = divisionWhole((row.ave_xp + data.japan.ave_xp * data.japan.count),(data.japan.count+1))
        data.japan.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.japan.ave_damage_dealt * data.japan.count),(data.japan.count+1))
        data.japan.ave_frags = division((row.ave_frags + data.japan.ave_frags * data.japan.count),(data.japan.count+1))
        data.japan.battles += row.battles
        data.japan.wins += row.wins
        data.japan.win_rate = division(data.japan.wins,data.japan.battles);
        data.japan.survival_rate = division((row.survival_rate + data.japan.survival_rate * data.japan.count),(data.japan.count+1))
        data.japan.max_planes_killed  = row.max_planes_killed > data.japan.max_planes_killed?row.max_planes_killed:data.japan.max_planes_killed ;
        data.japan.ave_planes_killed = division((row.ave_planes_killed + data.japan.ave_planes_killed * data.japan.count),(data.japan.count+1))
        data.japan.count ++;
      }else if(row.nation === "france"){
        data.france.max_damage_dealt = row.max_damage_dealt > data.france.max_damage_dealt?row.max_damage_dealt:data.france.max_damage_dealt;
        data.france.max_frags_battle  = row.max_frags_battle > data.france.max_frags_battle?row.max_frags_battle:data.france.max_frags_battle ;
        data.france.max_xp  = row.max_xp > data.france.max_xp?row.max_xp:data.france.max_xp ;
        data.france.ave_xp = divisionWhole((row.ave_xp + data.france.ave_xp * data.france.count),(data.france.count+1))
        data.france.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.france.ave_damage_dealt * data.france.count),(data.france.count+1))
        data.france.ave_frags = division((row.ave_frags + data.france.ave_frags * data.france.count),(data.france.count+1))
        data.france.battles += row.battles
        data.france.wins += row.wins
        data.france.win_rate = division(data.france.wins,data.france.battles);
        data.france.survival_rate = division((row.survival_rate + data.france.survival_rate * data.france.count),(data.france.count+1))
        data.france.max_planes_killed  = row.max_planes_killed > data.france.max_planes_killed?row.max_planes_killed:data.france.max_planes_killed ;
        data.france.ave_planes_killed = division((row.ave_planes_killed + data.france.ave_planes_killed * data.france.count),(data.france.count+1))
        data.france.count ++;
      }else if(row.nation === "germany"){
        data.germany.max_damage_dealt = row.max_damage_dealt > data.germany.max_damage_dealt?row.max_damage_dealt:data.germany.max_damage_dealt;
        data.germany.max_frags_battle  = row.max_frags_battle > data.germany.max_frags_battle?row.max_frags_battle:data.germany.max_frags_battle ;
        data.germany.max_xp  = row.max_xp > data.germany.max_xp?row.max_xp:data.germany.max_xp ;
        data.germany.ave_xp = divisionWhole((row.ave_xp + data.germany.ave_xp * data.germany.count),(data.germany.count+1))
        data.germany.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.germany.ave_damage_dealt * data.germany.count),(data.germany.count+1))
        data.germany.ave_frags = division((row.ave_frags + data.germany.ave_frags * data.germany.count),(data.germany.count+1))
        data.germany.battles += row.battles
        data.germany.wins += row.wins
        data.germany.win_rate = division(data.germany.wins,data.germany.battles);
        data.germany.survival_rate = division((row.survival_rate + data.germany.survival_rate * data.germany.count),(data.germany.count+1))
        data.germany.max_planes_killed  = row.max_planes_killed > data.germany.max_planes_killed?row.max_planes_killed:data.germany.max_planes_killed ;
        data.germany.ave_planes_killed = division((row.ave_planes_killed + data.germany.ave_planes_killed * data.germany.count),(data.germany.count+1))
        data.germany.count ++;
      }else if(row.nation === "poland"){
        data.poland.max_damage_dealt = row.max_damage_dealt > data.poland.max_damage_dealt?row.max_damage_dealt:data.poland.max_damage_dealt;
        data.poland.max_frags_battle  = row.max_frags_battle > data.poland.max_frags_battle?row.max_frags_battle:data.poland.max_frags_battle ;
        data.poland.max_xp  = row.max_xp > data.poland.max_xp?row.max_xp:data.poland.max_xp ;
        data.poland.ave_xp = divisionWhole((row.ave_xp + data.poland.ave_xp * data.poland.count),(data.poland.count+1))
        data.poland.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.poland.ave_damage_dealt * data.poland.count),(data.poland.count+1))
        data.poland.ave_frags = division((row.ave_frags + data.poland.ave_frags * data.poland.count),(data.poland.count+1))
        data.poland.battles += row.battles
        data.poland.wins += row.wins
        data.poland.win_rate = division(data.poland.wins,data.poland.battles);
        data.poland.survival_rate = division((row.survival_rate + data.poland.survival_rate * data.poland.count),(data.poland.count+1))
        data.poland.max_planes_killed  = row.max_planes_killed > data.poland.max_planes_killed?row.max_planes_killed:data.poland.max_planes_killed ;
        data.poland.ave_planes_killed = division((row.ave_planes_killed + data.poland.ave_planes_killed * data.poland.count),(data.poland.count+1))
        data.poland.count ++;
      }else if(row.nation === "italy"){
        data.italy.max_damage_dealt = row.max_damage_dealt > data.italy.max_damage_dealt?row.max_damage_dealt:data.italy.max_damage_dealt;
        data.italy.max_frags_battle  = row.max_frags_battle > data.italy.max_frags_battle?row.max_frags_battle:data.italy.max_frags_battle ;
        data.italy.max_xp  = row.max_xp > data.italy.max_xp?row.max_xp:data.italy.max_xp ;
        data.italy.ave_xp = divisionWhole((row.ave_xp + data.italy.ave_xp * data.italy.count),(data.italy.count+1))
        data.italy.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.italy.ave_damage_dealt * data.italy.count),(data.italy.count+1))
        data.italy.ave_frags = division((row.ave_frags + data.italy.ave_frags * data.italy.count),(data.italy.count+1))
        data.italy.battles += row.battles
        data.italy.wins += row.wins
        data.italy.win_rate = division(data.italy.wins,data.italy.battles);
        data.italy.survival_rate = division((row.survival_rate + data.italy.survival_rate * data.italy.count),(data.italy.count+1))
        data.italy.max_planes_killed  = row.max_planes_killed > data.italy.max_planes_killed?row.max_planes_killed:data.italy.max_planes_killed ;
        data.italy.ave_planes_killed = division((row.ave_planes_killed + data.italy.ave_planes_killed * data.italy.count),(data.italy.count+1))
        data.italy.count ++;
      }else if(row.nation === "pan_asia"){
        data.pan_asia.max_damage_dealt = row.max_damage_dealt > data.pan_asia.max_damage_dealt?row.max_damage_dealt:data.pan_asia.max_damage_dealt;
        data.pan_asia.max_frags_battle  = row.max_frags_battle > data.pan_asia.max_frags_battle?row.max_frags_battle:data.pan_asia.max_frags_battle ;
        data.pan_asia.max_xp  = row.max_xp > data.pan_asia.max_xp?row.max_xp:data.pan_asia.max_xp ;
        data.pan_asia.ave_xp = divisionWhole((row.ave_xp + data.pan_asia.ave_xp * data.pan_asia.count),(data.pan_asia.count+1))
        data.pan_asia.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.pan_asia.ave_damage_dealt * data.pan_asia.count),(data.pan_asia.count+1))
        data.pan_asia.ave_frags = division((row.ave_frags + data.pan_asia.ave_frags * data.pan_asia.count),(data.pan_asia.count+1))
        data.pan_asia.battles += row.battles
        data.pan_asia.wins += row.wins
        data.pan_asia.win_rate = division(data.pan_asia.wins,data.pan_asia.battles);
        data.pan_asia.survival_rate = division((row.survival_rate + data.pan_asia.survival_rate * data.pan_asia.count),(data.pan_asia.count+1))
        data.pan_asia.max_planes_killed  = row.max_planes_killed > data.pan_asia.max_planes_killed?row.max_planes_killed:data.pan_asia.max_planes_killed ;
        data.pan_asia.ave_planes_killed = division((row.ave_planes_killed + data.pan_asia.ave_planes_killed * data.pan_asia.count),(data.pan_asia.count+1))
        data.pan_asia.count ++;
      }else if(row.nation === "commonwealth"){
        data.commonwealth.max_damage_dealt = row.max_damage_dealt > data.commonwealth.max_damage_dealt?row.max_damage_dealt:data.commonwealth.max_damage_dealt;
        data.commonwealth.max_frags_battle  = row.max_frags_battle > data.commonwealth.max_frags_battle?row.max_frags_battle:data.commonwealth.max_frags_battle ;
        data.commonwealth.max_xp  = row.max_xp > data.commonwealth.max_xp?row.max_xp:data.commonwealth.max_xp ;
        data.commonwealth.ave_xp = divisionWhole((row.ave_xp + data.commonwealth.ave_xp * data.commonwealth.count),(data.commonwealth.count+1))
        data.commonwealth.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.commonwealth.ave_damage_dealt * data.commonwealth.count),(data.commonwealth.count+1))
        data.commonwealth.ave_frags = division((row.ave_frags + data.commonwealth.ave_frags * data.commonwealth.count),(data.commonwealth.count+1))
        data.commonwealth.battles += row.battles
        data.commonwealth.wins += row.wins
        data.commonwealth.win_rate = division(data.commonwealth.wins,data.commonwealth.battles);
        data.commonwealth.survival_rate = division((row.survival_rate + data.commonwealth.survival_rate * data.commonwealth.count),(data.commonwealth.count+1))
        data.commonwealth.max_planes_killed  = row.max_planes_killed > data.commonwealth.max_planes_killed?row.max_planes_killed:data.commonwealth.max_planes_killed ;
        data.commonwealth.ave_planes_killed = division((row.ave_planes_killed + data.commonwealth.ave_planes_killed * data.commonwealth.count),(data.commonwealth.count+1))
        data.commonwealth.count ++;
      }else if(row.nation === "pan_america"){
        data.pan_america.max_damage_dealt = row.max_damage_dealt > data.pan_america.max_damage_dealt?row.max_damage_dealt:data.pan_america.max_damage_dealt;
        data.pan_america.max_frags_battle  = row.max_frags_battle > data.pan_america.max_frags_battle?row.max_frags_battle:data.pan_america.max_frags_battle ;
        data.pan_america.max_xp  = row.max_xp > data.pan_america.max_xp?row.max_xp:data.pan_america.max_xp ;
        data.pan_america.ave_xp = divisionWhole((row.ave_xp + data.pan_america.ave_xp * data.pan_america.count),(data.pan_america.count+1))
        data.pan_america.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.pan_america.ave_damage_dealt * data.pan_america.count),(data.pan_america.count+1))
        data.pan_america.ave_frags = division((row.ave_frags + data.pan_america.ave_frags * data.pan_america.count),(data.pan_america.count+1))
        data.pan_america.battles += row.battles
        data.pan_america.wins += row.wins
        data.pan_america.win_rate = division(data.pan_america.wins,data.pan_america.battles);
        data.pan_america.survival_rate = division((row.survival_rate + data.pan_america.survival_rate * data.pan_america.count),(data.pan_america.count+1))
        data.pan_america.max_planes_killed  = row.max_planes_killed > data.pan_america.max_planes_killed?row.max_planes_killed:data.pan_america.max_planes_killed ;
        data.pan_america.ave_planes_killed = division((row.ave_planes_killed + data.pan_america.ave_planes_killed * data.pan_america.count),(data.pan_america.count+1))
        data.pan_america.count ++;
      }
    })
    var arr = [];
    for (const [nation, dat] of Object.entries(nationDict)) {
      arr.push(
        <Table.Row key={nation}>
          <Table.Cell>{dat.text}</Table.Cell>
          <Table.Cell>{data[nation].wins}</Table.Cell>
          <Table.Cell>{data[nation].battles}</Table.Cell>
          <Table.Cell>{data[nation].win_rate}</Table.Cell>
          <Table.Cell>{data[nation].survival_rate}</Table.Cell>

          <Table.Cell>{data[nation].max_xp}</Table.Cell>
          <Table.Cell>{data[nation].max_frags_battle}</Table.Cell>
          <Table.Cell>{data[nation].max_damage_dealt}</Table.Cell>
          <Table.Cell>{data[nation].max_planes_killed}</Table.Cell>

          <Table.Cell>{data[nation].ave_xp}</Table.Cell>
          <Table.Cell>{data[nation].ave_frags}</Table.Cell>
          <Table.Cell>{data[nation].ave_damage_dealt}</Table.Cell>
          <Table.Cell>{data[nation].ave_planes_killed}</Table.Cell>
        </Table.Row>
      )
    }
    return arr;
  }
  render() {
    return (
      <Table celled structured striped unstackable className="PlayerShipTypeTable">
        <Table.Header className="PlayerShipTypeTableHeader">
          <Table.Row  key="header1">
          <Table.HeaderCell rowSpan='2'>Nation</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Wins</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Battles</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Win Rate</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Survival Rate</Table.HeaderCell>
          <Table.HeaderCell colSpan='4'>Max</Table.HeaderCell>
          <Table.HeaderCell colSpan='4'>Average</Table.HeaderCell>
          </Table.Row>
          <Table.Row  key="header2">
            <Table.HeaderCell >XP</Table.HeaderCell>
            <Table.HeaderCell >Kills</Table.HeaderCell>
            <Table.HeaderCell >Damage</Table.HeaderCell>
            <Table.HeaderCell >Plane Kills</Table.HeaderCell>

            <Table.HeaderCell >XP</Table.HeaderCell>
            <Table.HeaderCell >Kills</Table.HeaderCell>
            <Table.HeaderCell >Damage</Table.HeaderCell>
            <Table.HeaderCell >Plane Kills</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="PlayerShipTypeTableBody">
          {this.buildrows()}
        </Table.Body>
      </Table>
    );
  }
}
