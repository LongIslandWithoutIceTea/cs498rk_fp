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

export default class PlayerShipTypeTable extends Component {
  constructor(props){
    super(props);
    this.state = {
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
    if(this.props.data){
      this.build(this.props.data);
    }
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

    this.setState({data:data});
  }
  render() {
    return (
      <Table celled structured striped unstackable className="PlayerShipTypeTable">
        <Table.Header className="PlayerShipTypeTableHeader">
          <Table.Row>
          <Table.HeaderCell rowSpan='2'>Type</Table.HeaderCell>
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
        <Table.Body className="PlayerShipTypeTableBody">
          <Table.Row key={"Destroyer"}>
            <Table.Cell>Destroyer</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.wins}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.battles}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.win_rate}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.survival_rate}</Table.Cell>

            <Table.Cell>{this.state.data.destroyer.max_xp}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.max_frags_battle}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.max_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.max_planes_killed}</Table.Cell>

            <Table.Cell>{this.state.data.destroyer.ave_xp}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.ave_frags}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.ave_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.destroyer.ave_planes_killed}</Table.Cell>
          </Table.Row>
          <Table.Row key={"Cruiser"}>
            <Table.Cell>Cruiser</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.wins}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.battles}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.win_rate}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.survival_rate}</Table.Cell>

            <Table.Cell>{this.state.data.cruiser.max_xp}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.max_frags_battle}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.max_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.max_planes_killed}</Table.Cell>

            <Table.Cell>{this.state.data.cruiser.ave_xp}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.ave_frags}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.ave_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.cruiser.ave_planes_killed}</Table.Cell>
          </Table.Row>
          <Table.Row key={"Battleship"}>
            <Table.Cell>Battleship</Table.Cell>
            <Table.Cell>{this.state.data.battleship.wins}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.battles}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.win_rate}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.survival_rate}</Table.Cell>

            <Table.Cell>{this.state.data.battleship.max_xp}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.max_frags_battle}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.max_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.max_planes_killed}</Table.Cell>

            <Table.Cell>{this.state.data.battleship.ave_xp}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.ave_frags}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.ave_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.battleship.ave_planes_killed}</Table.Cell>
          </Table.Row>
          <Table.Row key={"Carrier"}>
            <Table.Cell>Aircraft Carrier</Table.Cell>
            <Table.Cell>{this.state.data.carrier.wins}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.battles}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.win_rate}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.survival_rate}</Table.Cell>

            <Table.Cell>{this.state.data.carrier.max_xp}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.max_frags_battle}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.max_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.max_planes_killed}</Table.Cell>

            <Table.Cell>{this.state.data.carrier.ave_xp}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.ave_frags}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.ave_damage_dealt}</Table.Cell>
            <Table.Cell>{this.state.data.carrier.ave_planes_killed}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
