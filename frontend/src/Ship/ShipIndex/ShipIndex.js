import React, { Component } from 'react';
import { Accordion, Popup, Progress, Grid, Icon, Label, Menu, Table, Dimmer, Loader, Segment, Input, Dropdown, Header, Modal, Statistic, Container, Divider, List, Image, Card, Sidebar, Tab, Button, Sticky, Rail } from 'semantic-ui-react';
import {Link, NavLink} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import DiscussionThread from '../DiscussionThread/Discussion.js'

const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

const nationDict={
    'usa':{image: 'http://wiki.gcdn.co/images/f/f2/Wows_flag_USA.png', text: 'USA'},
    'ussr':{image: 'http://wiki.gcdn.co/images/0/04/Wows_flag_Russian_Empire_and_USSR.png',text: 'USSR'},
    'uk':{image: 'http://wiki.gcdn.co/images/3/34/Wows_flag_UK.png',text: 'UK'},
    'japan':{image: 'http://wiki.gcdn.co/images/5/5b/Wows_flag_Japan.png',text: 'Japan'},
    'france':{image: 'http://wiki.gcdn.co/images/7/71/Wows_flag_France.png', text: 'France'},
    'germany':{image: 'http://wiki.gcdn.co/images/6/6b/Wows_flag_Germany.png',text: 'Germany'},
    'poland':{image: 'http://wiki.gcdn.co/images/5/5f/Wows_flag_Poland.png', text: 'Poland'},
    'pan_asia':{image: 'http://wiki.gcdn.co/images/3/33/Wows_flag_Pan_Asia.png', text: 'Pan Asia'},
    'italy':{image: 'http://wiki.gcdn.co/images/d/d1/Wows_flag_Italy.png', text: 'Italy'},
    'commonwealth':{image: 'http://wiki.gcdn.co/images/3/3e/Wows_flag_Commonwealth.PNG', text: 'Common Wealth'},
    'pan_america':{image: 'http://wiki.gcdn.co/images/9/9e/Wows_flag_Pan_America.png', text: 'Pan America'}
};

