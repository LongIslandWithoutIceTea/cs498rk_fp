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
import logo from '../assets/wows-icon.png'
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
                        <Image avatar src={logo} size='large' verticalAlign='middle'/>
                        <span>USS illini mkII</span>
                    </Header>
                    <Container className="index" text>
                        <Header as='h2' inverted>
                            A wiki site for World of Warships
                        </Header>
                        <Divider/>
                    </Container>
                    <Button primary>Start<Icon name='right arrow' /></Button>
                </Segment>

            </div>
        );
    }
}

export default IndexPage;