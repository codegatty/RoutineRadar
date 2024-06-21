import { useEffect,useState,useContext } from "react"
import Table from "../UIComponents/Table"
import { challengeAttributes } from "../constants/tableAttributes"
import {UserContext} from '../context/userContext'
import {axios_user} from '../axios_config/axiosConfig'
import { Tab } from "@headlessui/react"
import Table2 from "../UIComponents/Table2"

function Challenge() {
  const userCtx=useContext(UserContext)
  const [challenges,setChallenges]=useState([]);
  useEffect(()=>{
    async function fetchChallenges(){
      try{
      const response = await axios_user.get("/challenge/"+userCtx.userId)
        setChallenges(response.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchChallenges()
  },[userCtx.userData])

  async function onParticipate(challengeId){  
    
    if(!userCtx.userData.challengeId){
    try{
      const body={
        challengeId
      }
      await axios_user.put("/challenge/"+userCtx.userId,body)
      userCtx.updateChallengeId(challengeId)
    }catch(error){
      console.log(error)
    }
  }
  }
  async function onComplete(enabled){
    const challengeId=userCtx.userData.challengeId
    try{
    if(challengeId &&enabled){
      const body={challengeId:challengeId}
      await axios_user.put("/challenge/on_complete/"+userCtx.userId,body)
      userCtx.updateParticipatedChallengeIds(challengeId);
      
    }
  }catch(error){
    console.log(error)
  }
  }
 
  return (
    <div className="w-screen h-screen bg-primary flex flex-col justify-center gap-5">
        <h1 className='flex-2 text-center text-2xl mt-5 font-semibold text-white underline'>Participate Challenges</h1>
      <Table2 
      attributes={challengeAttributes} 
      className="flex-2 text-white " 
      data={challenges?.filter((ele)=>ele._id===userCtx.userData.challengeId)}
      onComplete={onComplete}
      />
      <Table attributes={challengeAttributes} className="flex-1 text-white" data={challenges} onParticipate={onParticipate} isParticipating={userCtx.userData.challengeId?true:false}/>
    </div>
  )
}

export default Challenge
