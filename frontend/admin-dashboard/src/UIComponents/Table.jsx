//icons
import { AiTwotoneDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import {v4 as uuidv4} from 'uuid'
function Table({data,attributes,updateHandler,removeHandler,disableDelete,disableEdit}) {

  function handleUpdate(ele){
      updateHandler(ele);
  }

  
  function handleRemove(id){
      removeHandler(id);
  }


  return (
<div className='relative shadow rounded-lg max-h-[400px] overflow-y-scroll'>
  <div className='w-full'>
    <table className="table table-auto">
      <thead className='bg-grey-50 border-b-2 border-grey-200'>
        <tr>
          {attributes.map((ele, index) => (
            <th className='p-3 text-xl font-bold tracking-wide text-left' key={ele}>{ele}</th>
          ))}
          <th className='p-3 text-xl font-bold tracking-wide text-left'>Operations</th>
        </tr>
      </thead>
      <tbody className='divide-y divide-gray-200'>
        {data.map((ele) => (
          <tr key={uuidv4()}>
            {Object.values(ele).map((val, index) => (
              index !== 0 && <td className='p-3 text-md text-gray-700 whitespace-nowrap font-semibold' key={uuidv4()}>{val}</td>
            ))}
            <td className='p-3 text-md text-gray-700 whitespace-nowrap font-semibold'>
              <div>
                {!disableDelete && (
                  <button className="hover:bg-red-500 rounded-3xl p-1" onClick={() => handleRemove(ele._id)}>
                    <AiTwotoneDelete fontSize={25} fill="red" />
                  </button>
                )}
                {!disableEdit && (
                  <button className="hover:bg-red-500 rounded-3xl p-1" onClick={() => handleUpdate(ele)}>
                    <CiEdit fontSize={25} fill="red" />
                  </button>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  )
}

export default Table
