import React, { Component } from 'react'
import { connect } from 'react-redux';
import Login from './Login'
import logo from '../assets/logo.png'

class App extends Component {
  render() {
    const { account } = this.props
    return (
      <div className="App">
        <div className="header">
          <img src={logo} className="logo" alt="logo" />
          <h2>Hoodie Notes</h2>
        </div>
        { account ? null : <Login /> }
      </div>
    );
  }
}

const mapStateToProps = ({ account }) => ({ account })

export default connect(mapStateToProps)(App)
