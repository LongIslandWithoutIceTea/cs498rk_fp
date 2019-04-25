import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Container } from 'semantic-ui-react';
import {Link, NavLink} from "react-router-dom";
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import PlayerWeaponTable from './PlayerWeaponTable.js';
import {division, divisionWhole, time, application_id} from '../../Common/utlity.js';

const perpage = 10;
const nationOptions=[
  {key: 'all', value: 'all', text: ''},
  {key: 'usa', value: 'usa', image: 'http://wiki.gcdn.co/images/f/f2/Wows_flag_USA.png', text: 'USA'},
  {key: 'ussr', value: 'ussr', image: 'http://wiki.gcdn.co/images/0/04/Wows_flag_Russian_Empire_and_USSR.png',text: 'USSR'},
  {key: 'uk', value: 'uk', image: 'http://wiki.gcdn.co/images/3/34/Wows_flag_UK.png',text: 'UK'},
  {key: 'japan', value: 'japan', image: 'http://wiki.gcdn.co/images/5/5b/Wows_flag_Japan.png',text: 'Japan'},
  {key: 'france', value: 'france', image: 'http://wiki.gcdn.co/images/7/71/Wows_flag_France.png', text: 'France'},
  {key: 'germany', value: 'germany', image: 'http://wiki.gcdn.co/images/6/6b/Wows_flag_Germany.png',text: 'Germany'},
  {key: 'poland', value: 'poland', image: 'http://wiki.gcdn.co/images/5/5f/Wows_flag_Poland.png', text: 'Poland'},
  {key: 'pan_asia', value: 'pan_asia', image: 'http://wiki.gcdn.co/images/3/33/Wows_flag_Pan_Asia.png', text: 'Pan Asia'},
  {key: 'italy', value: 'italy', image: 'http://wiki.gcdn.co/images/d/d1/Wows_flag_Italy.png', text: 'Italy'},
  {key: 'commonwealth', value: 'commonwealth', image: 'http://wiki.gcdn.co/images/3/3e/Wows_flag_Commonwealth.PNG', text: 'Com. Wealth'},
  {key: 'pan_america', value: 'pan_america', image: 'http://wiki.gcdn.co/images/9/9e/Wows_flag_Pan_America.png', text: 'Pan America'}
];
const nationDict={
  'usa':{image: 'http://wiki.gcdn.co/images/f/f2/Wows_flag_USA.png', text: 'USA'},
  'ussr':{image: 'http://wiki.gcdn.co/images/0/04/Wows_flag_Russian_Empire_and_USSR.png',text: 'USSR'},
  'uk':{image: 'http://wiki.gcdn.co/images/3/34/Wows_flag_UK.png',text: 'UK'},
  'japan':{image: 'http://wiki.gcdn.co/images/5/5b/Wows_flag_Japan.png',text: 'Japan'},
  'france':{image: 'http://wiki.gcdn.co/images/7/71/Wows_flag_France.png', text: 'France'},
  'germany':{image: 'http://wiki.gcdn.co/images/6/6b/Wows_flag_Germany.png',text: 'Germany'},
  'poland':{value: 'poland', image: 'http://wiki.gcdn.co/images/5/5f/Wows_flag_Poland.png', text: 'Poland'},
  'pan_asia':{ value: 'pan_asia', image: 'http://wiki.gcdn.co/images/3/33/Wows_flag_Pan_Asia.png', text: 'Pan Asia'},
  'italy':{ value: 'italy', image: 'http://wiki.gcdn.co/images/d/d1/Wows_flag_Italy.png', text: 'Italy'},
  'commonwealth':{image: 'http://wiki.gcdn.co/images/3/3e/Wows_flag_Commonwealth.PNG', text: 'Common Wealth'},
  'pan_america':{image: 'http://wiki.gcdn.co/images/9/9e/Wows_flag_Pan_America.png', text: 'Pan America'}
}
const typeOptions=[
  {key: 'all', value: 'all', text: ''},
  {key: 'Destroyer', value: 'Destroyer', image: 'http://wiki.gcdn.co/images/d/d2/Wows-destroyer-icon.png', text: 'Destroyer'},
  {key: 'Cruiser', value: 'Cruiser', image: 'http://wiki.gcdn.co/images/f/f5/Wows-cruiser-icon.png', text: 'Cruiser'},
  {key: 'Battleship', value: 'Battleship', image: 'http://wiki.gcdn.co/images/2/24/Wows-battleship-icon.png', text: 'Battleship'},
  {key: 'AirCarrier', value: 'AirCarrier', image: 'http://wiki.gcdn.co/images/d/d8/Wows-aircarrier-icon.png', text: 'Carrier'}
];
const typeDict={
   'Destroyer':{image: 'http://wiki.gcdn.co/images/d/d2/Wows-destroyer-icon.png', text: 'Destroyer'},
   'Cruiser':{image: 'http://wiki.gcdn.co/images/f/f5/Wows-cruiser-icon.png', text: 'Cruiser'},
   'Battleship':{image: 'http://wiki.gcdn.co/images/2/24/Wows-battleship-icon.png', text: 'Battleship'},
   'AirCarrier':{image: 'http://wiki.gcdn.co/images/d/d8/Wows-aircarrier-icon.png', text: 'Carrier'}
}
const tierOptions=[
  {key: 'all', value: 'all', text: ''},
  {key: '1', value: '1', text: 'I'},
  {key: '2', value: '2', text: 'II'},
  {key: '3', value: '3', text: 'III'},
  {key: '4', value: '4', text: 'IV'},
  {key: '5', value: '5', text: 'V'},
  {key: '6', value: '6', text: 'VI'},
  {key: '7', value: '7', text: 'VII'},
  {key: '8', value: '8', text: 'VIII'},
  {key: '9', value: '9', text: 'IX'},
  {key: '10', value: '10', text: 'X'},
];
const tierDict={
  '1': 'I',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
  '6': 'VI',
  '7': 'VII',
  '8':'VIII',
  '9': 'IX',
  '10': 'X',
}

