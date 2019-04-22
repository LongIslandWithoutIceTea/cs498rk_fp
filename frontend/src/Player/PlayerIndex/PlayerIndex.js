import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import PlayerShipTable from '../PlayerTable/PlayerShipTable.js'
const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

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
    }
  }
  componentDidMount() {
    axios.get("  https://api.worldofwarships.com/wows/account/info/?application_id=" + application_id + "&account_id=" + this.props.account_id)
    .then((response)=>{
        this.setState({data: response.data.data[this.props.account_id]});
    })
    .catch((error) => console.log(error));
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
          <Header as='h2' content={"Level: " + this.state.data.leveling_tier}
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
