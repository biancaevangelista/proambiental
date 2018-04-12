import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { auth } from './base'

class LoginPage extends Component {
  constructor(props) {
    super(props)

    this.email = null
    this.passwd = null

    this.state = {
      isLogging: false,
      isLoggedIn: false,
      error: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({ isLogging: true })
    auth
      .signInWithEmailAndPassword(this.email.value, this.passwd.value)
      .then((user) => {
        this.setState({
          isLoggedIn: true
        })
      })
      .catch((error) => {
        this.setState({
          error: true,
          isLogging: false
        })
      })
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to='/admin' />
    }

    return (
      <div>
        <div className='header-container flex row center-center full-view' >
          <div className="card login flex column justify-center">
            <h1>Login</h1>
            <div className='input-wrapper'>
              <input ref={ref => this.email = ref} id='email' type='text' required={true} />
              <label htmlFor='email'>E-mail</label>
              <span className='line'></span>
            </div>
            <div className='input-wrapper'>
              <input ref={ref => this.passwd = ref} id='pass' type='password' required={true} />
              <label htmlFor='pass'>Senha</label>
              <span className='line'></span>
            </div>

            {this.state.error && <p>Usuário e/ou senha inválido(s)!</p>}

            <button onClick={this.handleClick}>Acessar</button>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage