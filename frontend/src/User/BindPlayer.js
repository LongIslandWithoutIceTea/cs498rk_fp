import React, { Component } from 'react'
import {  Message, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder,  Checkbox, Form  } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {server} from '../Common/utlity.js';

class BindPlayer extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      account_id: "",
      loggedin: false,
      hide: false,
      loading: false,
    }
    this.BindPlayer = this.BindPlayer.bind(this);
  }

  componentDidMount() {
  }

  BindPlayer(){
    this.setState({invalidId: false, account_id: "", loading: true});
    console.log(this.state.account_id);
    axios.post(server + "/users/bind_player",{name:this.state.username,account_id:parseInt(this.state.account_id, 10)})
    .then((response)=>{
        if (response.data && response.data.data && response.data.data.name && response.data.data.name===this.state.username){
          if(this.props.bindplayerCallBack){
            this.setState({loading: false});
            alert("Success");
            this.props.bindplayerCallBack();
            window.location.reload();
          }else{
            this.setState({loading: false});
          }
        }else{
          this.setState({invalidId: true, loading: false});
        }
    })
    .catch((error) => {
      console.log(error);
      this.setState({invalidId: true, loading: false});
    });
  }

  render() {
    return (
      <Container fluid>
        <Segment
          style={{
            width:"300px",
            margin:"auto"
          }}
        >
        <Dimmer active={this.state.loading}>
          <Loader />
        </Dimmer>
          <Header as="h1">BindPlayer</Header>
          <Form>
            <Form.Field required>
              <label>Username</label>
              <Input fluid label={{ icon: 'tag' }} labelPosition='left corner' error={this.state.invalidId} placeholder='username' value={this.state.username} onChange={(e,{value})=>this.setState({username:value})}/>
            </Form.Field>
            <Form.Field required>
              <label>Account ID</label>
              <Input fluid label={{ icon: 'wheelchair' }} labelPosition='left corner' type={this.state.hide?"account_id":"text"} error={this.state.invalidId} placeholder='Player ID' value={this.state.account_id} onChange={(e,{value})=>this.setState({account_id:value})}/>
              <Message style={{display:this.state.invalidId?"block":"none"}} error header='Invalid ID' content='Please try again.'/>
            </Form.Field>
            <Button fluid onClick={() => this.BindPlayer()}>Bind Player Account</Button>
          </Form>
        </Segment>
      </Container>

    );
  }
}

export default BindPlayer;
