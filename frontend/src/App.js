import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import IndexPage from './IndexPage/IndexPage'
import { HashRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <div>
                  <Route path={"/"} exact component={IndexPage} />
                  <Route path={"/home"} component={Home} />
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
