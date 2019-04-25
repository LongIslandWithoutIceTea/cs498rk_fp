import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Sticky, Rail, Popup } from 'semantic-ui-react';
import {Link, NavLink} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import ToTopButton from '../../Common/ToTopButton.js';
import axios from 'axios';
import {division, divisionWhole, time, application_id} from '../../Common/utlity.js';

export default class ClanIndex extends Component {
  constructor(props){
    super(props);
    this.state = {
      clan_id: '',
      playerlist: [],
      playerclanlist: {},
      clans_roles: {"executive_officer": "Deputy Commander","recruitment_officer": "Recruiter","private": "Line Officer", "commander": "Commander"},
      data: {"members_count":0,"name":"","creator_name":"","clan_id":1,"created_at":1,"updated_at":1,"leader_name":"","members_ids":[],"creator_id":0,"tag":"","old_name":null,"is_clan_disbanded":false,"renamed_at":null,"old_tag":null,"leader_id":0,"description":""},
    }
    this.reloadData = this.reloadData.bind(this);
    this.buildMembers = this.buildMembers.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({clan_id:nextProps.clan_id});
    this.reloadData(nextProps.clan_id);
  }
  componentDidMount(){
    this.reloadData(this.props.clan_id);
  }
  reloadData(clan_id){
    axios.get("https://api.worldofwarships.com/wows/clans/info/?application_id=" + application_id + "&clan_id=" + clan_id)
    .then((response)=>{
        this.setState({data: response.data.data[clan_id]});
        var playerlist = [];
        var playerclanlist = {};
        var slice = 23;
        for(var i = 0; i < response.data.data[clan_id].members_ids.length/slice; i++){
          var account_id_strings = "";
          if (i * slice + slice < response.data.data[clan_id].members_ids.length){
            var limit = i * slice + slice;
          }else{
            var limit = response.data.data[clan_id].members_ids.length;
          }
          for(var j = i * slice; j < limit; j++){
            account_id_strings += response.data.data[clan_id].members_ids[j] + ",";
          }
          axios.get("https://api.worldofwarships.com/wows/account/info/?application_id=" + application_id,{params:{account_id:account_id_strings.substring(0,account_id_strings.length-1)}})
          .then((playerresponse)=>{
            for (const [account_id, playerres] of Object.entries(playerresponse.data.data)) {
              if(playerres){
                playerlist.push(playerres);
                this.setState({playerlist: playerlist});
              }
            }
          })
          .catch((error) => console.log(error));
          axios.get("https://api.worldofwarships.com/wows/clans/accountinfo/?application_id=" + application_id,{params:{account_id:account_id_strings.substring(0,account_id_strings.length-1)}})
          .then((playerclanresponse)=>{
            for (const [account_id, playerclanres] of Object.entries(playerclanresponse.data.data)) {
              if(playerclanres){
                playerclanlist[playerclanres.account_id] = playerclanres.role;
                this.setState({playerclanlist: playerclanlist});
              }
            }
          })
          .catch((error) => console.log(error));
          axios.get("https://api.worldofwarships.com/wows/clans/glossary/?application_id=" + application_id)
          .then((glossaryresponse)=>{
            if(glossaryresponse["clans_roles"]){
              this.setState({clans_roles: glossaryresponse["clans_roles"]});
            }
          })
          .catch((error) => console.log(error));
        }
    })
    .catch((error) => console.log(error));
  }
  buildMembers(){
    var arr = [];
    this.state.playerlist.forEach((row)=>{
        if(row.statistics){
          arr.push(
            (
              <div key={row.nickname}>
                <div
                  style={{
                    display:"flex",
                    flexWrap: 'wrap',
                    justifyContent : 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <div style={{margin: '1.5em'}}>
                    <Icon name='user circle' size='large'/>
                    <Popup
                      trigger={<NavLink to={{pathname: '/player',state: {account_id: row.account_id}}}>{row.nickname}</NavLink>}
                      header = "Position"
                      content= {this.state.clans_roles[this.state.playerclanlist[row.account_id]]}
                      position='top right'
                      size='large'
                    />
                  </div>
                  <div style={{margin: '1.5em'}}
                    style={{
                      display:"flex",
                      flexWrap: 'wrap',
                      justifyContent : 'space-between',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                    }}
                  >
                    <Statistic horizontal size="small">
                      <Statistic.Value>{(division(row.statistics.pvp.wins,row.statistics.pvp.wins+row.statistics.pvp.draws+row.statistics.pvp.losses)*100).toFixed(0) + "%"}</Statistic.Value>
                      <Statistic.Label>Win Rate</Statistic.Label>
                    </Statistic>
                    <Statistic horizontal size="small">
                      <Statistic.Value>{division(row.statistics.pvp.frags,row.statistics.pvp.battles-row.statistics.pvp.survived_battles)}</Statistic.Value>
                      <Statistic.Label>K/D</Statistic.Label>
                    </Statistic>
                    <Statistic horizontal size="small">
                      <Statistic.Value>{divisionWhole(row.statistics.pvp.damage_dealt,row.statistics.pvp.wins+row.statistics.pvp.draws+row.statistics.pvp.losses).toLocaleString()}</Statistic.Value>
                      <Statistic.Label>Average Damage</Statistic.Label>
                    </Statistic>
                  </div>
                </div>
                <Divider/>
              </div>
            )
          )
        }else{
          arr.push(
            (
              <div key={row.nickname}>
                <div
                  style={{
                    display:"flex",
                    flexWrap: 'wrap',
                    justifyContent : 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <div style={{margin: '1.5em'}}>
                    <Icon name='user circle' size='large'/>
                    <NavLink to={{pathname: '/player',state: {account_id: row.account_id}}}>{row.nickname}</NavLink>
                  </div>
                  <div style={{margin: '1.5em'}}
                    style={{
                      display:"flex",
                      flexWrap: 'wrap',
                      justifyContent : 'space-between',
                      alignItems: 'flex-start',
                      flexDirection: 'row',
                    }}
                  >
                    <Statistic horizontal size="small">
                      <Statistic.Value>n/a</Statistic.Value>
                      <Statistic.Label>Win Rate</Statistic.Label>
                    </Statistic>
                    <Statistic horizontal size="small">
                      <Statistic.Value>n/a</Statistic.Value>
                      <Statistic.Label>K/D</Statistic.Label>
                    </Statistic>
                    <Statistic horizontal size="small">
                      <Statistic.Value>n/a</Statistic.Value>
                      <Statistic.Label>Average Damage</Statistic.Label>
                    </Statistic>
                  </div>
                </div>
                <Divider/>
              </div>
            )
          )
        }

    })
    return arr;
  }

  render() {
    return (
      <Container fluid>
        <Container text>
          <Icon name='group'
            style={{
              fontSize: window.innerWidth>860?'4em':'3em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: window.innerWidth>860?'2em':'1em',
            }}
          />
          <Header as='h1' content={this.state.data.name}
            style={{
              fontSize: window.innerWidth>860?'4em':'3em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: window.innerWidth>860?'0.5em':'0.25em',
            }}
          />
          <Header as='h2' content={this.state.data.tag}
            style={{
              fontSize: window.innerWidth>860?'1.7em':'1.2em',
              fontWeight: 'normal',
              marginTop: window.innerWidth>860?'0.5em':'0.25em',
            }}
          />
        </Container>

        <div
          style={{
            marginTop: '7em',
            marginLeft: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent : 'space-evenly',
            alignItems: 'center',
          }}
        >
          <div style={{margin: '1.5em'}}>
          <Statistic>
            <Statistic.Value>{this.state.data.members_count.toLocaleString()}</Statistic.Value>
            <Statistic.Label>Members</Statistic.Label>
          </Statistic>
          </div>
          <div style={{margin: '1.5em'}}>
          <Statistic>
            <Statistic.Value>{time(this.state.data.created_at)}</Statistic.Value>
            <Statistic.Label>Since</Statistic.Label>
          </Statistic>
          </div>
        </div>

        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4' onClick={() => this.setState({ playerTableVisible: !this.state.playerTableVisible })}>
            <Icon name='align justify' />
            Description
          </Header>
        </Divider>
        <Container
          style={{
              marginTop: '5em',
            }}
        >
          <Header as="h6">{this.state.data.description}</Header>
        </Container>

        <Divider horizontal
        style={{
            marginTop: '5em',
          }}
        >
          <Header as='h4' onClick={() => this.setState({ playerTableVisible: !this.state.playerTableVisible })}>
            <Icon name='user' />
            Members
          </Header>
        </Divider>
        <Container
        style={{
            marginTop: '2.5em',
            marginBottom: '2.5em',
          }}
        >
          <Container>
            {this.buildMembers()}
          </Container>
        </Container>
        <ToTopButton scrollStepInPx="100" delayInMs="16.66"/>
      </Container>
    );
  }
}
