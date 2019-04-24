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
            ship_id: '',
            icon_url: '',
            data: undefined,
            }
        this.reloadData = this.reloadData.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ship_id :nextProps.ship_id});
        this.reloadData(nextProps.ship_id);
    }
    componentDidMount(){
        this.reloadData(this.props.ship_id);
    }

    async reloadData(ship_id){
        console.log(ship_id)
        await axios.get("https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=" + application_id + "&language=en" + "&ship_id=" + ship_id)
            .then((response)=>{
                let key = Object.keys(response.data.data)
                this.setState({data: response.data.data[key[0]]})
                console.log(response.data.data[key[0]])
            })

        axios.get("https://api.worldofwarships.ru/wows/encyclopedia/info/?application_id=" + application_id + "&language=en" + "&fields=ship_type_images")
            .then((response)=>{
                let icons = response.data.data.ship_type_images;
                let icon = this.state.data.is_premium ? icons[this.state.data.type].image_premium : icons[this.state.data.type].image
                this.setState({icon_url: icon})
                console.log(icons)
            })
    }

    render() {
        if (this.state.data != undefined ){
            return (
                <Container fluid>
                    <Container text>
                        <Image src={this.state.data.images.large}  />
                        <Header as='h1' content={this.state.data.name}
                                style={{
                                    fontSize: window.innerWidth>860?'4em':'3em',
                                    fontWeight: 'normal',
                                    marginBottom: 0,
                                    marginTop: window.innerWidth>860?'0.5em':'0.25em',
                                }}
                        />
                        <div>
                            <Image avatar src={this.state.icon_url}  />
                            <Header as='span' content={"Tier "+this.state.data.tier+" "+this.state.data.nation+" "+this.state.data.type}
                                    style={{
                                        fontSize: window.innerWidth>860?'1.7em':'1.2em',
                                        fontWeight: 'normal',
                                        marginTop: window.innerWidth>860?'0.5em':'0.25em',
                                    }}
                            />
                        </div>
                    </Container>

                    <Divider horizontal
                             style={{
                                 marginTop: '5em',
                             }}
                    >
                        <Header as='h4'>
                            <Icon name='align justify' />
                            Description
                        </Header>
                    </Divider>
                    <Container
                        style={{
                            marginTop: '5em',
                        }}
                    >
                        <Header as="h6">{this.state.data.description}</Header>
                    </Container>
                </Container>
            );
        }
        else return (
            <Container fluid>
                <br/>
                <Loader active inline='centered' />
            </Container>
        );
    }
}
