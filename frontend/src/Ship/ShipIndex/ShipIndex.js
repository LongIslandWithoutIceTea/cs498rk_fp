import React, { Component } from 'react';
import {  Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Sticky, Rail } from 'semantic-ui-react';
import {Link, NavLink} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

export default class ShipIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            clan_id: '',
            playerlist: [],
            data: {"members_count":0,"name":"","creator_name":"","clan_id":1000043952,"created_at":1484747968,"updated_at":1555905684,"leader_name":"","members_ids":[],"creator_id":0,"tag":"","old_name":null,"is_clan_disbanded":false,"renamed_at":null,"old_tag":null,"leader_id":0,"description":""},
        }
        this.reloadData = this.reloadData.bind(this);
        this.buildMembers = this.buildMembers.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({clan_id:nextProps.clan_id});
        this.reloadData(nextProps.clan_id);
    }
    componentDidMount(){
        this.reloadData(this.props.clan_id);
    }
    reloadData(clan_id){
        axios.get("https://api.worldofwarships.com/wows/clans/info/?application_id=" + application_id + "&clan_id=" + clan_id)
            .then((response)=>{
                this.setState({data: response.data.data[clan_id]});
                var playerlist = [];
                var slice = 23;
                for(var i = 0; i < response.data.data[clan_id].members_ids.length/slice; i++){
                    var account_id_strings = "";
                    if (i * slice + slice < response.data.data[clan_id].members_ids.length){
                        var limit = i * slice + slice;
                    }else{
                        var limit = response.data.data[clan_id].members_ids.length;
                    }
                    for(var j = i * slice; j < limit; j++){
                        account_id_strings += response.data.data[clan_id].members_ids[j] + ",";
                    }
                    axios.get("https://api.worldofwarships.com/wows/account/info/?application_id=" + application_id,{params:{account_id:account_id_strings.substring(0,account_id_strings.length-1)}})
                        .then((playerresponse)=>{
                            for (const [account_id, playerres] of Object.entries(playerresponse.data.data)) {
                                if(playerres){
                                    playerlist.push(playerres);
                                    this.setState({playerlist: playerlist});
                                }
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

            </Container>
        );
    }
}
