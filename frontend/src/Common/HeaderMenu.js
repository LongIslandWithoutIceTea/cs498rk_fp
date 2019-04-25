import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import Login from '../User/Login.js'
import Register from '../User/Register.js'
import {withRouter} from 'react-router-dom';
import {getCookie, setCookie, checkCookie} from './cookie.js';

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

const resultRendererPlayer = ({title, account_id}) => <Header as='h4' key={account_id}><Icon name='user circle'/><Header.Content>{title}</Header.Content></Header>
resultRendererPlayer.propTypes = {
  nickname: PropTypes.string,
  account_id: PropTypes.string,
}

const resultRendererShip = ({title, ship_id, tag}) => <Header as='h4' key={ship_id}><Icon name='group'/><Header.Content>{'[' + tag + ']' + title}</Header.Content></Header>
resultRendererShip.propTypes = {
  name: PropTypes.string,
  ship_id: PropTypes.string,
  tag: PropTypes.string,
}

const resultRendererClan = ({title, clan_id, tag}) => <Header as='h4' key={clan_id}><Icon name='group'/><Header.Content>{'[' + tag + ']' + title}</Header.Content></Header>
resultRendererClan.propTypes = {
  name: PropTypes.string,
  clan_id: PropTypes.string,
  tag: PropTypes.string,
}

class HeaderMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
      shipList: [],
      ship_id: '',
      clan_id: '',
      account_id: '',
      mode: "ship",
      isLoading: false,
      results: [],
      value: '',
      showLogin: false,
      Register: false,
      username: "",
      greeting: getCookie("username") !==""? ("Hello," + getCookie("username")) : "Plase Sign in",
      cookieModalOpen: false,
    };
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.LoginClick = this.LoginClick.bind(this);
    this.RegisterClick = this.RegisterClick.bind(this);
    this.LogoutClick = this.LogoutClick.bind(this);
    this.getShipList = this.getShipList.bind(this);
    this.loginCallBack = this.loginCallBack.bind(this);
  }


  componentDidMount() {
    this.setState({mode:this.props.mode});
    this.setState({username:getCookie("username")});
    if(this.state.mode==="ship"){
      this.getShipList();
    }
    if(getCookie("agreed") !== "true"){
      this.setState({ cookieModalOpen: true })
    }
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
    if(this.state.mode==="ship"){
      this.setState({ ship_id: result.title, value: result.title});
      this.props.set_ship_id(result.ship_id)
    }else if(this.state.mode==="player"){
      this.setState({ account_id: result.account_id, value: result.nickname });
      if(result && result.account_id){
        this.props.set_account_id(result.account_id);
      }
    }else if(this.state.mode==="clan"){
      this.setState({ clan_id: result.clan_id, value: result.name });
      if(result && result.clan_id){
        this.props.set_clan_id(result.clan_id);
      }
    }
  }

  handleSearchChange(e, { value }){
    this.setState({value: value })
    if(this.state.mode==="ship"){
      if(value.length > 1) {
        this.setState({isLoading: true})
        var results = [];
        let filtered = this.state.shipList.filter(ship => ship.name.toLowerCase().includes(value.toLowerCase()))
        filtered.forEach((ship)=>{
          results.push({title:ship.name, image:ship.images.small, description:"Tier "+ship.tier+" "+ship.nation+" "+ship.type, ship_id: ship.ship_id});
        })
        this.setState({isLoading: false, results:results})
      }
    }else if(this.state.mode==="player"){
      if(value.length > 3) {
        this.setState({isLoading: true})
        axios.get("https://api.worldofwarships.com/wows/account/list/?application_id=" + application_id + "&search=" + value)
        .then((response)=>{
            var results = [];
            response.data.data.forEach((row)=>{
              results.push({title:row.nickname,account_id:row.account_id});
            })
            this.setState({isLoading: false, results:results})
        })
        .catch((error) => console.log(error));
      }
    }else if(this.state.mode==="clan"){
      if(value.length > 1) {
        this.setState({isLoading: true})
        axios.get("https://api.worldofwarships.com/wows/clans/list/?application_id=" + application_id + "&search=" + value)
        .then((response)=>{
            var results = [];
            response.data.data.forEach((row)=>{
              results.push({title:row.name,clan_id:row.clan_id,tag:row.tag});
            })
            this.setState({isLoading: false, results:results})
        })
        .catch((error) => console.log(error));
      }
    }
  }

  getShipList() {
    this.setState({isLoading: true})
    axios.get("https://api.worldofwarships.ru/wows/encyclopedia/info/?application_id=" + application_id + "&language=en" + "&fields=ship_nations")
        .then((response)=>{
          var results = [];
          let ship_nations = Object.keys(response.data.data.ship_nations);
          let ship_promise = ship_nations.map(nation => new Promise(function (resolve, reject) {
            axios.get("https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=" + application_id + "&language=en" + "&nation=" + nation + "&fields=name,images.small,nation,tier,type,ship_id")
                .then((response)=>{
                  resolve(response.data.data)
                })
                .catch((error) => reject(error));
          }));
          Promise.all(ship_promise).then(values => {
            let shipList = {}
            values.forEach( curr => {
              if (curr == undefined){
                return;
              }
              shipList = Object.assign(shipList,curr)
            })
            let keys = Object.keys(shipList);
            let vals = keys.map(key => shipList[key])
            this.setState({shipList:vals})
            this.setState({isLoading: false})
          })
        })

  }

  loginCallBack(){
    this.setState({username:getCookie("username"), greeting: "Hello," + getCookie("username"),});
    this.setState({showLogin: false});
  }

  LoginClick(){
    this.setState({showLogin: true});
  }
  RegisterClick(){
    this.setState({showRegister: true});
  }
  LogoutClick(){
    setCookie("username","",0.1);
    this.setState({username:"",greeting: "Plase Sign in",});
    window.location.reload();
  }

  render(){
    return(
        <div>
          <Menu inverted stackable size='large'>
            <Container fluid>
              <Menu.Item as='a' inverted active={this.state.mode==="home"} href='/'><div style={{margin:"auto"}}><Icon name='home'/>Home</div></Menu.Item>
              <Menu.Item as='a' inverted active={this.state.mode==="ship"} href='/#/ship'><div style={{margin:"auto"}}><Icon name='anchor'/>Ship</div></Menu.Item>
              <Menu.Item as='a' inverted active={this.state.mode==="player"} href='/#/player'><div style={{margin:"auto"}}><Icon name='user'/>Player</div></Menu.Item>
              <Menu.Item as='a' inverted active={this.state.mode==="clan"} href='/#/clan'><div style={{margin:"auto"}}><Icon name='group'/>Clan</div></Menu.Item>
              <Menu.Item position='right'>
                <Search
                    selectFirstResult
                    minCharacters = {this.state.mode==="ship"?3:(this.state.mode==="clan"?2:4)}
                    fluid
                    loading={this.state.isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                      leading: true,
                    })}
                    results={this.state.results}
                    value={this.state.value}
                    style={{margin:"auto"}}
                    resultRenderer={this.state.mode==="player"?resultRendererPlayer:(this.state.mode==="clan"?resultRendererClan:null)}
                />
              </Menu.Item>
              <Menu.Item >
                <div style={{margin:"auto"}}>
                <Dropdown trigger={(<span><Icon name='user' /> {this.state.greeting} </span>)} options={
                  [{
                    key: 'user',
                    text: (<span>{this.state.greeting}</span>),
                    disabled: true,
                  },
                    { key: 'sign-in', text: 'Sign In' , icon:'sign in', onClick:()=>{this.LoginClick()} },
                    { key: 'register', text: 'Register', icon:'pencil alternate', onClick:()=>{this.RegisterClick()} },
                    { key: 'setting', text: 'Account', icon:'setting', onClick:()=>{this.props.history.push('/user')} },
                    { key: 'sign-out', text: 'Sign Out', icon:'log out', onClick:()=>{this.LogoutClick()} },
                  ]
                }/>
                </div>
              </Menu.Item>
            </Container>
          </Menu>
          <Modal closeIcon  size="mini" centered={false} open={this.state.showLogin} onClose={()=>this.setState({showLogin:false})}><Modal.Content><Login loginCallBack={this.loginCallBack}/></Modal.Content></Modal>
          <Modal closeIcon  size="mini" centered={false} open={this.state.showRegister} onClose={()=>this.setState({showRegister:false})}><Modal.Content><Register/></Modal.Content></Modal>
          <Modal
            open={this.state.cookieModalOpen}
            basic
            size='small'
          >
            <Header icon='browser' content='Cookies policy' />
            <Modal.Content>
              <h3>This website uses cookies to ensure the best user experience.</h3>
            </Modal.Content>
            <Modal.Actions>
              <Button color='green' onClick={() => {this.setState({ cookieModalOpen: false });setCookie("agreed","true",1)}} inverted>
                <Icon name='checkmark' /> Got it
              </Button>
            </Modal.Actions>
          </Modal>
        </div>
    )
  }
}


export default withRouter(HeaderMenu);
