import React, { Component } from 'react'
import {  Message, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder,  Checkbox, Form  } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {server} from '../Common/utlity.js';

class ChangePassword extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      oldpassword: "",
      loggedin: false,
      wrongpassword: false,
      hide: false,
      loading: false,
    }
    this.ChangePassword = this.ChangePassword.bind(this);
  }

  componentDidMount() {
  }

  ChangePassword(){
    var password = this.state.password;
    this.setState({loginfail: false, password: "", loading: true});
    if(password === "" && this.state.username === ""){
        this.setState({loginfail: true, loading: false});
        return;
    }
    axios.post(server + "/users/change_password",{name:this.state.username,old_password:this.state.oldpassword,new_password:this.state.password})
    .then((response)=>{
        if (response.data && response.data.data && response.data.data.name && response.data.data.name===this.state.username){
          if(this.props.changepassCallBack){
            this.setState({loading: false});
            alert("Success");
            this.props.changepassCallBack();
          }else{
            this.setState({loading: false});
          }
        }else{
          this.setState({wrongpassword: true, loading: false});
        }
    })
    .catch((error) => {
      console.log(error);
      this.setState({wrongpassword: true, loading: false});
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
          <Header as="h1">ChangePassword</Header>
          <Form>
            <Form.Field required>
              <label>Username</label>
              <Input fluid label={{ icon: 'tag' }} labelPosition='left corner' error={this.state.wrongusername} placeholder='username' value={this.state.username} onChange={(e,{value})=>this.setState({username:value})}/>
            </Form.Field>
            <Form.Field required>
              <label>Old Password</label>
              <Input fluid label={{ icon: 'key' }} iconPosition='right' icon={<Icon name={this.state.hide?"eye":"eye slash"} link onClick={()=>this.setState({hide:this.state.hide?false:true})}/>} labelPosition='left corner' type={this.state.hide?"password":"text"} error={this.state.wrongoldpassword} placeholder='password' value={this.state.oldpassword} onChange={(e,{value})=>this.setState({oldpassword:value})}/>
              <Message style={{display:this.state.wrongpassword?"block":"none"}} error header='Wrong Username and Password' content='Please try again.'/>
            </Form.Field>
            <Form.Field required>
              <label>New Password</label>
              <Input fluid label={{ icon: 'key' }} iconPosition='right' icon={<Icon name={this.state.hide?"eye":"eye slash"} link onClick={()=>this.setState({hide:this.state.hide?false:true})}/>} labelPosition='left corner' type={this.state.hide?"password":"text"} error={this.state.wrongpassword} placeholder='password' value={this.state.password} onChange={(e,{value})=>this.setState({password:value})}/>
            </Form.Field>
            <Button fluid onClick={() => this.ChangePassword()}>Change Password</Button>
          </Form>
        </Segment>
      </Container>

    );
  }
}

export default ChangePassword;
