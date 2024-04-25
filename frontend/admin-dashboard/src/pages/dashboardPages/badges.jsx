import { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'


import { IoIosAdd } from "react-icons/io";
import Button from '../../UIComponents/Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth';
import Table from '../../UIComponents/Table';
import { challengeAttributes } from '../../constants/challengeTypes';
import { ChallengeContext } from '../../context/ChallengeProvider';

function Badges() {
  const navigator=useNavigate()
  const {token}=useAuth()
  const privateAxios=useAxiosPrivate();
 
  const challengeCtx=useContext(ChallengeContext)

  useEffect(()=>{
    async function fetchAllAdmins(){
      try{
        const tokenId=token();
        const response=await privateAxios.get("http://localhost:5000/admin/challenges",{withCredentials:true,headers:{
          'Authorization': 'Bearer '+tokenId
        }});
        challengeCtx.storeChallenges(response.data);
        
      }catch(e){
        console.log("something went wrong",e);
      }
    }
    fetchAllAdmins();
  },[])

  async function handleDeletion(id){
    try{
      const tokenId=token();
      const response=await privateAxios.delete("http://localhost:5000/admin/challenges/"+id,{withCredentials:true,headers:{
        'Authorization': 'Bearer '+tokenId
      }});
      if(response.status === 200){
      challengeCtx.deleteChallenge(id);
      }
    }catch(e){
      console.log("something went wrong",e);
    }
  }

  function handleEdit(challenge){
    navigator("/dashboard/challenges/challenge",{state:{operation:"update",challenge}})
  }

  function createChallengeHandler(){
    navigator("/dashboard/challenges/challenge",{state:{operation:"create"}})
  }
  
  return (
    <div className=' w-full h-full flex flex-col'>
      <div className='flex justify-end '>
      <Button className="mt-5 mr-10 " onClick={createChallengeHandler}><IoIosAdd fontSize={30}/>
      </Button>
      
      </div>
      <Table data={challengeCtx.challenges} attributes={challengeAttributes} removeHandler={handleDeletion} updateHandler={handleEdit}/>
    </div>
  )
}

export default Badges
