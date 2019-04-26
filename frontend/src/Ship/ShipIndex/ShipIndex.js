import React, { Component } from 'react';
import { Popup, Progress, Grid, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Sticky, Rail } from 'semantic-ui-react';
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
            upgrades: [],
            modules_tag: ['artillery','dive_bomber','engine','fighter','fire_control','flight_control','hull','torpedo_bomber','torpedoes'],
            modules_data: [[],[],[],[],[],[],[],[],[]]
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

        await axios.get("https://api.worldofwarships.ru/wows/encyclopedia/info/?application_id=" + application_id + "&language=en" + "&fields=ship_type_images")
            .then((response)=>{
                let icons = response.data.data.ship_type_images;
                let icon = this.state.data.is_premium ? icons[this.state.data.type].image_premium : icons[this.state.data.type].image;
                this.setState({icon_url: icon});
            })

        let upgrades_id = this.state.data.upgrades;
        axios.get("https://api.worldofwarships.ru/wows/encyclopedia/consumables/?application_id=" + application_id + "&language=en" + "&consumable_id=" + upgrades_id)
            .then((response)=>{
                let upg_data = Object.values(response.data.data)
                this.setState({upgrades: upg_data});
            })

        let modules_id = Object.values(this.state.data.modules);

        let modules_promise = modules_id.map(id_arr => {
            if (id_arr.length === 0){
                return [];
            }
            else {
                return new Promise(function(resolve, reject) {
                    axios.get("https://api.worldofwarships.ru/wows/encyclopedia/modules/?application_id=" + application_id + "&language=en" + "&module_id=" + id_arr)
                        .then((response)=>{
                            resolve(Object.values(response.data.data))
                        })
                });
            }
        })
        Promise.all(modules_promise).then(values => {
            console.log(values);
            this.setState({modules_data: values});
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
        const upgrades = this.state.upgrades.map((data, i) => {
            let list = Object.values(data.profile).map( (text, idx) =>  <List.Item key={idx}>{text.description}</List.Item>)
            return(
            <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                <Popup.Header>{data.name}</Popup.Header>
                <Popup.Content>
                    <p>{data.description}</p>
                    <p>price in credits: {data.price_credit}</p>
                    <List bulleted>
                        {list}
                    </List>
                </Popup.Content>
            </Popup>
        )})

        const engine = this.state.modules_data[0].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

        const dive_bomber = this.state.modules_data[1].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})


        const fighter = this.state.modules_data[2].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

        const hull = this.state.modules_data[3].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

        const artillery = this.state.modules_data[4].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

        const torpedoes = this.state.modules_data[5].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

        const fire_control = this.state.modules_data[6].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

        const flight_control = this.state.modules_data[7].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

        const torp_bomber = this.state.modules_data[8].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>price in credits: {data.price_credit}</p>
                        <List bulleted>
                            <List.Item>Gaining Access</List.Item>
                            <List.Item>Inviting Friends</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )})

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
                        <Grid divided='vertically' columns={3}>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">
                                        Artillery
                                    </Header>
                                    {artillery}
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        Torpedoes
                                    </Header>
                                    {torpedoes}
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        Fire Control
                                    </Header>
                                    {fire_control}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">
                                        Flight Control
                                    </Header>
                                    {flight_control}
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        Hull
                                    </Header>
                                    {hull}
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        Fighters
                                    </Header>
                                    {fighter}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Header as="h4">
                                        Dive Bombers
                                    </Header>
                                    {dive_bomber}
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        Torpedo Bombers
                                    </Header>
                                    {torp_bomber}
                                </Grid.Column>
                                <Grid.Column>
                                    <Header as="h4">
                                        Engine
                                    </Header>
                                    {engine}
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
                            <Icon name='plus' />
                            Upgrades
                        </Header>
                    </Divider>
                    <Container
                        style={{
                            marginTop: '5em',
                        }}
                    >
                        {upgrades}
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
