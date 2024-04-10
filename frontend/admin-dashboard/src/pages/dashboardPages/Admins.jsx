import { useEffect,useState } from 'react';
import {useNavigate} from 'react-router-dom'

import Button from '../../UIComponents/Button'
import Table from '../../UIComponents/Table';

import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'

function Admins() {
  const navigator=useNavigate();
  const [data,setData]=useState([]);
  const privateAxios=useAxiosPrivate();
  const {token}= useAuth();

  useEffect(()=>{
    async function fetchAllAdmins(){
      try{
        const tokenId=token();
        const response=await privateAxios.get("http://localhost:5000/admin/auth/admins",{withCredentials:true,headers:{
          'Authorization': 'Bearer '+tokenId
        }});
        setData(response.data);
        console.log(data)
      }catch(e){
        console.log("something went wrong",e);
      }
    }
    fetchAllAdmins();
  },[])

  function createAdminHandler(){
    navigator("/dashboard/admins/admin")
  }
  const tableAtr=["Id","Name","Email","created_at","updated_at"]
  return (
    
    <div className=''>
     <Button className="mt-5 ml-10" onClick={createAdminHandler}>Create new Admin</Button>
      <Table attributes={tableAtr} data={data}/> 
    </div>
  )
}

export default Admins
