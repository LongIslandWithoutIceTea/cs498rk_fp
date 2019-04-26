import React, { Component } from 'react'
import {  Message, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder,  Checkbox, Form  } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {getCookie, setCookie, checkCookie} from '../Common/cookie.js';
import {server} from '../Common/utlity.js';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedin: false,
      loginfail: false,
      hide: false,
      loading: false,
    }
    this.login = this.login.bind(this);
  }

  componentDidMount() {
  }

  login(){
    var password = this.state.password;
    this.setState({loginfail: false, password: "", loading: true});
    if(password === "" && this.state.username === ""){
        this.setState({loginfail: true, loading: false});
        return;
    }
    axios.post('https://cors-anywhere.herokuapp.com/' + server + "/users/login",{name:this.state.username,password:password})
    .then((response)=>{
        if (response.data.success){
          this.setState({loggedin: true, loading: false});
          setCookie("username", this.state.username, 0.1);
          if(this.props.loginCallBack){
            this.props.loginCallBack();
          }
        }else{
          this.setState({loginfail: true, loading: false});
        }
    })
    .catch((error) => {
      console.log(error);
      this.setState({loginfail: true, loading: false});
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
          <Header as="h1">Login</Header>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Input fluid label={{ icon: 'tag' }} labelPosition='left corner' error={this.state.loginfail} placeholder='username' value={this.state.username} onChange={(e,{value})=>this.setState({username:value})}/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input fluid label={{ icon: 'key' }} iconPosition='right' icon={<Icon name={this.state.hide?"eye":"eye slash"} link onClick={()=>this.setState({hide:this.state.hide?false:true})}/>} labelPosition='left corner' type={this.state.hide?"password":"text"} error={this.state.loginfail} placeholder='password' value={this.state.password} onChange={(e,{value})=>this.setState({password:value})}/>
              <Message style={{display:this.state.loginfail?"block":"none"}} error header='Login Failed' content='Please check your username and password.'/>
            </Form.Field>
            <Button fluid onClick={() => this.login()}>Login</Button>
          </Form>
        </Segment>
      </Container>

    );
  }
}

export default Login;
