import React, { Component } from 'react';
import {  Icon, Label, Menu, Table } from 'semantic-ui-react'
import _ from 'lodash'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios';
/*
const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";
const account_id = "1019218342";
const perpage = 15;

function division(a,b){
  if (b === 0){
    return 0;
  }else{
    return Math.round(a / b * 100) / 100;
  }
}

class PlayerWeaponTableHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Table.Header className="PlayerWeaponTableHeader">
        <Table.Row>
          <Table.HeaderCell rowSpan='2'>Ship</Table.HeaderCell>
          <Table.HeaderCell colSpan='3'>Main Battery</Table.HeaderCell>
          <Table.HeaderCell colSpan='3'>Torpedos</Table.HeaderCell>
          <Table.HeaderCell colSpan='3'>Secondary Battery</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Aircraft</Table.HeaderCell>
          <Table.HeaderCell colSpan='2'>Ramming</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell sorted={this.props.column === 'main_battery_max_frags_battle' ? this.props.direction : null} onClick={() => this.props.handleSort('main_battery_max_frags_battle')}>Max Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'main_battery_frags' ? this.props.direction : null} onClick={() => this.props.handleSort('main_battery_frags')}>Average Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'main_battery_hit_rate' ? this.props.direction : null} onClick={() => this.props.handleSort('main_battery_hit_rate')}>Hit Rate</Table.HeaderCell>

          <Table.HeaderCell sorted={this.props.column === 'torpedoes_max_frags_battle' ? this.props.direction : null} onClick={() => this.props.handleSort('torpedoes_max_frags_battle')}>Max Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'torpedoes_frags' ? this.props.direction : null} onClick={() => this.props.handleSort('torpedoes_frags')}>Average Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'torpedoes_hit_rate' ? this.props.direction : null} onClick={() => this.props.handleSort('torpedoes_hit_rate')}>Hit Rate</Table.HeaderCell>

          <Table.HeaderCell sorted={this.props.column === 'second_battery_max_frags_battle' ? this.props.direction : null} onClick={() => this.props.handleSort('second_battery_max_frags_battle')}>Max Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'second_battery_frags' ? this.props.direction : null} onClick={() => this.props.handleSort('second_battery_frags')}>Average Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'second_battery_hit_rate' ? this.props.direction : null} onClick={() => this.props.handleSort('second_battery_hit_rate')}>Hit Rate</Table.HeaderCell>

          <Table.HeaderCell sorted={this.props.column === 'aircraft_max_frags_battle' ? this.props.direction : null} onClick={() => this.props.handleSort('aircraft_max_frags_battle')}>Max Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'aircraft_frags' ? this.props.direction : null} onClick={() => this.props.handleSort('aircraft_frags')}>Average Kills</Table.HeaderCell>

          <Table.HeaderCell sorted={this.props.column === 'ramming_max_frags_battle' ? this.props.direction : null} onClick={() => this.props.handleSort('ramming_max_frags_battle')}>Max Kills</Table.HeaderCell>
          <Table.HeaderCell sorted={this.props.column === 'ramming_frags' ? this.props.direction : null} onClick={() => this.props.handleSort('ramming_frags')}>Average Kills</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }
}

class PlayerWeaponTableBody extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.build = this.build.bind(this);
  }
  componentDidMount(){
  }
  build(data, page){
    var rows = [];
    if(data){
      for (var i = page * perpage; i < data.length; i++){
        if (i < page * perpage + perpage){
          var row = data[i];
          rows.push(
              (
                <Table.Row key={row.ship_id}>
                  <Table.Cell>{row.ship_id}</Table.Cell>

                  <Table.Cell>{row.main_battery_max_frags_battle}</Table.Cell>
                  <Table.Cell>{row.main_battery_frags}</Table.Cell>
                  <Table.Cell>{row.main_battery_hit_rate}</Table.Cell>

                  <Table.Cell>{row.torpedoes_max_frags_battle}</Table.Cell>
                  <Table.Cell>{row.torpedoes_frags}</Table.Cell>
                  <Table.Cell>{row.torpedoes_hit_rate}</Table.Cell>

                  <Table.Cell>{row.second_battery_max_frags_battle}</Table.Cell>
                  <Table.Cell>{row.second_battery_frags}</Table.Cell>
                  <Table.Cell>{row.second_battery_hit_rate}</Table.Cell>

                  <Table.Cell>{row.aircraft_max_frags_battle}</Table.Cell>
                  <Table.Cell>{row.aircraft_frags}</Table.Cell>

                  <Table.Cell>{row.ramming_max_frags_battle}</Table.Cell>
                  <Table.Cell>{row.ramming_frags}</Table.Cell>
                </Table.Row>
            )
          )
        }
      }
    }
    return rows;
  }
  render() {
    return (
      <Table.Body className="PlayerWeaponTableBody">
        {this.build(this.props.data,this.props.page)}
      </Table.Body>
    )
  }
}

export default class PlayerWeaponTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      column: null,
      data: null,
      direction: null,
      page: 0,
    }
    this.handleSort = this.handleSort.bind(this);
    this.build = this.build.bind(this);
    this.setPage = this.setPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  componentDidMount() {
    axios.get("https://api.worldofwarships.com/wows/ships/stats/?application_id=" + application_id + "&account_id=" + account_id)
    .then((response)=>{
        var res = response.data.data[account_id];
        var data = [];
        res.forEach((ship) => {
          data.push({
              ship_id: ship.ship_id,

              wins: ship.pvp.wins,
              battles: (ship.pvp.wins+ship.pvp.losses+ship.pvp.draws),
              win_rate: division(ship.pvp.wins,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              survival_rate: division(ship.pvp.survived_battles,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),

              max_xp: ship.pvp.max_xp,
              max_frags_battle: ship.pvp.max_frags_battle,
              max_damage_dealt: ship.pvp.max_damage_dealt,
              max_planes_killed: ship.pvp.max_planes_killed,

              ave_xp: division(ship.pvp.xp,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              ave_frags: division(ship.pvp.frags,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
              ave_damage_dealt: division(ship.pvp.damage_dealt,(ship.pvp.wins+ship.pvp.losses+ship.pvp.draws)),
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
          })
        })
        this.setState({data:data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSort(clickedColumn){
    if (this.state.column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(this.state.data, [clickedColumn]),
        direction: 'ascending',
      })
    }else{
      this.setState({
        data: this.state.data.reverse(),
        direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
      })
    }
  }

  setPage(e, { name }){
    this.setState({page:parseInt(name)})
  }

  nextPage(){
    var page = this.state.page;
    if(page < this.state.data.length/perpage){
      this.setState({
        page: page + 1,
      })
    }
  }

  prevPage(){
    var page = this.state.page;
    if(page > 0){
      this.setState({
        page: page - 1,
      })
    }
  }

  build(data){
    var totalpage = 5;
    var pages = [];
    if(data){
      if(data.length/perpage > totalpage){
        if(this.state.page < Math.round(totalpage/2)){
          for (var i = 0; i < totalpage ; i++){
            pages.push((
              <Menu.Item as='a' name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
            ))

          }
        }else if(this.state.page > data.length/perpage - Math.round(totalpage/2)){
          for (var i = data.length/perpage-totalpage; i < data.length/perpage ; i++){
            pages.push((
              <Menu.Item as='a' name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
            ))
          }
        }else{
          for (var i = 0; i < data.length/perpage ; i++){
            if(Math.abs(i - this.state.page) < Math.round(totalpage/2)){
              pages.push((
                <Menu.Item as='a' name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
              ))
            }
          }
        }
      }else{
        for (var i = 0; i < data.length/perpage ; i++){
          pages.push((
            <Menu.Item as='a' name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
          ))
        }
      }
    }
    return pages;
  }

  render() {
    return (
      <Table sortable celled structured selectable striped collapsing unstackable className="PlayerWeaponTable">
          <PlayerWeaponTableHeader column={this.state.column} direction={this.state.direction} handleSort={this.handleSort}/>
          <PlayerWeaponTableBody data={this.state.data} page={this.state.page}/>
          <Table.Footer className="PlayerShipTableFooter">
            <Table.Row>
              <Table.HeaderCell colSpan='14'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon onClick={()=>this.setState({page:0})}>
                    <Icon name='angle double left' />
                  </Menu.Item>
                  <Menu.Item as='a' icon onClick={this.prevPage}>
                    <Icon name='angle left' />
                  </Menu.Item>
                  {this.build(this.state.data)}
                  <Menu.Item as='a' icon onClick={this.nextPage}>
                    <Icon name='angle right' />
                  </Menu.Item>
                  <Menu.Item as='a' icon onClick={()=>this.setState({page:this.state.data.length/perpage-1})}>
                    <Icon name='angle double right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
      </Table>
    );
  }
}
*/
