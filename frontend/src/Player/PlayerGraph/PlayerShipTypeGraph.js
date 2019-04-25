import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Segment, Statistic, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {RadialChart, Hint} from 'react-vis';
import {division, divisionWhole, time, application_id} from '../../Common/utlity.js';

export default class PlayerShipTypeGraph extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: false,
      data: {
        destroyer:{
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
        cruiser:{
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
        battleship:{
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
        carrier:{
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
    this.build = this.build.bind(this);
  }
  componentWillReceiveProps() {
    this.build(this.props.data);
  }
  build(input){
    var data = {
      destroyer:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle :0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      cruiser:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle :0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags :0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      battleship:{
        wins:0,
        battles:0,
        win_rate:0,
        survival_rate: 0,
        max_xp:0,
        max_frags_battle :0,
        max_damage_dealt:0,
        max_planes_killed:0,
        ave_xp:0,
        ave_frags:0,
        ave_damage_dealt:0,
        ave_planes_killed:0,
        count: 0,
      },
      carrier:{
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
    if(input){
      input.forEach((row)=>{
        if(row.type === "Destroyer"){
          data.destroyer.max_damage_dealt = row.max_damage_dealt > data.destroyer.max_damage_dealt?row.max_damage_dealt:data.destroyer.max_damage_dealt;
          data.destroyer.max_frags_battle  = row.max_frags_battle > data.destroyer.max_frags_battle?row.max_frags_battle:data.destroyer.max_frags_battle ;
          data.destroyer.max_xp  = row.max_xp > data.destroyer.max_xp?row.max_xp:data.destroyer.max_xp ;
          data.destroyer.ave_xp = divisionWhole((row.ave_xp + data.destroyer.ave_xp * data.destroyer.count),(data.destroyer.count+1))
          data.destroyer.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.destroyer.ave_damage_dealt * data.destroyer.count),(data.destroyer.count+1))
          data.destroyer.ave_frags = division((row.ave_frags + data.destroyer.ave_frags * data.destroyer.count),(data.destroyer.count+1))
          data.destroyer.battles += row.battles
          data.destroyer.wins += row.wins
          data.destroyer.win_rate = division(data.destroyer.wins,data.destroyer.battles);
          data.destroyer.survival_rate = division((row.survival_rate + data.destroyer.survival_rate * data.destroyer.count),(data.destroyer.count+1))
          data.destroyer.count ++;
        }else if(row.type === "Cruiser"){
          data.cruiser.max_damage_dealt = row.max_damage_dealt > data.cruiser.max_damage_dealt?row.max_damage_dealt:data.cruiser.max_damage_dealt;
          data.cruiser.max_frags_battle  = row.max_frags_battle > data.cruiser.max_frags_battle?row.max_frags_battle:data.cruiser.max_frags_battle ;
          data.cruiser.max_xp  = row.max_xp > data.cruiser.max_xp?row.max_xp:data.cruiser.max_xp ;
          data.cruiser.ave_xp = divisionWhole((row.ave_xp + data.cruiser.ave_xp * data.cruiser.count),(data.cruiser.count+1))
          data.cruiser.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.cruiser.ave_damage_dealt * data.cruiser.count),(data.cruiser.count+1))
          data.cruiser.ave_frags = division((row.ave_frags + data.cruiser.ave_frags * data.cruiser.count),(data.cruiser.count+1))
          data.cruiser.battles += row.battles
          data.cruiser.wins += row.wins
          data.cruiser.win_rate = division(data.cruiser.wins,data.cruiser.battles);
          data.cruiser.survival_rate = division((row.survival_rate + data.cruiser.survival_rate * data.cruiser.count),(data.cruiser.count+1))
          data.cruiser.count ++;
        }else if(row.type === "Battleship"){
          data.battleship.max_damage_dealt = row.max_damage_dealt > data.battleship.max_damage_dealt?row.max_damage_dealt:data.battleship.max_damage_dealt;
          data.battleship.max_frags_battle  = row.max_frags_battle > data.battleship.max_frags_battle?row.max_frags_battle:data.battleship.max_frags_battle ;
          data.battleship.max_xp  = row.max_xp > data.battleship.max_xp?row.max_xp:data.battleship.max_xp ;
          data.battleship.ave_xp = divisionWhole((row.ave_xp + data.battleship.ave_xp * data.battleship.count),(data.battleship.count+1))
          data.battleship.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.battleship.ave_damage_dealt * data.battleship.count),(data.battleship.count+1))
          data.battleship.ave_frags = division((row.ave_frags + data.battleship.ave_frags * data.battleship.count),(data.battleship.count+1))
          data.battleship.battles += row.battles
          data.battleship.wins += row.wins
          data.battleship.win_rate = division(data.battleship.wins,data.battleship.battles);
          data.battleship.survival_rate = division((row.survival_rate + data.battleship.survival_rate * data.battleship.count),(data.battleship.count+1))
          data.battleship.count ++;
        }else if(row.type === "AirCarrier"){
          data.carrier.max_damage_dealt = row.max_damage_dealt > data.carrier.max_damage_dealt?row.max_damage_dealt:data.carrier.max_damage_dealt;
          data.carrier.max_frags_battle  = row.max_frags_battle > data.carrier.max_frags_battle?row.max_frags_battle:data.carrier.max_frags_battle ;
          data.carrier.max_xp  = row.max_xp > data.carrier.max_xp?row.max_xp:data.carrier.max_xp ;
          data.carrier.ave_xp = divisionWhole((row.ave_xp + data.carrier.ave_xp * data.carrier.count),(data.carrier.count+1))
          data.carrier.ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data.carrier.ave_damage_dealt * data.carrier.count),(data.carrier.count+1))
          data.carrier.ave_frags = division((row.ave_frags + data.carrier.ave_frags * data.carrier.count),(data.carrier.count+1))
          data.carrier.battles += row.battles
          data.carrier.wins += row.wins
          data.carrier.win_rate = division(data.carrier.wins,data.carrier.battles);
          data.carrier.survival_rate = division((row.survival_rate + data.carrier.survival_rate * data.carrier.count),(data.carrier.count+1))
          data.carrier.count ++;
        }
      })
    }
    this.setState({data:data});
  }
  render() {
    var values = [
      {Battles:this.state.data.destroyer.battles, label:"Destroyer"},
      {Battles:this.state.data.cruiser.battles, label:"Cruiser"},
      {Battles:this.state.data.battleship.battles, label:"Battleship"},
      {Battles:this.state.data.carrier.battles, label:"Aircraft Carrier"},
    ];
    return (
      <div>
      <Header size='small' style={{margin:'0'}}>Ship Stats By Type</Header>
      <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css"/>
      <RadialChart
        innerRadius={60}
        radius={100}
        getAngle={d => d.Battles}
        data={values}
        width={300}
        height={300}
        padAngle={0.04}
        onValueMouseOver={v => this.setState({value: v})}
        onSeriesMouseOut={v => this.setState({value: false})}
      >
        {this.state.value !== false &&
          <Hint value={this.state.value}>
          <Segment>
            <Statistic horizontal>
              <Statistic.Value>{this.state.value.Battles.toLocaleString()}</Statistic.Value>
              <Statistic.Label>{this.state.value.label}</Statistic.Label>
            </Statistic>
          </Segment>
          </Hint>}
      </RadialChart>

      </div>
    );
  }
}
