import React from 'react'

import Navbar from './Navbar'

const MainPage = props => {
  return (
    <div>
      <Navbar />
      <div className='header-container flex row center-center full-view' >
        <h1>Seja bem-vindo!</h1>
      </div>
      <p>teste</p>
    </div>
  )
}

export default MainPage