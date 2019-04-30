import React, { Component } from 'react';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import {Link, NavLink} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import {getCookie, setCookie, checkCookie} from '../../Common/cookie.js';
import {time, server} from '../../Common/utlity.js';
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
          ship_name: '',
        }
        this.handleNewPost = this.handleNewPost.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
        this.rand = 0 + Math.random() * (10 - 0);
        this.vtuber_names = ["Kizuna Ai", "Dennou Shojo Siro", "Nekomiya Hinata", "Moemi & Yomeni", "Noja Loli Ojisan", "Tokino Sora", "Kaguya Luna", "Mirai Akari", "Tsukino Mito", "Nora Cat"]
        this.avatar = ["ade", "chris", "daniel", "helen", "joe", "justen", "lena", "laura", "steve", "matt", "nan", "veronika", "tom", "zoe"]
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ship_id:nextProps.ship_id, ship_name:nextProps.ship_name, user_post: getCookie("username") != ""? getCookie("username"): this.vtuber_names[Math.floor(this.rand)] + " [Guest]", hidden:false});
      this.updatePosts(nextProps.ship_id);
    }

    componentDidMount(){
    }

    async handleNewPost(e){
      console.log("ship name"+this.state.ship_name)
      e.preventDefault();
      await axios.post(server + "/posts",{ship_id:this.state.ship_id,ship_name:this.state.ship_name,user_post:this.state.user_post,user_rating:0,content:this.state.content})
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

    async handleVotePost(e, idx, rateChange){
        let post = this.state.post_list[idx];
        let newRating = post.user_rating + rateChange;
        e.preventDefault();
        await axios.put(server + "/posts/"+ post._id + "?user_rating=" + newRating).
            then((response)=>{
                if (response.data.data && response.data.data._id === post._id){
                  console.log(response)
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
        let action_selection = post.user_post === this.state.user_post ?
          (
            <Comment.Actions>
              <Button content='Delete' labelPosition='middle' onClick={e=>this.handleDeletePost(e, idx)} />
            </Comment.Actions>
          ):(
            <Comment.Actions>
              <Button content='Upvote' labelPosition='left' onClick={e=>this.handleVotePost(e, idx, 1)} />
              <Button content='Downvote' labelPosition='right' onClick={e=>this.handleVotePost(e, idx, -1)} />
            </Comment.Actions>
          )

        let avatar_pick = "https://react.semantic-ui.com/images/avatar/small/" + this.avatar[Math.floor(post.user_post.charCodeAt(0) % this.avatar.length)] +".jpg"

        return (
          <Comment>
            <Comment.Avatar as='a' src={avatar_pick} />
            <Comment.Content>
                <Comment.Author as='a'>{post.user_post}</Comment.Author>
                <Comment.Metadata>
                    <span>{time(post.date_created)}</span>
                    <span>{post.user_rating}</span>
                </Comment.Metadata>
                <Comment.Text>{post.content}</Comment.Text>
                {action_selection}
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
