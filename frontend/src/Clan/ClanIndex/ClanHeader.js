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

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

const resultRenderer = ({title, clan_id, tag}) => <Header as='h4' key={clan_id}><Icon name='group'/><Header.Content>{'[' + tag + ']' + title}</Header.Content></Header>
resultRenderer.propTypes = {
  name: PropTypes.string,
  clan_id: PropTypes.string,
  tag: PropTypes.string,
}

const trigger = (
  <span>
    <Icon name='user' /> Hello, xxx
  </span>
)

class ClanHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      clan_id: '',
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
    this.setState({ clan_id: result.clan_id, value: result.name });
    if(result && result.clan_id){
      this.props.set_clan_id(result.clan_id);
    }
  }

  handleSearchChange(e, { value }){
    this.setState({value: value })
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
          <Menu.Item as='a' inverted href='/#/ship'><Icon name='anchor'/>Ship</Menu.Item>
          <Menu.Item as='a' inverted href='/#/player'><Icon name='user'/>Player</Menu.Item>
          <Menu.Item as='a' inverted active href='/#/clan'><Icon name='group'/>Clan</Menu.Item>
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
              resultRenderer={resultRenderer}
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

class Clan extends Component {
  constructor(props){
    super(props);
    this.state = {
      clan_id: '',
    };
    this.set_clan_id = this.set_clan_id.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.clan_id !== nextState.clan_id) {
      return true;
    }
    return false;
  }

  set_clan_id(id){
    this.setState({clan_id:id});
  }


  render(){
    if(this.state.clan_id && this.state.clan_id !== ''){
      return(
        <Container fluid>
          <ClanHeader set_clan_id={this.set_clan_id}/>
          <ClanIndex clan_id={this.state.clan_id}/>
        </Container>
      )
    }else if(this.props.location && this.props.location.state && this.props.location.state.clan_id){
      return(
        <Container fluid>
          <ClanHeader set_clan_id={this.set_clan_id}/>
          <ClanIndex clan_id={this.props.location.state.clan_id}/>
        </Container>
      )
    }else{
      return(
        <Container fluid>
          <ClanHeader set_clan_id={this.set_clan_id}/>
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
