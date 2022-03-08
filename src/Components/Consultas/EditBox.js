import React, { Component } from 'react'
import './style.css'
import { connect } from 'react-redux'

const mapStateToProps = state =>({
  table: state.Rselect.selected
})

const mapDispatchToProps = dispatch =>({})

class EditBox extends Component{
  constructor(){
    super();
    this.state = {
      key: '',
      nombre: '',
      ci: '',
      sexo: '',
      tiempo: '',
      importe: '',
      Validation: '',
    }
  }

  delete = () =>{
    const { key } = this.state
    fetch(`http://localhost:1270/del/${this.props.table}`,{
      method: 'delete',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({key})
    }).catch(console.log)
    document.getElementById('editBox').style.display = 'none'
  }
 
  confirmation = (E) =>{
    const get =(id)=> document.getElementById(id)
    this.setState({key: get('RowSelected').innerHTML})
    let nombre = get('Enombre').value
    let ci = get('Eci').value
    let tiempo = 1
    let Itotal = 1

    if(this.props.table === 'Servicios'){
      tiempo = get('Etiempo').value
      Itotal = get('EITotal').value
    }

    if(nombre !== '' && ci !== '' && tiempo !== '' && Itotal !== ''){
      if(ci.length !== 11 || String(Number(ci)) === 'NaN'){
        this.setState({Validation: 'ciFail'})
      } else {
        this.setState({Validation: 'ok'})
        }
      } else {
        this.setState({Validation: false})
    }
    
    if(E.target.value === "Modificar"){
      this.setState({nombre: nombre})
      this.setState({ci: ci})

      if(this.props.table === 'Servicios'){
        this.setState({tiempo: tiempo})
        this.setState({importe: Itotal})
      }
      if(get('radioM').checked){
        this.setState({sexo: 'Hombre'})
      } else {
        this.setState({sexo: 'Mujer'})
      }
    }
  }

  cnfText =(event)=>{
    const { Validation } = this.state

    if(Validation === false){
      event.target.value = 'NOP'
    } else if(Validation === 'ciFail'){
      event.target.value = 'NOP->CI'
    }

  }

  edit = () =>{
    const { state } = this
    const get = id => document.getElementById(id)

    if(state.Validation === 'ok'){
      fetch(`http://localhost:1270/edit/${this.props.table}`,{
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(state) 
      }).catch(console.log)
      get('editBox').style.display = 'none'
    } 
  }

  close=(event)=>{
    const target = event.target.className
    if(target === 'iBox' || target === 'close'){
      document.getElementById('editBox').style.display = 'none'
    }
  }

  render(){
    return(
      <div className='iBox' id='editBox' onClick={this.close}>
        <div className="infoBox-content E">
          <span className="close">&times;</span>
          <p>Key: <span id='RowSelected'></span></p>
          <div>
            <input 
              type="text" 
              id="Enombre" 
              className='InputText'>
            </input>
            <input 
              type="text" 
              id="Eci"  
              className='InputText'>
            </input>  
            <div style={{display:'flex', 
                        justifyContent:'space-around', 
                        alignItems:'center'}}>
              <label className='checkContainer E'>Hombre
                <input type = "radio" id = "radioM" name="rSexo"></input>
                <span className = "radiobtn E"></span>
              </label>
              <label className='checkContainer E'>Mujer
                <input type = "radio" id = "radioF" name="rSexo"></input>
                <span className = "radiobtn E"></span>
              </label>
            </div>
            {this.props.table === 'Servicios'
            ?<div>
              <div style={{display:'flex', 
                          justifyContent:'space-around', 
                          alignItems:'center'}}>
                <input 
                  type="number" 
                  id="Etiempo">  
                </input>
                <input 
                  type="number" 
                  id="EITotal">  
                </input>
              </div>
            </div>
            :<div></div>
          }
          <div className='divButton'>
            <input type="button" value="Eliminar" 
              className="Bregistrar EB" 
              onMouseEnter={this.confirmation}
              onDoubleClick={this.delete}></input>
            <input type="button" value="Modificar" 
              id = "BReg"
              className="Bregistrar MB" 
              onMouseOver={this.cnfText}
              onMouseEnter={this.confirmation}
              onClick={this.edit}></input>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditBox)