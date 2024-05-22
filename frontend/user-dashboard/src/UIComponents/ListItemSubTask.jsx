
function ListItemSubTask({data}) {
    const {_id,isCompleted,...updatedData}=data
   
    const values=Object.values(updatedData) 
    // console.log(data)
    return (
      <div className='flex flex-row w-full justify-center  hover:bg-primary item-center '>
        {
          values.map((item,index)=>{

              return <div className='flex-1 flex gap-1  m-1 ' key={index}>{item}</div>
          })
        }
        
      </div>
    )
  }
  
  export default ListItemSubTask
  