import React, { Component } from 'react'
import {  Message, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder,  Checkbox, Form  } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';

const server = "http://localhost:4000/"
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "TeaInTea",
      password: "",
      loggedin: false,
      wrongusername: false,
      wrongpassword: false,
      hide: false,
    }
    this.login = this.login.bind(this);
  }

  componentDidMount() {
  }

  login(){
    var password = this.state.password;
    this.setState({wrongusername: false, wrongpassword: false, password: ""});
    axios.get(server + 'api/users/?where={"name":"' + this.state.username + '"}')
    .then((response)=>{
        if (response.data.data.length === 0){
          this.setState({wrongusername: true});
        }else if (response.data.data[0].password === password){
          this.setState({loggedin: true});
        }else{
          this.setState({wrongpassword: true});
        }
    })
    .catch((error) => console.log(error));
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
          <Header as="h1">Login</Header>
          <Form>
            <Form.Field>
              <label>Username</label>
              <Input fluid label={{ icon: 'tag' }} labelPosition='left corner' error={this.state.wrongusername} placeholder='username' value={this.state.username} onChange={(e,{value})=>this.setState({username:value})}/>
              <Message style={{display:this.state.wrongusername?"block":"none"}} error header='Username Wrong' content='Please try again.'/>
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <Input fluid label={{ icon: 'key' }} iconPosition='right' icon={<Icon name={this.state.hide?"eye":"eye slash"} link onClick={()=>this.setState({hide:this.state.hide?false:true})}/>} labelPosition='left corner' type={this.state.hide?"password":"text"} error={this.state.wrongpassword} placeholder='password' value={this.state.password} onChange={(e,{value})=>this.setState({password:value})}/>
              <Message style={{display:this.state.wrongpassword?"block":"none"}} error header='Password Wrong' content='Please try again.'/>
            </Form.Field>
            <Button onClick={() => this.login()}>Login</Button>
          </Form>
        </Segment>
        <p>Logged In: {this.state.loggedin.toString()}</p>
      </Container>

    );
  }
}

export default Login;
