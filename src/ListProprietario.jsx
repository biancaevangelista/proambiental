import React, { Component } from 'react'

import './proprietario.css'
import { base } from './base'
import InputField from './InputField'

class ListProprietario extends Component {

  constructor(props) {
    super(props)
    this.nome_razao = null
    this.cpf_cnpj = null

    this.state = {
      proprietarios: {},
      isUpdating: false,
      key: null,
      handle: this.handleSave
    }

    this.listItem = this.listItem.bind(this)
    this.getProprietario = this.getProprietario.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    this.ref = base.syncState('proprietarios', {
      context: this,
      state: 'proprietarios',
      asArray: false,
      queries: {
        orderByChild: 'nome_razao',
        // limitToFirst: 3
      }
    })
  }

  handleRemove(key) {
    this.ref = base.remove('proprietarios/' + key, error => {
      console.log(error)
    })
  }

  getProprietario(key) {
    base.fetch('proprietarios/' + key, {
      context: this,
      asArray: false
    }).then(data => {
      this.nome_razao.value = data.nome_razao
      this.cpf_cnpj.value = data.cpf_cnpj
      this.setState({
        isUpdating: true,
        key,
        handle: this.handleUpdate
      })
    }).catch(error => {
      console.log(error)
    })
  }

  handleUpdate(event) {
    event.preventDefault()
    const nome_razao = this.nome_razao.value
    const cpf_cnpj = this.cpf_cnpj.value

    base.update('proprietarios/' + this.state.key, {
      data: { nome_razao, cpf_cnpj },
      then: error => {
        if (!error) {
          this.nome_razao.value = ''
          this.cpf_cnpj.value = ''
          this.nome_razao.focus()
          this.setState({
            isUpdating: false,
            key: null
          })
        }
      }
    })
  }

  listItem(key, proprietario) {
    return (
      <div key={key} className='flex row card center-center'>
        <div className='grow-1'>
          <h3 className='card-title'>{proprietario.nome_razao}</h3>
          <h5 className='card-subtitle'>{proprietario.cpf_cnpj}</h5>
        </div>
        <div>
          <button className='ti-trash icon icon-size-2 font-red button-clear' onClick={() => this.handleRemove(key)}></button>
          <button className='ti-pencil-alt icon icon-size-2 font-blue button-clear' onClick={() => this.getProprietario(key)}></button>
        </div>
      </div>
    )
  }

  handleSave(event) {
    event.preventDefault()
    const nome_razao = this.nome_razao.value
    const cpf_cnpj = this.cpf_cnpj.value

    const ref = base.push('proprietarios',
      {
        data: { nome_razao, cpf_cnpj },
        then: error => {
          if (!error) {
            this.nome_razao.value = ''
            this.cpf_cnpj.value = ''
            this.nome_razao.focus()
          }
        }
      })
  }

  componentWillUnmount = () => {
    base.removeBinding(this.ref)
  }

  render() {
    return (
      <div className='flex row'>
        <form onSubmit={this.state.handle} className='flex column vertical-align-row form-wrapper'>
          <InputField refValue={ref => this.nome_razao = ref} idValue='nome_razao' typeValue='text' requiredValue={true} labelText='Nome / Razão Social' spanWidth='120px' />
          <InputField refValue={ref => this.cpf_cnpj = ref} idValue='cpf_cnpj' typeValue='text' requiredValue={true} labelText='CPF / CNPJ' spanWidth='80px' />
          {this.state.isUpdating === false ? <button className='btn btn-primary' type='submit'><i className='ti-save icon'></i> Salvar novo proprietário</button> : <button className='btn btn-warning' type='submit'><i className='ti-save icon'></i> Alterar proprietário</button>}

        </form>
        <div className='flex column vertical-align-row list-wrapper'>
          {Object
            .keys(this.state.proprietarios)
            .map(key => this.listItem(key, this.state.proprietarios[key]))}
        </div>
      </div>
    )
  }
}

export default ListProprietario
