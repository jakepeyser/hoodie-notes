import React, { Component } from 'react'
import { connect } from 'react-redux'
import { checkUser, logout } from '../store/reducers/user'
import { connectionChanged } from '../store/reducers/connection'
import Header from './Header'
import Login from './Login'
import Notes from './Notes'

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
        <Header
          online={ status }
          username={ account && account.username }
          handleLogout={ logout }
        />
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
