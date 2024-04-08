import React from 'react'

function AnalyticsGrid() {
  return (
    <div className='flex  gap-4 justify-between mx-5'>
      <BoxWrapper>No of admins: </BoxWrapper>
      <BoxWrapper>No of users: </BoxWrapper>
      <BoxWrapper>No of challenges: </BoxWrapper>
      <BoxWrapper>Overall ratings: </BoxWrapper>
    </div>
  )
}


export default AnalyticsGrid

function BoxWrapper({children}){
  return (
    <div className='bg-white flex-1 p-4 rounded-sm border-grey-200 flex items-center font-bold'>
    {children}
    </div>
  )
}
