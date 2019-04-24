import React, { Component } from 'react';
import { Icon, Label, Menu, Table, Segment, Statistic, Header } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {RadialChart, Hint} from 'react-vis';

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

export default class PlayerShipTierGraph extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: false,
      data:[
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        {
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
        ],
    }
    this.build = this.build.bind(this);
  }
  componentWillReceiveProps() {
    this.build(this.props.data);
  }
  build(input){
    var data = [
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
      {
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
    ];
    if(input){
      input.forEach((row)=>{
        var tier = parseInt(row.tier);
        data[tier-1].max_damage_dealt = row.max_damage_dealt > data[tier-1].max_damage_dealt?row.max_damage_dealt:data[tier-1].max_damage_dealt;
        data[tier-1].max_frags_battle  = row.max_frags_battle > data[tier-1].max_frags_battle?row.max_frags_battle:data[tier-1].max_frags_battle ;
        data[tier-1].max_xp  = row.max_xp > data[tier-1].max_xp?row.max_xp:data[tier-1].max_xp ;
        data[tier-1].ave_xp = divisionWhole((row.ave_xp + data[tier-1].ave_xp * data[tier-1].count),(data[tier-1].count+1))
        data[tier-1].ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data[tier-1].ave_damage_dealt * data[tier-1].count),(data[tier-1].count+1))
        data[tier-1].ave_frags = division((row.ave_frags + data[tier-1].ave_frags * data[tier-1].count),(data[tier-1].count+1))
        data[tier-1].battles += row.battles
        data[tier-1].wins += row.wins
        data[tier-1].win_rate = division(data[tier-1].wins,data[tier-1].battles);
        data[tier-1].survival_rate = division((row.survival_rate + data[tier-1].survival_rate * data[tier-1].count),(data[tier-1].count+1))
        data[tier-1].count ++;
      })
    }
    this.setState({data:data});
  }
  render() {
    var values = [
      {Battles:this.state.data[0].battles, label:"I"},
      {Battles:this.state.data[1].battles, label:"II"},
      {Battles:this.state.data[2].battles, label:"III"},
      {Battles:this.state.data[3].battles, label:"IV"},
      {Battles:this.state.data[4].battles, label:"V"},
      {Battles:this.state.data[5].battles, label:"VI"},
      {Battles:this.state.data[6].battles, label:"VII"},
      {Battles:this.state.data[7].battles, label:"VIII"},
      {Battles:this.state.data[8].battles, label:"IX"},
      {Battles:this.state.data[9].battles, label:"X"},

    ];
    return (
      <div>
      <Header size='small' style={{margin:'0'}}>Ship Stats By Tier</Header>
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
