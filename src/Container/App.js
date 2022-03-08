import React, { Component } from "react";
import { connect } from "react-redux";
import Navigation from "../Components/Navigation/navigation";
import Registro from "../Components/Registro/Registro";
import Importe from '../Components/Importe/Importe'
import TablePro from "../Components/Consultas/TablePro"
import './app.css';

import { setContentClient,setContentService } from '../Components/Consultas/Tablas/action'

import { ShowSidebar,setPath } from "../Components/Navigation/actions";

const mapStateToProps = state =>({
    sidebar: state.Rsidebar.sidebar,
    path: state.Rpath.path,
    selected: state.Rselect.selected,
    clientes: state.Rtables.clientesF,
    servicios: state.Rtables.serviciosF,
})

const mapDispatchToProps = dispatch =>({
  onClickMenuButton: () => dispatch(ShowSidebar()),
  setChangePath: (event) => dispatch(setPath(event))
})

class App extends Component {
  render(){
    const { sidebar,onClickMenuButton,onChangeField,path,setChangePath } = this.props
    return(
      <div>
        <Navigation prop={{sidebar,onClickMenuButton,setChangePath,path}}/>
        <div className={`full ${sidebar}`} id='full'>
          {path === "REGISTRO" 
          ?<Registro change={onChangeField}/>
          :path === 'CONSULTA'
            ?(this.props.selected === 'Servicios'
              ?<TablePro 
              col={['ID','Nombre','Sexo','CI','Fecha',`Tiempo/h`,`I.Total/cuc`]}
              body={()=>setContentService(this.props.servicios)}/>
              :<TablePro 
              col={['CI','Nombre','Sexo','Entradas']}
              body={()=>setContentClient(this.props.clientes)}/>)
            :<Importe/> 
          }
        </div>
      </div>
    )
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);