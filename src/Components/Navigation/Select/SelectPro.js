import React,{ Component } from 'react'
import './style.css'
import { connect } from 'react-redux';

import { getData } from '../../Consultas/action'
import { selectTable } from './action'

const states = state =>({
  req: state.Rtables.ReqPending,
  err: state.Rtables.error,
  selected: state.Rselect.selected
})

const actions = dispatch =>({
  getData: () => dispatch(getData()),
  changeTableSelected: (x) => dispatch(selectTable(x))
})

class SelectPro extends Component {
  constructor(){
    super();
    this.state = {
      Display:'',
    }
  }
  
  renderItems=()=>{
    const { Items } = this.props
    const itm = Items.map( (item,i) => {
      if(Items.length === i+1){
        return <div className={`Item end ${this.state.Display}`} key={i} onClick={()=>this.props.changeTableSelected(item)}>{item}</div>
      }else{
        return <div className={`Item ${this.state.Display}`} key={i} onClick={()=>this.props.changeTableSelected(item)}>{item}</div>
      }
    })
    return itm
  }

  clickOut=()=>{
    document.removeEventListener("click", this.clickOut);
    return this.setState({Display: ''})
  }

  displayOptions=(event)=>{
    const ETId = event.target.id
    if(ETId !== 'searchButton' && ETId !== 'checkReq'){
      document.addEventListener("click", this.clickOut)
      return this.setState({Display:'on'})
    }
  }

  render(){
    const { err,req } = this.props

    return(
      <div className={`selectContainer ${this.props.sbar}`}>
        <div      
          className={`ItemSelected ${this.state.Display}`}
          onClick={this.displayOptions}>
          {this.props.selected}
          <div className='searchButton' id='searchButton' onClick={this.props.getData}>
            {req ? <div className='check reqPending' id='checkReq'></div>
            :err ? <div className='check err' id='checkReq'></div>
            :<div className='check done' id='checkReq'></div>
            }
          </div>
        </div>
        <div 
          className={`ItemContainer ${this.state.Display}`}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}

export default connect(states,actions)(SelectPro)