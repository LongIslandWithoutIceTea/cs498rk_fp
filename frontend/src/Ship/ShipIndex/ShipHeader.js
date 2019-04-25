import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import ShipIndex from './ShipIndex.js';
import Login from '../../User/Login.js'
import Register from '../../User/Register.js'
import {withRouter} from 'react-router-dom';
import HeaderMenu from "../../Player/PlayerIndex/PlayerHeader";
import {getCookie, setCookie, checkCookie} from '../../Common/cookie.js';

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

class Ship extends Component {
  constructor(props){
    super(props);
    this.state = {
      ship_id: '',
    };
    this.set_ship_id = this.set_ship_id.bind(this);
  }

  componentDidMount(){
    if(getCookie("back_mode") ==="ship" && getCookie("back_id") !== ""){
      this.setState({ship_id:getCookie("back_id")});
    }
  }

  componentWillUnmount(){
    setCookie("back_mode","ship",0.1);
    setCookie("back_id",this.state.ship_id,0.1);
  }


  set_ship_id(id){
    this.setState({ship_id: id});
  }


  render(){
    if(this.state.account_id && this.state.account_id !== ''){
      return(
          <Container fluid>
            <HeaderMenu set_ship_id={this.set_ship_id} mode="ship"/>
            <ShipIndex ship_id={this.state.ship_id}/>
          </Container>
      )
    }else if(this.props.location && this.props.location.state && this.props.location.state.account_id){
      return(
          <Container fluid>
            <HeaderMenu set_ship_id={this.set_ship_id} mode="ship"/>
            <ShipIndex ship_id={this.state.ship_id}/>
          </Container>
      )
    }else if(getCookie("back_mode") ==="ship" && getCookie("back_id") !== "") {
      return (
          <Container fluid>
            <HeaderMenu set_ship_id={this.set_ship_id} mode="ship"/>
            <ShipIndex ship_id={this.state.ship_id}/>
          </Container>
      )
    }
    else{
      return(
          <HeaderMenu set_ship_id={this.set_ship_id} mode="ship"/>
      )
    }
  }
}

export default withRouter(Ship);
