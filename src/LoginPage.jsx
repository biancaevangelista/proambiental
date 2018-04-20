import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { auth } from './base'
import Navbar from './Navbar'
import './login.css'

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

    this.removeAuth = auth.onAuthStateChanged( user => {
      if( user ) {
        this.setState({
          isLoggedIn: true
        })
      }
    })

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.setState({ isLogging: true, error: false })
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

  componentWillUnmount() {
    this.removeAuth()
  }

  render() {
    if (this.state.isLoggedIn) {
      return <Redirect to='/admin' />
    }

    return (
      <div>
        <Navbar />
        <div className='header-container flex row center-center full-view' >
          <form onSubmit={this.handleClick} className="login-wrapper login flex column justify-center">
            
              <div className='brand-login'>
                <h1>PRO<span className='title'>Ambiental</span></h1>
                <h5>PROGRAMA INTERNO DE LICENCIAMENTO AMBIENTAL</h5>
              </div>
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

              <button disabled={ this.state.isLogging } type='submit'>Acessar</button>
            
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage