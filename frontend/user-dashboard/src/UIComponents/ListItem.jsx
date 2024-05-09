import React from 'react'

function ListItem({data}) {
    const values=data.keyValues;
  return (
    <div>
    {
        data.map((item,index)=>{
            <div className=''>{}</div>
        })  
    }
    </div>
  )
}

export default ListItem
