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
import logo from '../assets/Chaldea_white.png'
import background from '../assets/LostbeltPoster.jpg'
import './index.scss'

class IndexPage extends Component {
    componentDidMount() {
        document.title = "Chaldea Wiki";
    }

    render() {
        return (
            <div>
                <Segment inverted textAlign='center' vertical>
                    <Header className="title" as='h1' inverted>
                        <Image avatar src={logo} size='big' verticalAlign='middle'/>
                        <span>Chaldea Wikia</span>
                    </Header>
                    <Container className="index" text>
                        <Header as='h2' inverted>
                            A wiki site for Fate/Grand Order
                        </Header>
                        <Divider/>
                    </Container>
                    <Button primary>Start</Button>
                </Segment>

                <Image src={background} fluid verticalAlign='middle'/>
            </div>
        );
    }
}

export default IndexPage;