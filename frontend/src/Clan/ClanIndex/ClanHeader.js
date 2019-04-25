import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import ClanIndex from './ClanIndex.js';
import Login from '../../User/Login.js'
import Register from '../../User/Register.js'
import {withRouter} from 'react-router-dom';
import HeaderMenu from '../../Common/HeaderMenu.js'
import {division, divisionWhole, time, application_id} from '../../Common/utlity.js';
import {getCookie, setCookie, checkCookie} from '../../Common/cookie.js';

class Clan extends Component {
  constructor(props){
    super(props);
    this.state = {
      clan_id: '',
    };
    this.set_clan_id = this.set_clan_id.bind(this);
  }

  componentDidMount(){
    if(getCookie("back_mode") ==="clan" && getCookie("back_id") !== ""){
      this.setState({clan_id:getCookie("back_id")});
    }
  }
  componentWillUnmount(){
    setCookie("back_mode","clan",0.1);
    setCookie("back_id",this.state.clan_id,0.1);
  }

  set_clan_id(id){
    this.setState({clan_id:id});
  }


  render(){
    if(this.state.clan_id && this.state.clan_id !== ''){
      return(
        <Container fluid>
          <HeaderMenu set_clan_id={this.set_clan_id} mode="clan"/>
          <ClanIndex clan_id={this.state.clan_id}/>
        </Container>
      )
    }else if(this.props.location && this.props.location.state && this.props.location.state.clan_id){
      return(
        <Container fluid>
          <HeaderMenu set_clan_id={this.set_clan_id} mode="clan"/>
          <ClanIndex clan_id={this.props.location.state.clan_id}/>
        </Container>
      )
    }else if(getCookie("back_mode") ==="clan" && getCookie("back_id") !== ""){
      return(
        <Container fluid>
          <HeaderMenu set_account_id={this.set_clan_id} mode="clan"/>
          <ClanIndex clan_id={getCookie("back_id")}/>
        </Container>
      )
    }else{
      return(
        <Container fluid>
          <HeaderMenu set_clan_id={this.set_clan_id} mode="clan"/>
          <Placeholder fluid>
            <Placeholder.Header>
              <Placeholder.Line length='full' />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='full' />
            </Placeholder.Paragraph>
          </Placeholder>
        </Container>
      )
    }
  }
}

export default withRouter(Clan);
