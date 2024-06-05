import { useState } from "react";
import classNames from "classnames";
import {v4 as uuidv4} from 'uuid'
function Table({data,attributes,onParticipate,className,isParticipating}) {
  const [onPart,setOnPart]=useState(isParticipating)

 
  function participateHandler(id){
    onParticipate(id)
    setOnPart(true);
  }
  
  return (
    <div className={classNames('relative shadow rounded-lg overflow-y-scroll overflow-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary',className)}>
    <table className="w-full ">
  <thead className='bg-grey-50 border-b-2 border-grey-200 capitalize'>
    <tr>
        {
          attributes.map((ele,index)=><th className='p-3 text-md font-semibold tracking-wide text-left' key={ele}>{ele}</th>)
        
        }
        <th className='p-3 text-md font-semibold tracking-wide text-left'>Operations</th>
    </tr>
  </thead>
  <tbody className='divide-y divide-gray-200 text-app-blue text-md '>
    
    {
      data?.map((ele)=>{  
        return (<tr key={uuidv4()}>
          {
            Object.values(ele).map((val,index)=>{
              return (index!=0&&<td className='p-3 text-md whitespace-nowrap font-light capitalize text-left' key={uuidv4()}>{val}</td>)
            })
          }
          <td className='p-3 text-md  whitespace-nowrap font-normal'>
          <div>
          <button className=" rounded-md   disabled:bg-secondary disabled:border-secondary disabled:text-slate-500 border border-1 border-app-blue p-2 hover:bg-secondary disabled:font-bold " disabled={onPart} onClick={participateHandler.bind(this,ele._id)} >Participate</button>
          </div>
          </td>
      </tr>)
      })
    }

  </tbody>
</table>
</div>
  )
}

export default Table
