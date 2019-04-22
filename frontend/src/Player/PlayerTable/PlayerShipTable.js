import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Container } from 'semantic-ui-react';
import _ from 'lodash';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import PlayerWeaponTable from './PlayerWeaponTable.js';

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";
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
function division(a,b){
  if (b === 0){
    return 0;
  }else{
    return Math.round(a / b * 100) / 100;
  }
}

class PlayerShipTableBody extends Component {
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
              <Table.Row key={row.ship_id}>
                <Table.Cell selectable><a>{row.name}</a></Table.Cell>
                <Table.Cell ><img src={row.image} alt="404" height="35"/></Table.Cell>
                <Table.Cell ><img src={nationDict[row.nation].image} alt="404" height="25"/></Table.Cell>
                <Table.Cell >{nationDict[row.nation].text}</Table.Cell>
                <Table.Cell ><img src={typeDict[row.type].image} alt="404" height="25"/></Table.Cell>
                <Table.Cell >{typeDict[row.type].text}</Table.Cell>
                <Table.Cell >{tierDict[row.tier]}</Table.Cell>
                <Table.Cell >{row.wins}</Table.Cell>
                <Table.Cell >{row.battles}</Table.Cell>
                <Table.Cell >{row.win_rate}</Table.Cell>
                <Table.Cell >{row.survival_rate}</Table.Cell>

                <Table.Cell >{row.max_xp}</Table.Cell>
                <Table.Cell >{row.max_frags_battle}</Table.Cell>
                <Table.Cell >{row.max_damage_dealt}</Table.Cell>
                <Table.Cell >{row.max_planes_killed}</Table.Cell>

                <Table.Cell >{row.ave_xp}</Table.Cell>
                <Table.Cell >{row.ave_frags}</Table.Cell>
                <Table.Cell >{row.ave_damage_dealt}</Table.Cell>
                <Table.Cell >{row.ave_planes_killed}</Table.Cell>

                <Table.Cell collapsing selectable onClick={()=>this.props.handleselectedShipID(row.ship_id)}><Icon name="ellipsis horizontal"/></Table.Cell>
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
      <Table.Body className="PlayerShipTableBody">
        {this.build(this.props.data,this.props.page,this.props.selectedName,this.props.selectedNation,this.props.selectedType,this.props.selectedTier)}
      </Table.Body>
    )
  }
}

