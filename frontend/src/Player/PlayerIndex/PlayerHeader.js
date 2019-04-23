import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import _ from 'lodash';
import axios from 'axios';
import PropTypes from 'prop-types';
import PlayerIndex from './PlayerIndex.js';
import {withRouter} from 'react-router-dom';

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

const resultRenderer = ({title, account_id}) => <Header as='h4' key={account_id}><Icon name='user circle'/><Header.Content>{title}</Header.Content></Header>
resultRenderer.propTypes = {
  nickname: PropTypes.string,
  account_id: PropTypes.string,
}

const trigger = (
  <span>
    <Icon name='user' /> Hello, xxx
  </span>
)
const options = [
  {
    key: 'user',
    text: (
      <span>
        Signed in as <strong>xxx</strong>
      </span>
    ),
    disabled: true,
  },
  { key: 'sign-in', text: 'Sign In' , icon:'sign in'},
  { key: 'sign-out', text: 'Sign Out', icon:'log out' },
]

class PlayerHeader extends Component {
  constructor(props){
    super(props);
    this.state = {
      account_id: '',
      isLoading: false,
      results: [],
      value: '',
    };
    this.resetComponent = this.resetComponent.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
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
    this.setState({ account_id: result.account_id, value: result.nickname });
    if(result && result.account_id){
      this.props.set_account_id(result.account_id);
    }
  }

  handleSearchChange(e, { value }){
    this.setState({value: value })
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
  }

  render(){
    return(
      <Menu inverted stackable size='large'>
        <Container fluid>

          <Menu.Item as='a' inverted href='/'><Icon name='home'/>Home</Menu.Item>
          <Menu.Item as='a' inverted href='/'><Icon name='anchor'/>Ship</Menu.Item>
          <Menu.Item as='a' inverted active href='/#/player'><Icon name='user'/>Player</Menu.Item>
          <Menu.Item as='a' inverted href='/#/clan'><Icon name='group'/>Clan</Menu.Item>
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
          <Dropdown trigger={trigger} options={options} />
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}

class Player extends Component {
  constructor(props){
    super(props);
    this.state = {
      account_id: '',
    };
    this.set_account_id = this.set_account_id.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.account_id !== nextState.account_id) {
      return true;
    }
    return false;
  }

  set_account_id(id){
    this.setState({account_id:id});
  }
  render(){
    if(this.state.account_id && this.state.account_id !== ''){
      return(
        <Container fluid>
          <PlayerHeader set_account_id={this.set_account_id}/>
          <PlayerIndex account_id={this.state.account_id}/>
        </Container>
      )
    }else if(this.props.location && this.props.location.state && this.props.location.state.account_id){
      return(
        <Container fluid>
          <PlayerHeader set_account_id={this.set_account_id}/>
          <PlayerIndex account_id={this.props.location.state.account_id}/>
        </Container>
      )
    }else{
      return(
        <Container fluid>
          <PlayerHeader set_account_id={this.set_account_id}/>
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

export default withRouter(Player);