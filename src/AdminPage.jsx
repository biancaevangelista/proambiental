import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import { auth } from './base'

class AdminPage extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      isAuthing: true,
      isLoggedIn: false,
      user: null
    }

    this.handleExit = this.handleExit.bind( this )
  }

  componentDidMount() {
    auth.onAuthStateChanged( user => {
      
        this.setState({
          isAuthing: false,
          isLoggedIn: !!user,
          user: user
        })
      
    })
  }

  handleExit() {
    auth.signOut().then( () => {
      console.log('log out')
    }).catch( (error) => {
      console.log(error)
    });
  }

  render() {
    if( this.state.isAuthing ) {
      return <p>Aguarde...</p>
    }

    if( !this.state.isLoggedIn ) {
      console.log( this.state.user )
      return <Redirect to='/login' />
    }

    return(
      <div>
        <h1>Admin Page</h1>
        <h1>Bem-vindo</h1>

        <button onClick={ this.handleExit }>Sair</button>
      </div>
    )
  }
}

export default AdminPage