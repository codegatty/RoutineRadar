import React from 'react'

function ListItem({data}) {
  const {subTasks,...newData}=data

       const values=Object.values(newData)
  
    
    
  return (
    <div className='flex flex-row w-full justify-around  hover:bg-primary '>
      {
        values.map((item,index)=>{
          return <div className='flex gap-2  m-1' key={index}>{item}</div>
        })
      }
    </div>
  )
}

export default ListItem