export default class ShipIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            ship_id: '',
            windowwidth: window.innerWidth,
            icon_url: '',
            data: undefined,
            upgrades: [],
            modules_tag: ['artillery','dive_bomber','engine','fighter','fire_control','flight_control','hull','torpedo_bomber','torpedoes'],
            modules_data: [[],[],[],[],[],[],[],[],[]]
        };
        this.reloadData = this.reloadData.bind(this);
        this.getColorByValue = this.getColorByValue.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ship_id :nextProps.ship_id});
        this.reloadData(nextProps.ship_id);
    }

    componentDidMount(){
        this.reloadData(this.props.ship_id);
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    handleClick(e, titleProps) {
        const { index } = titleProps;
        const { activeIndex } = this.state;
        const newIndex = activeIndex === index ? -1 : index;
        this.setState({ activeIndex: newIndex })
    }

    async reloadData(ship_id){
        console.log(ship_id);
        await axios.get("https://api.worldofwarships.ru/wows/encyclopedia/ships/?application_id=" + application_id + "&language=en" + "&ship_id=" + ship_id)
            .then((response)=>{
                let key = Object.keys(response.data.data);
                this.setState({data: response.data.data[key[0]]});
                console.log(response.data.data[key[0]])
            });

        await axios.get("https://api.worldofwarships.ru/wows/encyclopedia/info/?application_id=" + application_id + "&language=en" + "&fields=ship_type_images")
            .then((response)=>{
                let icons = response.data.data.ship_type_images;
                let icon = this.state.data.is_premium ? icons[this.state.data.type].image_premium : icons[this.state.data.type].image;
                this.setState({icon_url: icon});
            });

        let upgrades_id = this.state.data.upgrades;
        axios.get("https://api.worldofwarships.ru/wows/encyclopedia/consumables/?application_id=" + application_id + "&language=en" + "&consumable_id=" + upgrades_id)
            .then((response)=>{
                let upg_data = Object.values(response.data.data);
                this.setState({upgrades: upg_data});
            });

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
        });
        Promise.all(modules_promise).then(values => {
            console.log(values);
            this.setState({modules_data: values});
        })
    }


    updateDimensions() {
        this.setState({ windowwidth: window.innerWidth});
    }


    getColorByValue(value) {
        if (value < 20){
            return 'red';
        }
        else if (value < 50){
            return 'yellow';
        }
        else if (value < 80){
            return 'olive';
        }
        else {
            return 'blue';
        }
    }

    render() {
        const { activeIndex } = this.state;
        const upgrades = this.state.upgrades.map((data, i) => {
            let list = Object.values(data.profile).map( (text, idx) =>  <List.Item key={idx}>{text.description}</List.Item>)
            return(
            <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                <Popup.Header>{data.name}</Popup.Header>
                <Popup.Content>
                    <p>{data.description}</p>
                    <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                    <List bulleted>
                        {list}
                    </List>
                </Popup.Content>
            </Popup>
        )});

        const engine = this.state.modules_data[0].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Max Speed: {data.profile.engine.max_speed} kts</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        const torp_bomber = this.state.modules_data[1].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Cruise Speed: {data.profile.torpedo_bomber.cruise_speed} kts</List.Item>
                            <List.Item>Aiming Distance: {data.profile.torpedo_bomber.distance} km</List.Item>
                            <List.Item>Torpedo Damage: {data.profile.torpedo_bomber.max_damage}</List.Item>
                            <List.Item>Torpedo Speed: {data.profile.torpedo_bomber.torpedo_max_speed}</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});


        const fighter = this.state.modules_data[2].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Cruise Speed: {data.profile.fighter.cruise_speed}</List.Item>
                            <List.Item>Max Health: {data.profile.fighter.max_health}</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        const hull = this.state.modules_data[3].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>AA Mounts: {data.profile.hull.anti_aircraft_barrels}</List.Item>
                            <List.Item>Secondary Guns: {data.profile.hull.atba_barrels}</List.Item>
                            <List.Item>Hit Points: {data.profile.hull.health}</List.Item>
                            <List.Item>Planes Amount: {data.profile.hull.planes_amount}</List.Item>
                            <List.Item>Torpedo Tubes: {data.profile.hull.torpedoes_barrels}</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        const artillery = this.state.modules_data[4].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Firing Rate: {data.profile.artillery.gun_rate} rounds/min</List.Item>
                            <List.Item>AP Damage: {data.profile.artillery.max_damage_AP}</List.Item>
                            <List.Item>HE Damage: {data.profile.artillery.max_damage_HE}</List.Item>
                            <List.Item>Rotation Time: {data.profile.artillery.rotation_time} s</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        const torpedoes = this.state.modules_data[5].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Range: {data.profile.torpedoes.distance}</List.Item>
                            <List.Item>Damage: {data.profile.torpedoes.max_damage}</List.Item>
                            <List.Item>Firing Rate: {data.profile.torpedoes.shot_speed} rounds/min</List.Item>
                            <List.Item>Torpedo Speed: {data.profile.torpedoes.torpedo_speed} kts</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        const fire_control = this.state.modules_data[6].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Firing Distance: {data.profile.fire_control.distance}</List.Item>
                            <List.Item>Firing Distance Increase: {data.profile.fire_control.distance_increase}%</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        const flight_control = this.state.modules_data[7].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Bomber Squadrons: {data.profile.flight_control.bomber_squadrons}</List.Item>
                            <List.Item>Fighter Squadrons: {data.profile.flight_control.fighter_squadrons}</List.Item>
                            <List.Item>Torpedo Squadrons: {data.profile.flight_control.torpedo_squadrons}</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        const dive_bomber = this.state.modules_data[8].map((data, i) => {
            return(
                <Popup key={i} as='span' trigger={<Image as='span' src={data.image}  />}>
                    <Popup.Header>{data.name}</Popup.Header>
                    <Popup.Content>
                        <p>{data.description}</p>
                        <p>Price in credits: {data.price_credit.toLocaleString()}</p>
                        <List bulleted>
                            <List.Item>Dispersion: {data.profile.dive_bomber.accuracy.min}-{data.profile.dive_bomber.accuracy.max} m </List.Item>
                            <List.Item>Burn Probability: {data.profile.dive_bomber.bomb_burn_probability}%</List.Item>
                            <List.Item>Cruise Speed: {data.profile.dive_bomber.cruise_speed}kts</List.Item>
                            <List.Item>Damage: {data.profile.dive_bomber.max_damage}</List.Item>
                            <List.Item>Hit Points: {data.profile.dive_bomber.max_health}</List.Item>
                        </List>
                    </Popup.Content>
                </Popup>
            )});

        if (this.state.data !== undefined ){
            const shell_detail = this.state.data.default_profile.artillery != undefined ? (
                <div>
                    <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Detailed shell information
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <Table celled structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell rowSpan='2'>Shell Type</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>Dispersion</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>Bullet Mass</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>Initial Speed</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>Burn Prob</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='2'>Damage</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>HE: {this.state.data.default_profile.artillery.shells.HE.name}</Table.Cell>
                                    <Table.Cell rowSpan='2'>{this.state.data.default_profile.artillery.max_dispersion}m</Table.Cell>
                                    <Table.Cell>{this.state.data.default_profile.artillery.shells.HE.bullet_mass}kg</Table.Cell>
                                    <Table.Cell>{this.state.data.default_profile.artillery.shells.HE.bullet_speed}m/s</Table.Cell>
                                    <Table.Cell>
                                        {this.state.data.default_profile.artillery.shells.HE.burn_probability}%
                                    </Table.Cell>
                                    <Table.Cell>{this.state.data.default_profile.artillery.shells.HE.damage}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell >AP: {this.state.data.default_profile.artillery.shells.AP.name}</Table.Cell>
                                    <Table.Cell>{this.state.data.default_profile.artillery.shells.AP.bullet_mass}kg</Table.Cell>
                                    <Table.Cell>{this.state.data.default_profile.artillery.shells.AP.bullet_speed}m/s</Table.Cell>
                                    <Table.Cell>
                                        <Icon color='red' name='close' size='large' />
                                    </Table.Cell>
                                    <Table.Cell>{this.state.data.default_profile.artillery.shells.AP.damage}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Accordion.Content>
                </div>
            ) : null;

            const atbas_detail = this.state.data.default_profile.atbas != undefined ? (
                <div>
                    <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
                        <Icon name='dropdown' />
                        Detailed secondary guns information
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 2}>
                        <Table celled structured>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Name</Table.HeaderCell>
                                    <Table.HeaderCell>Distance</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='1'>Bullet Mass</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='1'>Initial Speed</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='1'>Burn Prob</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='1'>Damage</Table.HeaderCell>
                                    <Table.HeaderCell rowSpan='1'>Reload</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {
                                    Object.values(this.state.data.default_profile.atbas.slots).map(slot => (
                                        <Table.Row>
                                            <Table.Cell>{slot.name}</Table.Cell>
                                            <Table.Cell>{this.state.data.default_profile.atbas.distance}km</Table.Cell>
                                            <Table.Cell>{slot.bullet_mass}kg</Table.Cell>
                                            <Table.Cell>{slot.bullet_speed}m/s</Table.Cell>
                                            <Table.Cell>{slot.burn_probability}%</Table.Cell>
                                            <Table.Cell>{slot.damage}</Table.Cell>
                                            <Table.Cell>{slot.shot_delay}s</Table.Cell>
                                        </Table.Row>
                                    ))
                                }


                            </Table.Body>
                        </Table>
                    </Accordion.Content>
                </div>
            ) : null;

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
                            <Header as='span' content={"Tier "+this.state.data.tier+" "+nationDict[this.state.data.nation].text+" "+this.state.data.type}
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
                            <Grid.Column width={this.state.windowwidth < 860 ? 16 : 10}>
                                <Header as="div" textAlign='left'>{this.state.data.description}</Header>
                            </Grid.Column>
                            <Grid.Column width={this.state.windowwidth < 860 ? 16 : 6}>
                                <Progress percent={this.state.data.default_profile.armour.total} size='small' progress color={this.getColorByValue(this.state.data.default_profile.armour.total)}>Survivability</Progress>
                                <Progress percent={this.state.data.default_profile.weaponry.artillery} size='small' progress color={this.getColorByValue(this.state.data.default_profile.weaponry.artillery)}>Artillery</Progress>
                                <Progress percent={this.state.data.default_profile.weaponry.anti_aircraft} size='small' progress color={this.getColorByValue(this.state.data.default_profile.weaponry.anti_aircraft)}>AA Defense</Progress>
                                <Progress percent={this.state.data.default_profile.mobility.total} size='small' progress color={this.getColorByValue(this.state.data.default_profile.mobility.total)}>Maneuverability</Progress>
                                <Progress percent={this.state.data.default_profile.concealment.total} size='small' progress color={this.getColorByValue(this.state.data.default_profile.concealment.total)}>Concealment</Progress>
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
                        {
                            this.state.windowwidth > 860 &&
                            <Accordion>
                                {shell_detail}
                                <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
                                    <Icon name='dropdown'/>
                                    Detailed hull information
                                </Accordion.Title>
                                <Accordion.Content active={activeIndex === 1}>
                                    <Table celled structured>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell rowSpan='2'>Max Speed</Table.HeaderCell>
                                                <Table.HeaderCell rowSpan='2'>Rudder Shiff Time</Table.HeaderCell>
                                                <Table.HeaderCell rowSpan='2'>Turning Radius</Table.HeaderCell>
                                                <Table.HeaderCell colSpan='2'>Detectability</Table.HeaderCell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.HeaderCell>By Ships</Table.HeaderCell>
                                                <Table.HeaderCell>By Planes</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>{this.state.data.default_profile.mobility.max_speed}kts</Table.Cell>
                                                <Table.Cell>{this.state.data.default_profile.mobility.rudder_time}s</Table.Cell>
                                                <Table.Cell>{this.state.data.default_profile.mobility.turning_radius}m</Table.Cell>
                                                <Table.Cell>{this.state.data.default_profile.concealment.detect_distance_by_ship}km</Table.Cell>
                                                <Table.Cell>{this.state.data.default_profile.concealment.detect_distance_by_plane}km</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Accordion.Content>
                                {atbas_detail}
                            </Accordion>
                        }
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
                        text
                        style={{
                            marginTop: '5em',
                        }}
                    >
                        <DiscussionThread ship_id={this.props.ship_id} ship_name={this.state.data.name}/>
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
