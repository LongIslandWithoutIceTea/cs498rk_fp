import React, { Component } from 'react'
import {  Message, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder,  Checkbox, Form  } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {getCookie, setCookie, checkCookie} from '../Common/cookie.js';
import {server} from '../Common/utlity.js';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedin: false,
      registerfail: false,
      hide: false,
      loading: false,
    }
    this.register = this.register.bind(this);
  }

  componentDidMount() {
  }

  register(){
    var password = this.state.password;
    this.setState({registerfail: false, password: "", loading: true});
    if(password === "" && this.state.username === ""){
        this.setState({registerfail: true, loading: false});
        return;
    }
    axios.post('https://cors-anywhere.herokuapp.com/' + server + "/users/register",{name:this.state.username,password:password})
    .then((response)=>{
        if (response.data.data && response.data.data.name && response.data.data.name === this.state.username){
          this.setState({loggedin: true, loading: false});
          setCookie("username", this.state.username, 0.1);
          if(this.props.registerCallBack){
            this.props.registerCallBack();
          }
        }else{
          this.setState({registerfail: true, loading: false});
        }
    })
    .catch((error) => {
      console.log(error);
      this.setState({registerfail: true, loading: false});
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
          <Header as="h1">Register</Header>
          <Form>
            <Form.Field required>
              <label>Username</label>
              <Input fluid label={{ icon: 'tag' }} labelPosition='left corner' error={this.state.registerfail} placeholder='username' value={this.state.username} onChange={(e,{value})=>this.setState({username:value})}/>
              <Message style={{display:this.state.registerfail?"block":"none"}} error header='Username Exists' content='Please try again.'/>
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <Input fluid label={{ icon: 'key' }} iconPosition='right' icon={<Icon name={this.state.hide?"eye":"eye slash"} link onClick={()=>this.setState({hide:this.state.hide?false:true})}/>} labelPosition='left corner' type={this.state.hide?"password":"text"} error={this.state.wrongpassword} placeholder='password' value={this.state.password} onChange={(e,{value})=>this.setState({password:value})}/>
            </Form.Field>
            <Button fluid onClick={() => this.register()}>Register</Button>
          </Form>
        </Segment>
      </Container>

    );
  }
}

export default Register;
