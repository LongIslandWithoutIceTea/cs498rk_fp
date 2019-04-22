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
function romanize(num) {
  var lookup = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
  for ( i in lookup ) {
    while ( num >= lookup[i] ) {
      roman += i;
      num -= lookup[i];
    }
  }
  return roman;
}
export default class PlayerShipTierTable extends Component {
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
    this.buildrows = this.buildrows.bind(this);
  }
  componentWillReceiveProps() {
    if(this.props.data){
      this.build(this.props.data);
    }
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
    this.setState({data:data});
  }
  buildrows(){
    var arr = [];
    for(var tier=0; tier<10; tier++){
      arr.push(
      <Table.Row key={tier+1}>
        <Table.Cell>{romanize(tier+1)}</Table.Cell>
        <Table.Cell>{this.state.data[tier].wins}</Table.Cell>
        <Table.Cell>{this.state.data[tier].battles}</Table.Cell>
        <Table.Cell>{this.state.data[tier].win_rate}</Table.Cell>
        <Table.Cell>{this.state.data[tier].survival_rate}</Table.Cell>

        <Table.Cell>{this.state.data[tier].max_xp}</Table.Cell>
        <Table.Cell>{this.state.data[tier].max_frags_battle}</Table.Cell>
        <Table.Cell>{this.state.data[tier].max_damage_dealt}</Table.Cell>
        <Table.Cell>{this.state.data[tier].max_planes_killed}</Table.Cell>

        <Table.Cell>{this.state.data[tier].ave_xp}</Table.Cell>
        <Table.Cell>{this.state.data[tier].ave_frags}</Table.Cell>
        <Table.Cell>{this.state.data[tier].ave_damage_dealt}</Table.Cell>
        <Table.Cell>{this.state.data[tier].ave_planes_killed}</Table.Cell>
      </Table.Row>
      )
    }
    return arr;
  }
  render() {
    return (
      <Table celled structured striped unstackable>
        <Table.Header>
          <Table.Row>
          <Table.HeaderCell rowSpan='2'>Tier</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Wins</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Battles</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Win Rate</Table.HeaderCell>
          <Table.HeaderCell rowSpan='2'>Survival Rate</Table.HeaderCell>
          <Table.HeaderCell colSpan='4'>Max</Table.HeaderCell>
          <Table.HeaderCell colSpan='4'>Average</Table.HeaderCell>
          </Table.Row>
          <Table.Row>
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
        <Table.Body>
          {this.buildrows()}
        </Table.Body>
      </Table>
    );
  }
}
