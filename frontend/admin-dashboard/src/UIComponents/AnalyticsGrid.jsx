import React from 'react'

function AnalyticsGrid() {
  return (
    <div className='flex gap-4  w-full justify-between'>
      <BoxWrapper>a</BoxWrapper>
      <BoxWrapper>b</BoxWrapper>
      <BoxWrapper>c</BoxWrapper>
      <BoxWrapper>d</BoxWrapper>
    </div>
  )
}


export default AnalyticsGrid

function BoxWrapper({children}){
  return (
    <div className='bg-white flex-1 p-4 rounded-sm border-grey-200 flex items-center'>
    {children}
    </div>
  )
}
