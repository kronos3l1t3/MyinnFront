import React,{Component} from "react";
import './style.css'
import SelectPro from './Select/SelectPro'
import logo from './logo.png'

class Navigation extends Component{
  render(){
    const { sidebar,onClickMenuButton,setChangePath,path } = this.props.prop
    return (
      <div>
        <div className={`logobar`}>
          <img alt="logo" src={logo} className="logo"></img>
          <div className={`MenuButton ${sidebar}`} onClick={onClickMenuButton}>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </div>
          {path === "CONSULTA"
          ?<SelectPro Items={['Servicios','Clientes']} sbar={sidebar}/>
          :<div></div>}
        </div>
        <div className={`sidenav ${sidebar}`}>
        <button id="REGISTRO" onClick={setChangePath}>Registro</button>
        <button id="CONSULTA" onClick={setChangePath}>Consulta</button>
        <button id="IMPORTE" onClick={setChangePath}>Importe</button>
      </div>
    </div>
    )
  }
}

export default Navigation;