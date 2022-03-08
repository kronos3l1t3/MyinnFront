import { SHOW_SIDEBAR,CHANGE_PATH } from './constants'

const initialState = {
  sidebar: ""
}

export const Rsidebar = (state=initialState, action={}) => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      if(state.sidebar === ""){
        return Object.assign({},state, {
          sidebar: "on"
        })
      }else{
        return initialState
      }  
    default:
      return state
  }
}

const initialStateRoute = {
  path:"REGISTRO"
}

export const Rpath = (state=initialStateRoute,action={}) => {
  switch (action.type) {
    case CHANGE_PATH:
      return Object.assign({},state,{path: action.payload})
    default: return state
  }
}
