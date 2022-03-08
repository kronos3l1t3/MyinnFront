import { FETCH_TABLES, FILTER_ROW } from './constants'

export const getData=()=>(dispatch)=>{
  dispatch({type: FETCH_TABLES.PENDING})
  fetch('http://localhost:1270/clientes')
    .then(data => data.json())
    .then(clientes => {
      fetch('http://localhost:1270/servicios')
        .then(data => data.json())
        .then(servicios => dispatch({type: FETCH_TABLES.SUCCESS, payload:{clientes,servicios}}))
        .catch(() => dispatch({type: FETCH_TABLES.FAILED, payload: true}))
  })
  .catch(() => dispatch({type: FETCH_TABLES.FAILED, payload: true}))  
}

export const filterRow = (event,tabla) =>({
  type: FILTER_ROW,
  payload: [tabla,event.target.placeholder,event.target.value]
})