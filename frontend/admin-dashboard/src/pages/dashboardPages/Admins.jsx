import { useEffect,useState,useContext } from 'react';
import {useNavigate} from 'react-router-dom'

import Button from '../../UIComponents/Button'
import Table from '../../UIComponents/Table';

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { AdminsContext } from '../../context/AdminsProvider'; '../../context/AdminsProvider'

import { IoIosAdd } from "react-icons/io";

function Admins() {
  const navigator=useNavigate();
  const privateAxios=useAxiosPrivate();
  const {token}= useAuth();
  const adminCtx=useContext(AdminsContext)
  
  useEffect(()=>{
    async function fetchAllAdmins(){
      try{
        const tokenId=token();
        const response=await privateAxios.get("/auth/admins",{withCredentials:true,headers:{
          'Authorization': 'Bearer '+tokenId
        }});
        
      adminCtx.storeAdmins(response.data);
      }catch(e){
        console.log("something went wrong",e);
      }
    }
    fetchAllAdmins();
  },[])

  function createAdminHandler(){
    navigator("/dashboard/admins/admin",{state:{operation:"create"}})
  }

  function updateHandler(admin){
    navigator("/dashboard/admins");
  }

  async function removeHandler(id) {
    
    navigator("/dashboard/admins");
  }

  const tableAtr=["Name","Email","created_at","updated_at"]
  return (
    
    <div className=''>
      <div className='flex justify-end '>
      <Button className="mt-5 mr-10 " onClick={createAdminHandler}><IoIosAdd fontSize={30}/>
      </Button>
      </div>
      <Table attributes={tableAtr} data={adminCtx.admins} updateHandler={updateHandler} removeHandler={removeHandler}  disableEdit={true}/> 
    </div>
  )
}

export default Admins