class PlayerShipTableMobileBody extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
    this.build = this.build.bind(this);
  }

  build(data,page,selectedName,selectedNation,selectedType,selectedTier){
    var rows = [];
    if(data){
      for (var i = page * perpage; i < data.length; i++){
        var row = data[i];
        if (i < page * perpage + perpage){
          rows.push(
              (
              <Table.Row key={row.ship_id} id={"PlayerShipTableMobile"+row.ship_id.toString()} onClick={(e)=>{this.props.handleselectedShipID(e.currentTarget.id)}}>
                <Table.Cell selectable><NavLink style={{color:"cornflowerblue"}} to={{pathname: '/ship',state: {ship_id: row.ship_id}}}>{row.name}</NavLink></Table.Cell>
                <Table.Cell >{row.win_rate}</Table.Cell>
                <Table.Cell >{row.ave_damage_dealt}</Table.Cell>
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
      <Table.Body className="PlayerShipTableMobileBody">
        {this.build(this.props.data,this.props.page,this.props.selectedName,this.props.selectedNation,this.props.selectedType,this.props.selectedTier)}
      </Table.Body>
    )
  }
}

export default class PlayerShipTableMobile extends Component {
  constructor(props){
    super(props);
    this.state = {
      column: null,
      data: null,
      shipData: null,
      selectedData:null,
      direction: null,
      page: 0,
      selectedName: "all",
      selectedNation: "all",
      selectedType: "all",
      selectedTier: "all",
      selectedShipData: null,
      ship_ids: [],
      shipnames: [{key: 'all', value: 'all', text: ''}],
      showModal: false,
    }
    this.handleSort = this.handleSort.bind(this);
    this.build = this.build.bind(this);
    this.setPage = this.setPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.handleFilterRaw = this.handleFilterRaw.bind(this);
    this.selected = this.selected.bind(this);
    this.handleselectedShipID = this.handleselectedShipID.bind(this);
  }
  componentDidMount() {
    this.setState({data:this.props.data,shipnames:this.props.shipnames});
    this.handleFilterRaw(this.props.data,null,"all","all","all");
  }
  componentWillReceiveProps(){
    this.setState({data:this.props.data,shipnames:this.props.shipnames});
    this.handleFilterRaw(this.props.data,null,"all","all","all");
  }

  handleSort(clickedColumn){
    var selectedData = [];
    this.props.data.forEach((row)=>{
      if(this.selected(row,this.state.selectedName,this.state.selectedNation,this.state.selectedType,this.state.selectedTier)){
        selectedData.push(row);
      }
    })
    if (this.state.column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        selectedData: _.sortBy(selectedData, [clickedColumn]),
        direction: 'ascending',
        page: 0,
      })
    }else{
      if(this.state.direction === 'ascending'){
        this.setState({
          selectedData: _.sortBy(selectedData, [clickedColumn]).reverse(),
          direction: 'descending',
          page: 0,
        })
      }else{
        this.setState({
          selectedData: _.sortBy(selectedData, [clickedColumn]),
          direction: 'ascending',
          page: 0,
        })
      }
    }
  }

  handleFilterRaw(data,selectedName,selectedNation,selectedType,selectedTier){
    if(data){
      this.setState({selectedData:data, page: 0});
    }else{
      this.setState({selectedData:[], page: 0});
    }
  }

  handleFilter(selectedName,selectedNation,selectedType,selectedTier){
    if(this.props.data){
      var selectedData = [];
      this.props.data.forEach((row)=>{
        if(this.selected(row,selectedName,selectedNation,selectedType,selectedTier)){
          selectedData.push(row);
        }
      })
      this.setState({selectedData:selectedData, page: 0});
    }
  }

  handleselectedShipID(selectedShipID){
    var selectedShipID = parseInt(selectedShipID.substring(15,selectedShipID.length))
    var selectedShipData = {};
    if(this.state.selectedData){
      this.state.selectedData.forEach((row)=>{
        if(row.ship_id === selectedShipID){
            selectedShipData.ship_id = row.ship_id;
            selectedShipData.main_battery_max_frags_battle = row.main_battery_max_frags_battle;
            selectedShipData.main_battery_frags = row.main_battery_frags;
            selectedShipData.main_battery_hit_rate = row.main_battery_hit_rate;

            selectedShipData.torpedoes_max_frags_battle = row.torpedoes_max_frags_battle;
            selectedShipData.torpedoes_frags = row.torpedoes_frags;
            selectedShipData.torpedoes_hit_rate = row.torpedoes_hit_rate;

            selectedShipData.second_battery_max_frags_battle = row.second_battery_max_frags_battle;
            selectedShipData.second_battery_frags = row.second_battery_frags;
            selectedShipData.second_battery_hit_rate = row.second_battery_hit_rate;

            selectedShipData.aircraft_max_frags_battle = row.aircraft_max_frags_battle;
            selectedShipData.aircraft_frags = row.aircraft_frags;

            selectedShipData.ramming_max_frags_battle = row.ramming_max_frags_battle;
            selectedShipData.ramming_frags = row.ramming_frags;

            this.setState({showModal:true, selectedShipData:selectedShipData});
            return;
        }
      })
    }
  }

  selected(row,selectedName,selectedNation,selectedType,selectedTier){
    if(selectedName && selectedName !== "all" && selectedName !== ""){
      if(row.name !== selectedName){
        return false;
      }
    }else{
      if(selectedName && selectedNation !== "all" && selectedName !== ""){
        if(row.nation !== selectedNation){
          return false;
        }
      }
      if(selectedName && selectedType !== "all" && selectedName !== ""){
        if(row.type !== selectedType){
          return false;
        }
      }
      if(selectedName && selectedTier !== "all" && selectedName !== ""){
        if(row.tier !== parseInt(selectedTier)){
          return false;
        }
      }
    }
    return true
  }

  setPage(e, { name }){
    this.setState({page:parseInt(name)})
  }

  nextPage(){
    var page = this.state.page;
    if(page < this.state.selectedData.length/perpage - 1){
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
    var totalpage = 2;
    var pages = [];
    if(data){
      if(data.length/perpage > totalpage){
        if(this.state.page < Math.round(totalpage/2)){
          for (var i = 0; i < totalpage ; i++){
            pages.push((
              <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
            ))

          }
        }else if(this.state.page > data.length/perpage - Math.round(totalpage/2)){
          for (var i = Math.round(data.length/perpage)-totalpage; i < data.length/perpage - 1 ; i++){
            pages.push((
              <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
            ))
          }
        }else{
          for (var i = this.state.page; i < this.state.page+2; i++){
            pages.push((
              <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
            ))
          }
        }
      }else{
        for (var i = 0; i < data.length/perpage ; i++){
          pages.push((
            <Menu.Item as='a' key={i.toString()} name={i.toString()} active={this.state.page===i} onClick={this.setPage}>{i + 1}</Menu.Item>
          ))
        }
      }
    }
    return pages;
  }

  render() {
    if(!this.props.data){
      return (<div/>)
    }
    return (
      <div>
        <Table sortable selectable celled structured striped unstackable className="PlayerShipTableMobile">
            <Table.Header className="PlayerShipTableMobileHeader">
              <Table.Row key="header1">
                <Table.HeaderCell >Ship</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'win_rate' ? this.state.direction : null} onClick={() => this.handleSort('win_rate')} rowSpan='2'>Win Rate</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'ave_damage_dealt' ? this.state.direction : null} onClick={() => this.handleSort('ave_damage_dealt')}>Ave Dmg</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <PlayerShipTableMobileBody data={this.state.selectedData} page={this.state.page} handleselectedShipID={this.handleselectedShipID}/>

            <Table.Footer className="PlayerShipTableMobileFooter">
              <Table.Row  key="header3">
                <Table.HeaderCell colSpan='20'>
                  <Menu floated='right' pagination>
                    <Menu.Item  key="menu1" as='a' icon onClick={()=>this.setState({page:0})}>
                      <Icon name='angle double left' />
                    </Menu.Item>
                    <Menu.Item key="menu2" as='a' icon onClick={this.prevPage}>
                      <Icon name='angle left' />
                    </Menu.Item>
                    {this.build(this.state.selectedData)}
                    <Menu.Item key="menu3" as='a' icon onClick={this.nextPage}>
                      <Icon name='angle right' />
                    </Menu.Item>
                    <Menu.Item key="menu4" as='a' icon onClick={()=>this.setState({page:Math.ceil(this.state.selectedData.length/perpage-1)})}>
                      <Icon name='angle double right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
        </Table>
      </div>
    );
  }
}
