import React, { Component } from 'react';
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {division, divisionWhole, time, application_id, romanize} from '../../Common/utlity.js';

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
    this.buildrows = this.buildrows.bind(this);
  }
  buildrows(){
    if(!this.props.data){return <Table.Row/>;}
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
    this.props.data.forEach((row)=>{
      var tier = parseInt(row.tier);
      data[tier-1].max_damage_dealt = row.max_damage_dealt > data[tier-1].max_damage_dealt?row.max_damage_dealt:data[tier-1].max_damage_dealt;
      data[tier-1].max_frags_battle  = row.max_frags_battle > data[tier-1].max_frags_battle?row.max_frags_battle:data[tier-1].max_frags_battle ;
      data[tier-1].max_xp  = row.max_xp > data[tier-1].max_xp?row.max_xp:data[tier-1].max_xp ;
      data[tier-1].max_planes_killed  = row.max_planes_killed > data[tier-1].max_planes_killed?row.max_planes_killed:data[tier-1].max_planes_killed ;
      data[tier-1].ave_xp = divisionWhole((row.ave_xp + data[tier-1].ave_xp * data[tier-1].count),(data[tier-1].count+1))
      data[tier-1].ave_damage_dealt = divisionWhole((row.ave_damage_dealt + data[tier-1].ave_damage_dealt * data[tier-1].count),(data[tier-1].count+1))
      data[tier-1].ave_frags = division((row.ave_frags + data[tier-1].ave_frags * data[tier-1].count),(data[tier-1].count+1))
      data[tier-1].ave_planes_killed = division((row.ave_planes_killed + data[tier-1].ave_planes_killed * data[tier-1].count),(data[tier-1].count+1))
      data[tier-1].battles += row.battles
      data[tier-1].wins += row.wins
      data[tier-1].win_rate = division(data[tier-1].wins,data[tier-1].battles);
      data[tier-1].survival_rate = division((row.survival_rate + data[tier-1].survival_rate * data[tier-1].count),(data[tier-1].count+1))
      data[tier-1].count ++;
    })
    var arr = [];
    for(var tier=0; tier<10; tier++){
      arr.push(
      <Table.Row key={tier+1}>
        <Table.Cell>{romanize(tier+1)}</Table.Cell>
        <Table.Cell>{data[tier].win_rate}</Table.Cell>
        <Table.Cell>{data[tier].ave_damage_dealt}</Table.Cell>
      </Table.Row>
      )
    }
    return arr;
  }
  render() {
    return (
      <Table celled structured striped unstackable>
        <Table.Header>
          <Table.Row  key="header1">
            <Table.HeaderCell >Tier</Table.HeaderCell>
            <Table.HeaderCell >Win Rate</Table.HeaderCell>
            <Table.HeaderCell >Ave Dmg</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.buildrows()}
        </Table.Body>
      </Table>
    );
  }
}
