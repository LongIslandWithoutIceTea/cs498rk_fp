import React, { Component } from 'react'
import {  Message, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder,  Checkbox, Form  } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';

const server = "http://localhost:4000/"
class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "TeaInTea",
      password: "",
      loggedin: false,
      wrongusername: false,
      hide: false,
    }
    this.register = this.register.bind(this);
  }

  componentDidMount() {
  }

  register(){
    this.setState({wrongusername: false, wrongpassword: false});
    axios.get(server + 'api/users/?where={"name":"' + this.state.username + '"}')
    .then((response)=>{
        if (response.data.data.length !== 0){
            this.setState({wrongusername: true});
        }else{
            axios.post(server + "api/users/",{name:this.state.username,password:this.state.password})
            .then((response)=>{
                if (response.data.data[0]){
                    this.setState({loggedin: true});
                }
            })
            .catch((error) => console.log(error));
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
          <Header as="h1">Register</Header>
          <Form>
            <Form.Field required>
              <label>Username</label>
              <Input fluid label={{ icon: 'tag' }} labelPosition='left corner' error={this.state.wrongusername} placeholder='username' value={this.state.username} onChange={(e,{value})=>this.setState({username:value})}/>
              <Message style={{display:this.state.wrongusername?"block":"none"}} error header='Username Exists' content='Please try again.'/>
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <Input fluid label={{ icon: 'key' }} iconPosition='right' icon={<Icon name={this.state.hide?"eye":"eye slash"} link onClick={()=>this.setState({hide:this.state.hide?false:true})}/>} labelPosition='left corner' type={this.state.hide?"password":"text"} error={this.state.wrongpassword} placeholder='password' value={this.state.password} onChange={(e,{value})=>this.setState({password:value})}/>
            </Form.Field>
            <Button onClick={() => this.register()}>Register</Button>
          </Form>
        </Segment>
        <p>Logged In: {this.state.loggedin.toString()}</p>
      </Container>

    );
  }
}

export default Register;
