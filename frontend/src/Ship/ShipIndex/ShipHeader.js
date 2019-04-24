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

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

const resultRenderer = ({title, ship_id, tag}) => <Header as='h4' key={ship_id}><Icon name='group'/><Header.Content>{'[' + tag + ']' + title}</Header.Content></Header>
resultRenderer.propTypes = {
  name: PropTypes.string,
  ship_id: PropTypes.string,
  tag: PropTypes.string,
}

const trigger = (
    <span>
    <Icon name='user' /> Hello, xxx
  </span>
)

class ShipHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      shipList: [],
      ship_id: '',
      isLoading: false,
      results: [],
      value: '',
      showLogin: false,
      Register: false,
    };
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.LoginClick = this.LoginClick.bind(this);
    this.RegisterClick = this.RegisterClick.bind(this);
    this.LogoutClick = this.LogoutClick.bind(this);
    this.getShipList = this.getShipList.bind(this);
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.resetComponent();
  }
  componentWillUnmount(){
    window.scrollTo(0, 0);
  }
  resetComponent(){
    this.setState({ isLoading: false, results: [], value: '' });
  }

  handleResultSelect(e, { result }){
    this.setState({ ship_id: result.ship_id, value: result.name });
    if(result && result.ship_id){
      this.props.set_ship_id(result.ship_id);
    }
  }

  handleSearchChange(e, { value }){
    this.setState({value: value })
    if(value.length > 1) {
      this.setState({isLoading: true})
      var results = [];
      let filtered = this.state.shipList.filter(name => name.toLowerCase().includes(value.toLowerCase()))
      console.log(filtered)
      filtered.forEach((ship)=>{
        results.push({title:ship});
      })
      this.setState({isLoading: false, results:results})
    }
  }

  componentDidMount() {
    this.getShipList();
  }

  getShipList() {
    axios.get("https://api.worldofwarships.ru/wows/encyclopedia/info/?application_id=" + application_id + "&language=en" + "&fields=ship_types")
        .then((response)=>{
          var results = [];
          let ship_types = Object.keys(response.data.data.ship_types);
          let ship_promise = ship_types.map(type => new Promise(function (resolve, reject) {
            axios.get("https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=" + application_id + "&language=en" + "&type=" + type + "&fields=name")
                .then((response)=>{
                  resolve(response.data.data)
                })
                .catch((error) => reject(error));
          }));
          Promise.all(ship_promise).then(values => {
            let shipList = []
            values.forEach( curr => {
              if (curr == undefined){
                return;
              }
              let keys = Object.keys(curr);
              let vals = keys.map(key => curr[key].name)
              shipList = shipList.concat(vals)
            })
            this.setState({shipList:shipList})
            console.log(shipList)
          })
        })
  }

  LoginClick(){
    this.setState({showLogin: true});
  }
  RegisterClick(){
    this.setState({showRegister: true});
  }
  LogoutClick(){
    alert("Loggedt out!")
  }

  render(){
    return(
        <div>
          <Menu inverted stackable size='large'>
            <Container fluid>
              <Menu.Item as='a' inverted href='/'><Icon name='home'/>Home</Menu.Item>
              <Menu.Item as='a' inverted active href='/#/ship'><Icon name='anchor'/>Ship</Menu.Item>
              <Menu.Item as='a' inverted href='/#/player'><Icon name='user'/>Player</Menu.Item>
              <Menu.Item as='a' inverted href='/#/ship'><Icon name='group'/>Clan</Menu.Item>
              <Menu.Item position='right'>
                <Search
                    selectFirstResult
                    minCharacters = {4}
                    fluid
                    loading={this.state.isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                      leading: true,
                    })}
                    results={this.state.results}
                    value={this.state.value}
                />
              </Menu.Item>
              <Menu.Item >
                <Dropdown trigger={trigger} options={
                  [{
                    key: 'user',
                    text: (
                        <span>
                    Signed in as <strong>xxx</strong>
                  </span>
                    ),
                    disabled: true,
                  },
                    { key: 'sign-in', text: 'Sign In' , icon:'sign in', onClick:()=>{this.LoginClick()} },
                    { key: 'register', text: 'Register', icon:'pencil alternate', onClick:()=>{this.RegisterClick()} },
                    { key: 'sign-out', text: 'Sign Out', icon:'log out', onClick:()=>{this.LogoutClick()} },
                  ]
                } />
              </Menu.Item>
            </Container>
          </Menu>
          <Modal closeIcon  open={this.state.showLogin} onClose={()=>this.setState({showLogin:false})}><Modal.Content><Login/></Modal.Content></Modal>
          <Modal closeIcon  open={this.state.showRegister} onClose={()=>this.setState({showRegister:false})}><Modal.Content><Register/></Modal.Content></Modal>
        </div>
    )
  }
}

class Ship extends Component {
  constructor(props){
    super(props);
    this.state = {
      ship_id: '',
    };
    this.set_ship_id = this.set_ship_id.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.ship_id !== nextState.ship_id) {
      return true;
    }
    return false;
  }

  set_ship_id(id){
    this.setState({ship_id:id});
  }


  render(){
    if(this.state.ship_id && this.state.ship_id !== ''){
      return(
          <Container fluid>
            <ShipHeader set_ship_id={this.set_ship_id}/>
            <ShipIndex ship_id={this.state.ship_id}/>
          </Container>
      )
    }else if(this.props.location && this.props.location.state && this.props.location.state.ship_id){
      return(
          <Container fluid>
            <ShipHeader set_ship_id={this.set_ship_id}/>
            <ShipIndex ship_id={this.props.location.state.ship_id}/>
          </Container>
      )
    }else{
      return(
          <Container fluid>
            <ShipHeader set_ship_id={this.set_ship_id}/>
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

export default withRouter(Ship);
