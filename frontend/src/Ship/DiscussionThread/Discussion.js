import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import {Link, NavLink} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {getCookie, setCookie, checkCookie} from '../../Common/cookie.js';
import {server} from '../../Common/utlity.js';
import ManagePost from '../../User/ManagePost.js';

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

export default class Discussion extends Component {
    constructor(props){
        super(props);
        this.state = {
          ship_id: '',
          user_post: '',
          hidden: true,
          content: '',
          post_list: [],
        }
        this.handleNewPost = this.handleNewPost.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ship_id:nextProps.ship_id, user_post: getCookie("username") != ""? getCookie("username"): "Guest_User", hidden:false});
      this.updatePosts(nextProps.ship_id);
    }

    componentDidMount(){
    }

    async handleNewPost(e){
      e.preventDefault();
      await axios.post(server + "/posts",{ship_id:this.state.ship_id,user_post:this.state.user_post,user_rating:0,content:this.state.content})
      .then((response)=>{
          if (response.data.data && response.data.data.ship_id && response.data.data.ship_id === this.state.ship_id){

          }else{
            console.log("different data" + response.data.data);
          }
      })
      .catch((error) => {
        console.log(error);
      });
      this.updatePosts(this.state.ship_id);
    }

    async handleDeletePost(e, idx){
        let post = this.state.post_list[idx]
        e.preventDefault();
        await axios.delete(server + "/posts/"+ post._id).
            then((response)=>{
                if (response.data.data && response.data.data._id === post._id){

                }else{
                    console.log("different data" + response.data.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        this.updatePosts(this.state.ship_id);
    }

    updatePosts(ship_id){
      axios.get(server + "/posts?where={\"ship_id\":"+ship_id+"}").
      then((response)=>{
        let new_list = response.data.data;
        console.log(response)
        this.setState({post_list:new_list});
      })
        this.setState({content: ""})
    }

    render() {
      const post_list = this.state.post_list.map((post, idx)=>{
        return (
          <Comment>
            <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>{post.user_post}</Comment.Author>
                <Comment.Metadata>
                    <span>{post.date_created}</span>
                </Comment.Metadata>
                <Comment.Text>{post.content}</Comment.Text>
                <Comment.Actions>
                    <Button content='Delete' labelPosition='left' onClick={e=>this.handleDeletePost(e, idx)} />
                </Comment.Actions>
            </Comment.Content>
          </Comment>
        )
      })

        return (
            <Comment.Group threaded>
                <Header as='h3' dividing>
                    You are currently posting as {this.state.user_post}
                </Header>
                {post_list}
                <Form reply>
                    <Form.TextArea onChange={(e, data)=>{this.setState({content:data.value}, ()=>{console.log(this.state.content.value)})}}/>
                    <Button content='Add Reply' labelPosition='left' icon='edit' primary onClick={e=>this.handleNewPost(e)}/>
                </Form>
            </Comment.Group>
        );
    }
}
