import React, { Component } from 'react'
import { connect } from 'react-redux';
import { connectionChanged } from '../store/redux';
import Login from './Login'
import logo from '../assets/logo.png'

class App extends Component {
  // Monitor connection status to the Hoodie store
  componentDidMount() {
    const { connectionStatus } = this.props.hoodie
    connectionStatus.startChecking({interval: 3000})
    connectionStatus.on('disconnect', () => { this.props.updateStatus(false) })
    connectionStatus.on('reconnect', () => { this.props.updateStatus(true) })
  }

  render() {
    const { account, status } = this.props
    return (
      <div className="App">
        <div className="header">
          <div className={`status ${status ? 'on' : 'off'}`}>
            {status ? 'Connected' : 'Disconnected'}
          </div>
          <img src={logo} className="logo" alt="logo" />
          <h2>Hoodie Notes</h2>
        </div>
        { account ? null : <Login /> }
      </div>
    );
  }
}

const mapStateToProps = ({ account, hoodie, status }) =>
  ({ account, hoodie, status })

const mapDispatchToProps = dispatch => ({
  updateStatus: (newStatus) => dispatch(connectionChanged(newStatus))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
