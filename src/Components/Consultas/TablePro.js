import React,{ Component } from 'react'
import EditBox from './EditBox'
import './style.css'
import { connect } from 'react-redux'
import { filterRow } from './action'

const state = state =>({
  table: state.Rselect.selected
})

const dispatch = dispatch =>({
  filterRow: (event,tabla)=>dispatch(filterRow(event,tabla)),
})

class TablePro extends Component{

  setHeaderinput=()=>{
    const { col,filterRow,table } = this.props
    const x = col.map((field,i)=>{
    return <input type='text' key={`th ${i}`} className='IHF' placeholder={field} onChange={(x)=>filterRow(x,table)}></input>
    })
    return x
  }
  setHeader=()=>{
    const { col } = this.props
    const x = col.map((field,i)=>{
      return <th key={`th ${i}`} className='headTH'>{field}</th>
    })
    return x
  }

  componentDidMount(){
    
  }

  render(){
    return(
      <div className='contentTable'>
        <div className='searchRow'>
          {this.setHeaderinput()}
        </div>
        <div className='Tble'>
          <table>
            <thead>
              <tr>
                <th></th>
                {this.setHeader()}
              </tr>
            </thead>
            <tbody>
              {this.props.body()}
            </tbody>
          </table>
        </div>
        <EditBox/>
      </div>
    )
  }
}
export default connect(state,dispatch)(TablePro)