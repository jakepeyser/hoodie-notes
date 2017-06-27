import React from 'react'
import logo from '../assets/logo.png'

const Header = ({ online, username, handleLogout }) =>
  <div className="header">
    <div className={`status ${online ? 'on' : 'off'}`}>
      {online ? 'Connected' : 'Disconnected'}
    </div>
    { username &&
      <div className="account-info">
        <span> Logged in as <span>{ username }</span></span>
        <button onClick={ handleLogout }>Logout</button>
      </div>
    }
    <img src={logo} className="logo" alt="logo" />
    <h2>Hoodie Notes</h2>
  </div>

export default Header
