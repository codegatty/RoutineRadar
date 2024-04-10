import React from 'react'

function Table({data,attributes}) {

  return (
    <div className='overflow-auto shadow rounded-lg'>
    <table class="w-full">
  <thead className='bg-grey-50 border-b-2 border-grey-200'>
    <tr>
        {
          attributes.map((ele)=><th className='p-3 text-xl font-bold tracking-wide text-left'>{ele}</th>)
        }
    </tr>
  </thead>
  <tbody className='divide-y divide-gray-200'>
    {
      data.map((ele)=>{
        return (<tr>
          {
            Object.values(ele).map((val)=>{
              return (<td className='p-3 text-md text-gray-700 whitespace-nowrap font-semibold'>{val}</td>)
            })
          }
      </tr>)
      })
    }
  </tbody>
</table>
</div>
  )
}

export default Table
