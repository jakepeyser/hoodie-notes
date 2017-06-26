import React, { Component } from 'react'
import { connect } from 'react-redux';
import { checkUser, logout, connectionChanged } from '../store/redux';
import Login from './Login'
import Notes from './Notes'
import logo from '../assets/logo.png'

class App extends Component {
  // Check if user is logged in
  componentWillMount() {
    this.props.checkUser()
  }

  // Monitor connection status to the Hoodie store
  componentDidMount() {
    const { connectionStatus } = this.props.hoodie
    connectionStatus.startChecking({interval: 3000})
    connectionStatus.on('disconnect', () => { this.props.updateStatus(false) })
    connectionStatus.on('reconnect', () => { this.props.updateStatus(true) })
  }

  render() {
    const { account, status, logout } = this.props
    return (
      <div className="App">
        <div className="header">
          <div className={`status ${status ? 'on' : 'off'}`}>
            {status ? 'Connected' : 'Disconnected'}
          </div>
          { account &&
            <div className="account-info">
              <span> Logged in as <span>{ account.username }</span></span>
              <button onClick={ logout }>Logout</button>
            </div>
          }
          <img src={logo} className="logo" alt="logo" />
          <h2>Hoodie Notes</h2>
        </div>
        { account ? <Notes /> : <Login /> }
      </div>
    );
  }
}

const mapStateToProps = ({ account, hoodie, status }) =>
  ({ account, hoodie, status })

const mapDispatchToProps = dispatch => ({
  checkUser: () => dispatch(checkUser()),
  logout: () => dispatch(logout()),
  updateStatus: newStatus => dispatch(connectionChanged(newStatus))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