export default class PlayerShipTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      column: null,
      data: null,
      shipData: null,
      selectedData:null,
      direction: null,
      doneLoading:false,
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
    this.selected = this.selected.bind(this);
    this.handleselectedShipID = this.handleselectedShipID.bind(this);
  }
  componentDidMount() {
    var data = [];
    var statdata = {};
    var ship_ids = [];
    var shipnames = [];
    this.setState({data:null,doneLoading:false});
    axios.get("https://api.worldofwarships.com/wows/ships/stats/?application_id=" + application_id + "&account_id=" + this.props.account_id)
    .then((response)=>{
        var res = response.data.data[this.props.account_id];
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
          }
        })
    })
    .then(()=>{
      var slice = 24;
      for(var i = 0; i < ship_ids.length/slice; i++){
        var l = []
        var ship_id_strings = "";
        if (i * slice + slice < ship_ids.length){
          var limit = i * slice + slice;
        }else{
          var limit = ship_ids.length;
          this.setState({doneLoading:true});
        }
        for(var j = i * slice; j < limit; j++){
          ship_id_strings += ship_ids[j] + ",";
        }
        axios.get("https://api.worldofwarships.com/wows/encyclopedia/ships/?application_id=" + application_id + "&ship_id=" + ship_id_strings.substring(0,ship_ids.length-1))
        .then((shipresponse)=>{
          for (const [ship_id, shipres] of Object.entries(shipresponse.data.data)) {
            if(shipres && statdata[ship_id.toString()]){
              shipnames.push({key: shipres.name, value: shipres.name, text: shipres.name});
              data.push({
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
              this.setState({data:data,shipnames:shipnames});
              this.handleFilter(null,"all","all","all");
            }
          }
        })
        .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
  }

  handleSort(clickedColumn){
    var selectedData = [];
    this.state.data.forEach((row)=>{
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

  handleFilter(selectedName,selectedNation,selectedType,selectedTier){
     var selectedData = [];
     this.state.data.forEach((row)=>{
       if(this.selected(row,selectedName,selectedNation,selectedType,selectedTier)){
         selectedData.push(row);
       }
     })
     this.setState({selectedData:selectedData, page: 0});
  }

  handleselectedShipID(selectedShipID){
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
          for (var i = Math.round(data.length/perpage)-totalpage; i < data.length/perpage ; i++){
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
      <div>
        <Dimmer active={!this.state.doneLoading}>
          <Loader>Loading</Loader>
        </Dimmer>

        <Table sortable celled structured striped unstackable className="PlayerShipTable">
            <Table.Header className="PlayerShipTableHeader">
              <Table.Row>
                <Table.HeaderCell colSpan='2'>Ship</Table.HeaderCell>
                <Table.HeaderCell colSpan='2' sorted={this.state.column === 'nation' ? this.state.direction : null} onClick={() => this.handleSort('nation')}>Nation</Table.HeaderCell>
                <Table.HeaderCell colSpan='2' sorted={this.state.column === 'type' ? this.state.direction : null} onClick={() => this.handleSort('type')}>Type</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'tier' ? this.state.direction : null} onClick={() => this.handleSort('tier')}>Tier</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'wins' ? this.state.direction : null} onClick={() => this.handleSort('wins')} rowSpan='2'>Wins</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'battles' ? this.state.direction : null} onClick={() => this.handleSort('battles')} rowSpan='2'>Battles</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'win_rate' ? this.state.direction : null} onClick={() => this.handleSort('win_rate')} rowSpan='2'>Win Rate</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'survival_rate' ? this.state.direction : null} onClick={() => this.handleSort('survival_rate')} rowSpan='2'>Survival Rate</Table.HeaderCell>
                <Table.HeaderCell colSpan='4'>Max</Table.HeaderCell>
                <Table.HeaderCell colSpan='4'>Average</Table.HeaderCell>
                <Table.HeaderCell rowSpan='2'></Table.HeaderCell>
              </Table.Row>
              <Table.Row>
                <Table.Cell colSpan='2'><Dropdown clearable placeholder='Select Ship' search selection options={this.state.shipnames} value={this.state.selectedName} onChange={(e,{value}) => {this.setState({selectedName:value,selectedNation: "all",selectedType: "all",selectedTier: "all"}); this.handleFilter(value,"all","all","all")}}/></Table.Cell>
                <Table.Cell colSpan='2'><Dropdown placeholder='Select Nation' selection options={nationOptions} value={this.state.selectedNation} onChange={(e,{value}) => {this.setState({selectedNation:value,selectedName:"all"}); this.handleFilter("all",value,this.state.selectedType,this.state.selectedTier)}}/></Table.Cell>
                <Table.Cell colSpan='2'><Dropdown placeholder='Select Type' selection options={typeOptions} value={this.state.selectedType} onChange={(e,{value}) => {this.setState({selectedType:value,selectedName:"all"}); this.handleFilter("all",this.state.selectedNation,value,this.state.selectedTier)}}/></Table.Cell>
                <Table.Cell><Dropdown placeholder='Select Tier ' selection options={tierOptions} value={this.state.selectedTier} onChange={(e,{value}) => {this.setState({selectedTier:value,selectedName:"all"}); this.handleFilter("all",this.state.selectedNation,this.state.selectedType,value)}}/></Table.Cell>
                <Table.HeaderCell sorted={this.state.column === 'max_xp' ? this.state.direction : null} onClick={() => this.handleSort('max_xp')}>XP</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'max_frags_battle' ? this.state.direction : null} onClick={() => this.handleSort('max_frags_battle')}>Kills</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'max_damage_dealt' ? this.state.direction : null} onClick={() => this.handleSort('max_damage_dealt')}>Damage</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'max_planes_killed' ? this.state.direction : null} onClick={() => this.handleSort('max_planes_killed')}>Plane Kills</Table.HeaderCell>

                <Table.HeaderCell sorted={this.state.column === 'ave_xp' ? this.state.direction : null} onClick={() => this.handleSort('ave_xp')}>XP</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'ave_frags' ? this.state.direction : null} onClick={() => this.handleSort('ave_frags')}>Kills</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'ave_damage_dealt' ? this.state.direction : null} onClick={() => this.handleSort('ave_damage_dealt')}>Damage</Table.HeaderCell>
                <Table.HeaderCell sorted={this.state.column === 'ave_planes_killed' ? this.state.direction : null} onClick={() => this.handleSort('ave_planes_killed')}>Plane Kills</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <PlayerShipTableBody data={this.state.selectedData} page={this.state.page} handleselectedShipID={this.handleselectedShipID}/>

            <Table.Footer className="PlayerShipTableFooter">
              <Table.Row>
                <Table.HeaderCell colSpan='20'>
                  <Menu floated='right' pagination>
                    <Menu.Item as='a' icon onClick={()=>this.setState({page:0})}>
                      <Icon name='angle double left' />
                    </Menu.Item>
                    <Menu.Item as='a' icon onClick={this.prevPage}>
                      <Icon name='angle left' />
                    </Menu.Item>
                    {this.build(this.state.selectedData)}
                    <Menu.Item as='a' icon onClick={this.nextPage}>
                      <Icon name='angle right' />
                    </Menu.Item>
                    <Menu.Item as='a' icon onClick={()=>this.setState({page:Math.ceil(this.state.selectedData.length/perpage-1)})}>
                      <Icon name='angle double right' />
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
        </Table>

        <Modal open={this.state.showModal} size="large" onClose={()=>this.setState({showModal:false})} closeIcon>
          <Modal.Content>
            <PlayerWeaponTable selectedShipData={this.state.selectedShipData}/>
          </Modal.Content>
        </Modal>

      </div>
    );
  }
}
