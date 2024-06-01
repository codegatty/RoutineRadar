import { useEffect,useContext } from 'react';
import {useNavigate} from 'react-router-dom'


import { IoIosAdd } from "react-icons/io";
import Button from '../../UIComponents/Button';
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth';
import Table2 from '../../UIComponents/Table2';
import {badgeAttributes} from '../../constants/badgeAttributes'
import {BadgeContext} from '../../context/BadgeProvider'

function Badges() {
  const navigator=useNavigate()
  const {token}=useAuth()
  const privateAxios=useAxiosPrivate();
 
  const badgeCtx=useContext(BadgeContext)

  useEffect(()=>{
    //async function fetchAllAdmins(){
    //   try{
    //     const tokenId=token();
    //     const response=await privateAxios.get("http://localhost:5000/admin/challenges",{withCredentials:true,headers:{
    //       'Authorization': 'Bearer '+tokenId
    //     }});
    //     challengeCtx.storeChallenges(response.data);
        
    //   }catch(e){
    //     console.log("something went wrong",e);
    //   }
    // }
    //fetchAllAdmins();
  },[])

  async function handleDeletion(id){
    // try{
    //   const tokenId=token();
    //   const response=await privateAxios.delete("http://localhost:5000/admin/challenges/"+id,{withCredentials:true,headers:{
    //     'Authorization': 'Bearer '+tokenId
    //   }});
    //   if(response.status === 200){
      console.log(id)
       badgeCtx.deleteBadge(id);
    //   }
    // }catch(e){
    //   console.log("something went wrong",e);
    // }
  }

  function handleEdit(badge){
    navigator("/dashboard/badge",{state:{operation:"update",badge}})
  }

  function createChallengeHandler(){
    navigator("/dashboard/badge",{state:{operation:"create"}})
  }
  
  return (
    <div className=' w-full h-full flex flex-col'>
      <div className='flex justify-end '>
      <Button className="mt-5 mr-10 " onClick={createChallengeHandler}><IoIosAdd fontSize={30}/>
      </Button>
      
      </div>
      <Table2 data={badgeCtx.badges} attributes={badgeAttributes} removeHandler={handleDeletion} updateHandler={handleEdit} imageIndex={4}/>
    </div>
  )
}

export default Badges
