import React,{ Component } from 'react'
import './content.css'

const inititalState = {
  nombre: '',
  ci: "", 
  tiempo:"",
  sexo: "",
  iBOX: "",
  Request: false,
  Validation: false
}

class Content extends Component{
  constructor(){
    super();
    this.state = inititalState
  }

  onChangeField=(event)=>{
    const { id,value } = event.target
    switch (id) {
      case 'nombre':
        return this.setState({nombre: value})
      case 'ci':
        return this.setState({ci: value})
      case 'radioM':
        return this.setState({sexo: 'Hombre'})
      case 'radioF':
        return this.setState({sexo: 'Mujer'})
      case 'tiempo':
        return this.setState({tiempo: value})  
      default: 
    }
  }

  closeIBOX=(event)=>{
    const { iBOX,Request } = this.state 

    if(Request === 'succes!!'){
      document.getElementById('radioM').checked = ''
      document.getElementById('radioF').checked = ''
      this.setState(inititalState)
    }
    event.target.className === 'iBox' || event.target.className === 'close'
    ? this.setState({iBOX: '', Request: false})
    : this.setState({iBOX})
  }

  Validation =()=>{
    const { sexo,nombre,ci,tiempo }=this.state
    if (nombre !== "" && sexo !== "" && ci !== "" && tiempo !== "" ) {
      let ciN = String(Number(ci))
      if(ci.length !== 11 || ciN === 'NaN'){
        this.setState({Validation: 'ciFail'})
      } else {
        this.setState({Validation: 'on'})
      }
    } else {
      this.setState({Validation: false})
    }
  }

  onSendForm=()=>{
    this.setState({iBOX: "on"})
    const { sexo,nombre,ci,tiempo,Validation }=this.state
    if(Validation === 'on'){
      fetch('http://localhost:1270/Servicio',{
        method: 'post',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          nombre,ci,sexo,tiempo
        })
      })
      .then(res => res.json())
      .then(response => {
        if(response.errno){
          this.setState({Request: response})
        } else {
          this.setState({Request: 'succes!!'})
        }
      }).catch(error => {
        this.setState({Request: error})})         
    }
  }
  
  render(){
    const { iBOX,Request,Validation }=this.state
    const { nombre,ci,tiempo }=this.state

    return( 
      <div className={`content`}>
        <div className="table">
          <div className="title">
            <h2>Registrar Servicio</h2>
          </div>
          <input 
            type="text" 
            id="nombre" 
            placeholder="Nombre.." 
            onChange={this.onChangeField} 
            className='InputText'
            value={nombre}>
          </input>
          <input 
            type="text" 
            id="ci"  
            placeholder="C.Identidad.." 
            onChange={this.onChangeField} 
            className='InputText'
            value={ci}>
          </input>  
          <div style={{display:'flex', justifyContent:'space-around', alignItems:'center', width:'90%'}}>
            <label  id = 'sexoM' className='checkContainer'>Hombre
              <input onChange={this.onChangeField} type = "radio" id = "radioM" name="rSexo"></input>
              <span className = "radiobtn"></span>
            </label>
            <label  id = 'sexoF' className='checkContainer'>Mujer
              <input onChange={this.onChangeField} type = "radio" id = "radioF" name="rSexo"></input>
              <span className = "radiobtn"></span>
            </label>
          </div>
          <div style={{display: "flex", justifyContent:'space-between', height:'40px', marginTop:'10px'}}>
            <input 
              type="number" 
              id="tiempo" 
              placeholder="Tiempo/h" 
              onChange={this.onChangeField}
              value={tiempo}>
            </input>
            <input type="button" value="registrar" className="Bregistrar" onMouseEnter={this.Validation} onClick={this.onSendForm}></input>
          </div>
        </div>
        {iBOX === "on"
        ?(
          <div className={`iBox`} onClick={this.closeIBOX}>
            <div className="infoBox-content">
              <span className="close">&times;</span>
              {Validation === false
              ?<p>Fill all fields!!</p>
              :Validation === 'ciFail'
                ?<p>The CI must to be a number of 11 units!!</p>
                :(!Request 
                ?(<div className='loading'><div className="loader"></div><p>Sending request...</p></div>)
                :(Request.errno
                  ?<p>Request unavailable...!!</p>
                  :(Request !== 'succes!!'
                  ?<p>Something went wrong.. Check the server!!!</p>
                  :<p>Succes...!</p>)))}
            </div>
          </div>
        ): <div></div>
        }
      </div>
    );
  }
}
export default Content