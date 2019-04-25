import React, { Component } from 'react';
import { Progress, Grid, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Sticky, Rail } from 'semantic-ui-react';
import {Link, NavLink} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import DiscussionThread from '../DiscussionThread/Discussion.js'

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
        this.getColorByValue = this.getColorByValue.bind(this);
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

    getColorByValue(value){
        if (value < 30){
            return 'red';
        }
        else if (value < 50){
            return 'yellow';
        }
        else if (value < 70){
            return 'olive';
        }
        else {
            return 'blue';
        }
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
                        <Grid>
                            <Grid.Column width={10}>
                                <Header as="div" textAlign='left'>{this.state.data.description}</Header>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Progress percent={this.state.data.default_profile.armour.total}size='small'progress color={this.getColorByValue(this.state.data.default_profile.armour.total)}>Survivability</Progress>
                                <Progress percent={this.state.data.default_profile.weaponry.artillery}size='small'progress color={this.getColorByValue(this.state.data.default_profile.weaponry.artillery)}>Artillery</Progress>
                                <Progress percent={this.state.data.default_profile.weaponry.anti_aircraft}size='small'progress color={this.getColorByValue(this.state.data.default_profile.weaponry.anti_aircraft)}>AA Defense</Progress>
                                <Progress percent={this.state.data.default_profile.mobility.total}size='small'progress color={this.getColorByValue(this.state.data.default_profile.mobility.total)}>Maneuverability</Progress>
                                <Progress percent={this.state.data.default_profile.concealment.total}size='small'progress color={this.getColorByValue(this.state.data.default_profile.concealment.total)}>Concealment</Progress>
                            </Grid.Column>
                        </Grid>
                    </Container>

                    <Divider horizontal
                             style={{
                                 marginTop: '5em',
                             }}
                    >
                        <Header as='h4'>
                            <Icon name='bar chart' />
                            Specifications
                        </Header>
                    </Divider>
                    <Container
                        style={{
                            marginTop: '5em',
                        }}
                    >
                        <Grid columns={3} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">
                                        <Icon name='crosshairs' />
                                        Artillery
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        <Icon name='eye dropper' />
                                        Torpedoes
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        <Icon name='ship' />
                                        Hull
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">
                                        <Icon name='fighter jet' />
                                        Aircrafts
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        <Icon name='exclamation triangle' />
                                        Concealment
                                    </Header>
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        <Icon name='expand arrows alternate' />
                                        Mobility
                                    </Header>
                                </Grid.Column>
                            </Grid.Row>

                        </Grid>
                    </Container>

                    <Divider horizontal
                             style={{
                                 marginTop: '5em',
                             }}
                    >
                        <Header as='h4'>
                            <Icon name='comments' />
                            Discussion Thread
                        </Header>
                    </Divider>
                    <Container
                        style={{
                            marginTop: '5em',
                        }}
                    >
                        <DiscussionThread/>
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
