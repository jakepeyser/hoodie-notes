import React, { Component } from 'react';
import logo from '../assets/logo.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2>Hoodie Notes</h2>
        </div>
        <p className="intro">
          Hello world!
        </p>
      </div>
    );
  }
}

export default App;
