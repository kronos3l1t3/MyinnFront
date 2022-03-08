import { SHOW_SIDEBAR,CHANGE_PATH } from './constants'

export const ShowSidebar = () =>({
  type: SHOW_SIDEBAR
})

export const setPath = (event) => ({
  type: CHANGE_PATH,
  payload: event.target.id
}) 
