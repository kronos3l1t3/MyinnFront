import React from 'react'
 
const nextRow =(x,elemnt,column,table)=>{
  
  const fillRow=(elemt)=>{
    const a = elemnt(elemt)
    const z = []
    for (let index = 0; index < column.length; index++) {
      z.push(<td 
        id={`${column[index]} ${a[0]}`}
        key={`td ${index}`} 
      >{a[index]}</td>)
    }
    return z
  }
  
  const editbox =(data)=>{
    const get = (id) => document.getElementById(id)
    const ID = data.innerHTML
    
    get('editBox').style.display = 'block'
    get('RowSelected').innerHTML = ID
    
    get('Enombre').value = get(`Nombre ${ID}`).innerHTML
    get('Eci').value = get(`CI ${ID}`).innerHTML
    if(table === 'servicios') {
      get('Etiempo').value = get(`Tiempo ${ID}`).innerHTML 
      get('EITotal').value = get(`ImporteTotal ${ID}`).innerHTML 
    }
    if(get(`Sexo ${ID}`).innerHTML === 'Hombre'){
      get('radioM').checked = 'checked'
    } else {
      get('radioF').checked = 'checked'
    }
  }

  const edit =(x,tble)=>{
    x.innerHTML = 'wait..'
    fetch(`http://localhost:1270/${tble}`,)
      .then(() => {
        x.innerHTML = 'edit>'
        return editbox(x.nextSibling)})
      .catch(err => x.innerHTML = 'fail')
  }

  const y = x.map((elemt,i)=>{
    return(
      <tr key={`tr ${i}`}>
        <td onClick={(x)=>edit(x.target,table,elemt)} className='edit'>{`edit>`}</td>
        {fillRow(elemt)}
      </tr>
    )
  })
  return y
}

export const setContentClient=(body)=>{
  const clie =(x)=>([x.CI,x.Nombre,x.Sexo,x.Entradas])
  const col = ['CI','Nombre','Sexo','Entradas']
  return nextRow(body,clie,col,'clientes')
}

export const setContentService=(body)=>{
  const ser =(x)=>([x.IDServicio,x.Nombre,x.Sexo,x.CI,x.Fecha,x.Tiempo,x.ImporteTotal])
  const col = ['ID','Nombre','Sexo','CI','Fecha','Tiempo','ImporteTotal']
  return nextRow(body,ser,col,'servicios')
}