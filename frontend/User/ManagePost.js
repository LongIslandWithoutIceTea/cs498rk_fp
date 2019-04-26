import React, { Component } from 'react'
import {  Message, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Search, Placeholder,  Checkbox, Form  } from 'semantic-ui-react';
import axios from 'axios';
import {server} from '../Common/utlity.js';
import {Link, NavLink} from "react-router-dom";

class ManagePost extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
    }
    this.build = this.build.bind(this);
  }
  // TODO: Fix this!
  build(){
    var arr = [];
    axios.get('https://cors-anywhere.herokuapp.com/' + server + '/users?where={"name":"'+this.props.username+'"}')
    .then((response)=>{
        if(response.data.data.length === 1){
          response.data.data.post.forEach((post)=>{
            axios.get('https://cors-anywhere.herokuapp.com/' + server + '/posts?where={"_id":"'+post._id+'"}')
            .then((res)=>{
                arr.push((
                  <div>
                    <NavLink key={res.data.data.ship_id} style={{color:"cornflowerblue"}} to={{pathname: '/ship',state: {ship_id: res.data.data.ship_id}}}>{res.data.data.content}</NavLink>
                  </div>
                ))
            })
            .catch((error) => {console.log(error);});
          })
        }
    })
    .catch((error) => {console.log(error);});
    return(arr);
  }
  render() {
    return (
      <Container fluid>
          <Header as="h1" textAlign="center">Posts</Header>
          {this.props.username && this.build()}
      </Container>

    );
  }
}

export default ManagePost;
