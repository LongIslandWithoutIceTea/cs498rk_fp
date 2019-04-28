import React, { Component } from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import IndexPage from './IndexPage/IndexPage'
import Player from './Player/PlayerIndex/PlayerHeader.js'
import Clan from './Clan/ClanIndex/ClanHeader'
import Login from './User/Login.js'
import Register from './User/Register.js'
import Ship from './Ship/ShipIndex/ShipHeader.js'
import { HashRouter as Router, Route } from "react-router-dom";
import UserIndex from './User/UserIndex.js';


class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
                  <Route path={"/"} exact component={IndexPage} />
                  <Route path={"/ship"} exact
                         component={() => <Ship/>}  />
                  <Route path={"/player"} exact
                         component={() => <Player/>}  />
                  <Route path={"/clan"} exact
                          component={() => <Clan/>}  />
                  <Route path={"/login"} exact
                         component={() => <Login/>}  />
                  <Route path={"/register"} exact
                        component={() => <Register/>}  />
                  <Route path={"/user"} exact
                        component={() => <UserIndex/>}  />

              </div>
          </Router>
      </div>
    );
  }
}

export default App;
