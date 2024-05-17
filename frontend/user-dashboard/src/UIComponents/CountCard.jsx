import React from 'react'

function CountCard({label,count}) {
  return (
    <div>
        <div className="bg-app-blue p-3 rounded-lg flex-1 m-5 flex justify-center items-center">
            <span className='flex-1 font-thin text-sm'>{label}</span> <span className='flex-2 '>{count}</span>
          </div>
    </div>
  )
}

export default CountCard
