//icons
import { AiTwotoneDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {v4 as uuidv4} from 'uuid'
function Table2({data,attributes,updateHandler,removeHandler,disableDelete,disableEdit,imageIndex,normal}) {

  function handleUpdate(ele){
      updateHandler(ele);
  }

  
  function handleRemove(id){
      removeHandler(id);
  }


  return (
    <div className='relative shadow rounded-lg overflow-y-scroll h-full'>
    <table className="w-full h-full text-xl">
  <thead className='bg-grey-50 border-b-2 border-grey-200'>
    <tr>
        {
          attributes.map((ele,index)=><th className='p-3 text-xl font-bold tracking-wide text-left' key={ele}>{ele}</th>)
        
        }
        <th className='p-3 text-xl font-bold tracking-wide text-left'>Operations</th>
    </tr>
  </thead>
  <tbody className='divide-y divide-gray-200'>
    
    {
      data.map((ele)=>{
        return (<tr key={uuidv4()}>
          {
            Object.values(ele).map((val,index)=>{
              console.log(`http://localhost:5002/profile/${val}`)
              return (index!=0&&<td className='p-3 text-md text-gray-700 whitespace-nowrap font-semibold' key={uuidv4()}>{index===imageIndex?<img width="200" height="200" src={!normal?val:`http://localhost:5002/profile/${val}`}/>:val}</td>)
              
            })
          }
          <td className='p-3 text-md text-gray-700 whitespace-nowrap font-semibold'>
          <div>
            {
              disableDelete?"":<button className="hover:bg-red-500 rounded-3xl p-1" onClick={handleRemove.bind(this,ele._id?ele._id:ele.id)}><AiTwotoneDelete fontSize={25} fill="red" /></button>
              
            }
            {
              disableEdit?"":<button className="hover:bg-red-500 rounded-3xl p-1" onClick={handleUpdate.bind(this,ele)}><CiEdit fontSize={25} fill="red" /></button>
            }
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

export default Table2
