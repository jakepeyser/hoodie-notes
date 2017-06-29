import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, login } from '../store/reducers/user';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: ''
    }
    this.login = this.login.bind(this)
  }

  // Create a new user in Hoodie
  login(newUser) {
    const { login, createUser } = this.props
    const { username, password } = this.state

    if (username && password) {
      const loginFunc = newUser ? createUser : login
      loginFunc(username, password, err => {
        if (err) this.setState({ error: err.message })
      })
    } else {
      this.setState({ error: 'You must input a username and password' })
    }
  }

  updateForm(field, val) {
    this.setState({ [field]: val })
  }

  render() {
    const { error } = this.state
    return (
      <div className="login">
        <input type="text"
          onChange={ evt => this.updateForm('username', evt.target.value) }
          placeholder="Username"
        />
        <input type="password"
          onChange={ evt => this.updateForm('password', evt.target.value) }
          placeholder="Password"
        />
        { error && <span className="error">{ error }</span> }
        <div className="login-buttons">
          <button onClick={ () => this.login(true) }>Create Account</button>
          <button onClick={ () => this.login() }>Login</button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createUser: (username, password, cb) => dispatch(createUser(username, password, cb)),
  login: (username, password, cb) => dispatch(login(username, password, cb))
})

export default connect(null, mapDispatchToProps)(Login)
