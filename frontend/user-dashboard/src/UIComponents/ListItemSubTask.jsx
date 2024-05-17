
function ListItemSubTask({data}) {
  
    
  
    const values=Object.values(data)  
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
  
  export default ListItemSubTask
  