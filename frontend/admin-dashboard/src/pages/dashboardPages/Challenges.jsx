import React from 'react'
import {useNavigate} from 'react-router-dom'

function Challenges() {
  const navigator=useNavigate()
  function createChallengeHandler(){
    navigator("/dashboard/challenges/challenge")
  }
  return (
    <div className=' w-full h-full flex'>
      <div >
        <button className='ml-10 
        mt-5 
        bg-neutral-200 
        text-xl p-3 
        rounded-lg hover:bg-neutral-900 hover:text-white' onClick={createChallengeHandler}>Create Challenge</button>
      </div>
    </div>
  )
}

export default Challenges
