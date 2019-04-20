import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import IndexPage from './IndexPage/IndexPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <IndexPage/>
      </div>
    );
  }
}

export default App;
