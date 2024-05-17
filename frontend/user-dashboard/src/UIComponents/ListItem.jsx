
function ListItem({data,listType}) {
  
  const {subTasks,_id,isCompleted,...new_Data}=data

  const values=Object.values(new_Data)  
  return (
    <div className='flex flex-row w-full justify-center  hover:bg-primary '>
      {
        values.map((item,index)=>{
           return <div className='flex gap-2  m-1 flex-1 text-center' key={index}>{item}</div>
        })
      }
    </div>
  )
}

export default ListItem
