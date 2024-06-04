import { useState } from 'react'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { Checkbox } from '@headlessui/react'
import Timer from './Timer'
import MyTimer from '../components/MyTimer'
import {createDateFromString} from '../utility/createDateFromString'
function Table2({ data, attributes, onComplete, className }) {

    const [enabled,setEnabled]=useState(false)

    function completeHandler(){
        setEnabled(prevEnabled => {
        const newEnabled = !prevEnabled
        onComplete(newEnabled)
        return newEnabled
    })
    }

  return (
    <div className={classNames('relative shadow rounded-lg overflow-y-scroll', className)}>
      <table className="w-full ">
        <thead className="bg-grey-50 border-b-2 border-grey-200 capitalize">
          <tr>
            {attributes.map((ele, index) => (
              <th className="p-3 text-xl font-bold tracking-wide text-left" key={ele}>
                {ele}
              </th>
            ))}
            <th className="p-3 text-xl font-bold tracking-wide text-left">Operations</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-app-blue">
          {data?.map((ele) => {
            return (
              <tr key={uuidv4()}>
                {Object.values(ele).map((val, index) => {
                  return (
                    index != 0 && (
                      <td className="p-3 text-md whitespace-nowrap font-semibold capitalize" key={uuidv4()}>
                        {val}
                      </td>
                    )
                  )
                })}

                <td className="p-3 text-md  whitespace-nowrap font-semibold">
                  <div>
                    <Checkbox
                       checked={enabled}
                        onChange={completeHandler}
                      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
                    >
                      {/* Checkmark icon */}
                      <svg
                        className="stroke-white opacity-0 group-data-[checked]:opacity-100"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Checkbox>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {data.length===0 &&   <h1 className='flex-1 font-bold text-secondary text-2xl text-center p-5'>No Challenge Participated</h1>}
    </div>
  )
}

export default Table2
