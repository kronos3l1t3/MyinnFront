import { FETCH_TABLES, FILTER_ROW} from './constants'

const initialStateTable = {
  ReqPending: false,
  clientes:[],
  servicios:[],
  clientesF:[],
  serviciosF:[],
  error: false
}

export const Rtables =(state=initialStateTable, action={})=>{
  switch (action.type) {
    case FETCH_TABLES.PENDING:
      return Object.assign({}, state, {ReqPending: true})
    case FETCH_TABLES.SUCCESS:
      let clie = action.payload.clientes.reverse()
      let ser = action.payload.servicios.reverse()
      let FilterInput = document.getElementsByClassName('IHF'), i = 0
      while (i < FilterInput.length) {
        FilterInput[i].value = ''
        i++
      }

      return Object.assign({}, state, {
        ReqPending: false,
        error: false,
        clientes: clie,
        clientesF: clie, 
        servicios: ser,
        serviciosF: ser
      })
    case FETCH_TABLES.FAILED:
      return Object.assign({}, state, {error: true, ReqPending: false})
    
    case FILTER_ROW:
      const fil = (field) => String(field).toLowerCase().includes(action.payload[2].toLowerCase())

      if(action.payload[0] === 'Servicios'){
        let Ser = state.servicios
         switch (action.payload[1]) { 
          case 'ID':
            let IDServicio = Ser.filter((v)=> fil(v.IDServicio))
            return Object.assign({}, state, {serviciosF: IDServicio})
          case 'Nombre':
            let Nombre = Ser.filter((v)=> fil(v.Nombre))
            return Object.assign({}, state, {serviciosF: Nombre})
          case 'CI':
            let CI = Ser.filter((v)=> fil(v.CI))
            return Object.assign({}, state, {serviciosF: CI})
          case 'Tiempo/h':
            let Tiempo = Ser.filter((v)=> fil(v.Tiempo))
            return Object.assign({}, state, {serviciosF: Tiempo})
          case 'Sexo':
            let Sexo = Ser.filter((v)=> fil(v.Sexo))
            return Object.assign({}, state, {serviciosF: Sexo})
          case 'Fecha':
            let Fecha = Ser.filter((v)=> fil(v.Fecha))
            return Object.assign({}, state, {serviciosF: Fecha})
          case 'I.Total/cuc':
            let ImporteTotal = Ser.filter((v)=> fil(v.ImporteTotal))
            return Object.assign({}, state, {serviciosF: ImporteTotal})
          default:
            break;
        }
      } else {
        let Clie = state.clientes
        switch (action.payload[1]) {
          case 'CI':
            let CI = Clie.filter((v)=> fil(v.CI))
            return Object.assign({}, state, {clientesF: CI})
          case 'Nombre':
            let Nombre = Clie.filter((v)=> fil(v.Nombre))
            return Object.assign({}, state, {clientesF: Nombre})
          case 'Entradas':
            let Entradas = Clie.filter((v)=> fil(v.Entradas))
            return Object.assign({}, state, {clientesF: Entradas})
          default:
            break;
        }
      }
      return state
    default: return state
  }
}

