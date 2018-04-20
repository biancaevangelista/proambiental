import React, { Component } from 'react'

import './proprietario.css'
import { base } from './base'

class ListProprietario extends Component {

  constructor( props ) {
    super( props )

    this.state = {
      proprietarios: {}
    }

    this.listItem = this.listItem.bind( this )
  }

  componentDidMount() {
    base.syncState( 'proprietarios', {
      context: this,
      state: 'proprietarios',
      asArray: true
    })
  }

  listItem(key, proprietario) {
    return (
      <div key={ key } className='card'>
        <p className='card-title'>{ proprietario.nome_razao }</p>
        <p className='card-subtitle'>{ proprietario.cpf_cnpj }</p>
      </div>
    )
  }

  render() {
    return (
      <div className='list-wrapper'>
        { Object
          .keys( this.state.proprietarios )
          .map( key =>  this.listItem( key, this.state.proprietarios[key] )) }
      </div>
    )
  }
}

export default ListProprietario