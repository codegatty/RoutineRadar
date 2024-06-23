
import classNames from "classnames"
function ListItemSubTask({data,className}) {
    const {_id,isCompleted,...updatedData}=data
   
    const values=Object.values(updatedData) 
    // console.log(data)
    return (
      <div className={classNames('flex flex-row w-full justify-center  hover:bg-primary item-center ',className)}>
        {
          values.map((item,index)=>{
              if(index==1 && item!="Weightage")
                item=parseFloat(item).toFixed(2)

              return <div className='flex-1 text-center  m-1 border border-l-1 border=r-1 border-t-0 border-b-0  border-gray-600' key={index}>{item}</div>
          })
        }
        
      </div>
    )
  }
  
  export default ListItemSubTask
  