import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import IndexPage from './IndexPage/IndexPage'
import Player from './Player/PlayerIndex/PlayerHeader'
import { HashRouter as Router, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
                  <Route path={"/"} exact component={IndexPage} />
                  <Route path={"/player"} exact
                         component={() => <Player/>}  />
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
