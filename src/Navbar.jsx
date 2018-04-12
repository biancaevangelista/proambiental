import React from 'react';
import { NavLink } from 'react-router-dom'

const Navibar = () => {
  return (
    <nav className='navbar flex row vertical-align-row'>
      <NavLink to='/' exact={ true } className={ `link` }>
        <div className='brand'>
          <h1>PRO<span className='title'>Ambiental</span></h1>
          <h5>PROGRAMA INTERNO DE LICENCIAMENTO AMBIENTAL</h5>
        </div>
      </NavLink>
      <div className='navigation right'>
        <NavLink to='/sobre' className={ `link` }>
          Sobre
        </NavLink>
        <NavLink to='/login' className={ `link` }>
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navibar;