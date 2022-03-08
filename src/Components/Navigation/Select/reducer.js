const initialStateSelect = {
  selected: 'Servicios'
}

export const Rselect =(state=initialStateSelect,action={})=>{
  switch (action.type) {
    case 'SELECT_TABLE':
      let FilterInput = document.getElementsByClassName('IHF'), i = 0
      while (i < FilterInput.length) {
        FilterInput[i].value = ''
        i++
      }
      return Object.assign({}, state, {selected: action.payload})
    default: return state
  }
}