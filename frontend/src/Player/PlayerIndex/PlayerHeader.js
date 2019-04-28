import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import PlayerIndex from './PlayerIndex.js';
import Login from '../../User/Login.js'
import Register from '../../User/Register.js'
import {withRouter} from 'react-router-dom';
import HeaderMenu from '../../Common/HeaderMenu.js'
import {division, divisionWhole, time, application_id} from '../../Common/utlity.js';
import {getCookie, setCookie, checkCookie} from '../../Common/cookie.js';

class Player extends Component {
  constructor(props){
    super(props);
    this.state = {
      account_id: '',
    };
    this.set_account_id = this.set_account_id.bind(this);
  }
  componentDidMount(){
    if(getCookie("back_mode") ==="player" && getCookie("back_id") !== ""){
      this.setState({account_id:getCookie("back_id")});
    }
  }
  componentWillUnmount(){
    setCookie("back_mode","player",0.1);
    setCookie("back_id",this.state.account_id,0.1);
  }
  set_account_id(id){
    this.setState({account_id:id});
  }
  render(){
    if(this.state.account_id && this.state.account_id !== ''){
      return(
        <Container fluid>
          <HeaderMenu set_account_id={this.set_account_id} mode="player"/>
          <PlayerIndex account_id={this.state.account_id}/>
        </Container>
      )
    }else if(this.props.location && this.props.location.state && this.props.location.state.account_id){
      return(
        <Container fluid>
          <HeaderMenu set_account_id={this.set_account_id} mode="player"/>
          <PlayerIndex account_id={this.props.location.state.account_id}/>
        </Container>
      )
    }else if(getCookie("back_mode") ==="player" && getCookie("back_id") !== ""){
      return(
        <Container fluid>
          <HeaderMenu set_account_id={this.set_account_id} mode="player"/>
          <PlayerIndex account_id={parseInt(getCookie("back_id"))}/>
        </Container>
      )
    }else{
      return(
        <Container fluid>
          <HeaderMenu set_account_id={this.set_account_id} mode="player"/>
          <div
            style={{
              display: window.innerWidth<768?'none':'flex',
              flexWrap: 'no-wrap',
              justifyContent : 'space-between',
              alignItems: 'space-evenly',
            }}
          >
            <div
              style={{marginLeft:"7em"}}
            >
              <Label pointing>Switch Between Different Database</Label>
            </div>
            <div
              style={{marginRight:"15em"}}
            >
              <Label pointing>Search Username</Label>
            </div>
          </div>
        </Container>
      )
    }
  }
}

export default withRouter(Player);
