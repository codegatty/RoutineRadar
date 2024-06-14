import React from 'react'

function AnalyticsGrid({data}) {
  return (
    <div className='flex  gap-4 justify-between mx-5'>
      <BoxWrapper>No of admins: {data.adminCount} </BoxWrapper>
      <BoxWrapper>No of users: {data.userCount} </BoxWrapper>
      <BoxWrapper>No of challenges: {data.challengeCount} </BoxWrapper>
      <BoxWrapper>Overall ratings: --- </BoxWrapper>
    </div>
  )
}


export default AnalyticsGrid

function BoxWrapper({children}){
  return (
    <div className='bg-white flex-1 p-4 rounded-sm border-grey-200 flex items-center font-bold text-md border-2'>
    {children}
    </div>
  )
}
