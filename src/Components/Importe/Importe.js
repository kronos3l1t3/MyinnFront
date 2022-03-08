import React, { Component } from 'react'
import './style.css'

class Importe extends Component {
  constructor(){
    super()
    this.state = {
      lastServices: [],
      Service: "",
      err: true
    }
  }

  componentDidMount(){
    fetch('http://localhost:1270/servicios')
    .then(response => response.json())
    .then(data => {
      let a = data.reverse().splice(0,5)
      if(a.length > 0){
        return this.setState({
          lastServices: a,
          Service: a[0].IDServicio, 
          err: false})
      }
    })
  }

  cal=()=>{
    const get = x => Number(document.getElementById(x).value)
    const Cerveza = get('Cerveza')*get('Vcerveza'), 
    Refresco = get('Refresco')*get('Vrefresco'),
    Malta = get('Malta')*get('Vmalta'),
    Jugo = get('Jugo')*get('Vjugo'),
    IExtra = get('IExtra'),
    Tiempo = get('Tiempo')*get('Vtiempo')

    return Cerveza+Refresco+Malta+Jugo+IExtra+Tiempo
  }

  modificar=()=>{
    fetch('http://localhost:1270/importe',{
      method: 'put',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({importe: this.cal(), key: this.state.Service})
    })
    .then(res => document.getElementById('MODB').value = "Hecho")
  }

  calculo=event=>{
    const importe = this.cal()
    return event.target.value = `${importe} cuc`
  }

  sel=(event)=>{
    return this.setState({Service: this.state.lastServices[event.target.value].IDServicio})
  }

  lastServices =()=>{
    const { lastServices,err } = this.state

    if (err === false) {
      const options = lastServices.map((val, i)=>{
        return <option key={`So1-${i}`} value={`${i}`}>{`${val.IDServicio}-${val.Nombre}`}</option>
      })
      return options
    } else if(lastServices.length === 0){
      return <option>No hay servicios</option>
    } else {
      return <option>Check the Server</option>
    }
  }

  render(){
    return(
      <div className='content'>
        <div className='table Import'>
          <div className='title'>
            <h2>Importe</h2>
          </div>
          <div className='SEL'>
            <select id='selectSer' onChange={this.sel}>
              {this.lastServices()}
            </select>
          </div>
          <div className='PP'>
            <input type='number' id='Tiempo' placeholder='Tiempo'></input>
            <div className='value'><input type='number' id='Vtiempo' defaultValue='5.00' ></input></div>
          </div>
          <div className='PP'>
            <input type='number' id='Cerveza' placeholder='Cerveza'></input>
            <div className='value'><input type='number' id='Vcerveza' defaultValue='2.00' ></input></div>
          </div>
          <div className='PP'>
            <input type='number' id='Malta' placeholder='Malta'></input>
            <div className='value'><input type='number' id='Vmalta' defaultValue='1.50' ></input></div>
          </div>
          <div className='PP'>
            <input type='number' id='Jugo' placeholder='Jugo'></input>
            <div className='value'><input type='number' id='Vjugo' defaultValue='1.50' ></input></div>
          </div>
          <div className='PP'>
            <input type='number' id='Refresco' placeholder='Refresco'></input>
            <div className='value'><input type='number' id='Vrefresco' defaultValue='1.00' ></input></div>
          </div>
          <div className='PP'>
            <input type='number' id='IExtra' placeholder='Importe Extra'></input>
          </div>
          <div className='PP B'>
            <input type='button' 
              defaultValue='Cálculo' 
              className='Bregistrar'
              onClick={this.calculo}></input>
            <input type='button' 
              defaultValue='Modificar' 
              className='Bregistrar'
              id='MODB'
              onClick={this.modificar}></input>
          </div>
        </div>
      </div>
    )
  }
}

export default Importe