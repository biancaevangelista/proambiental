import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'
import Navbar from './Navbar'
import MainPage from './MainPage'
import AboutPage from './AboutPage'
import LoginPage from './LoginPage'
import AdminPage from './AdminPage'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <header className='main-header fixed flex column'>
            <Navbar />
          </header>
            <Switch>
              <Route exact={true} path='/' component={MainPage} />
              <Route path='/sobre' component={ AboutPage } />
              <Route path='/login' component={ LoginPage } />
              <Route path='/admin' component={ AdminPage } />
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
