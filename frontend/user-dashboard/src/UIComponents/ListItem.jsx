import classNames from "classnames"
import {convertTo12HourFormat} from "../utility/convertTo12HourFormat"
function ListItem({data,listType,className}) {
  
  const {subTasks,_id,isCompleted,...new_Data}=data

  const values=Object.values(new_Data)  
  return (
    <div className={classNames('flex flex-row w-full justify-center  hover:bg-primary ',className)}>
      {
        values?.map((item,index)=>{
          if(index===1 && item!=="From" || index===2 && item!="To" )
            return <div className='m-1 flex-1 text-center  border border-l-1 border=r-1 border-t-0 border-b-0  border-gray-600' key={index}>{convertTo12HourFormat(item)}</div>
          else
           return <div className='m-1 flex-1 text-center  border border-l-1 border=r-1 border-t-0 border-b-0  border-gray-600' key={index}>{item}</div>
        })
      }
    </div>
  )
}

export default ListItem
