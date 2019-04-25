import React, { Component } from 'react'
import {
    Button,
    Container,
    Divider,
    Header,
    Icon,
    Segment,
    Image,
} from 'semantic-ui-react'
import axios from 'axios';
import { Link } from "react-router-dom";
import logo from '../assets/wows-icon.png'
import './index.scss'
const application_id = "0cd78ed96029eac1bcb73c22e7dd0456";

class IndexPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            version: '',
        }
    }
    componentDidMount() {
        document.title = "USS Illini mkII";
        axios.get("https://api.worldofwarships.ru/wows/encyclopedia/info/?application_id=" + application_id + "&language=en&fields=game_version")
            .then((response)=>{
                this.setState({version : response.data.data.game_version})
            })
    }

    render() {
        return (
            <div>
                <Segment inverted textAlign='center' vertical>
                    <Header className="title" as='h1' inverted>
                        <Image avatar src={logo} size='large' verticalAlign='middle'/>
                        <span>USS illini mkII</span>
                    </Header>
                    <Container className="index" text>
                        <Header as='h2' inverted>
                            A wiki site for World of Warships
                        </Header>
                        <Divider/>
                        <Header as='h2' inverted>
                            Game Version: {this.state.version}
                        </Header>
                    </Container>
                    <Link to={'/player'}>
                        <Button primary>
                            Get Started
                            <Icon name='right arrow' />
                        </Button>
                    </Link>
                </Segment>

            </div>
        );
    }
}

export default IndexPage;