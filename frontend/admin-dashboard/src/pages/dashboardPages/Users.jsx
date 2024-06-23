import { useEffect,useState } from 'react';
import Table from '../../UIComponents/Table';
import Table2 from '../../UIComponents/Table2'
import useAuth from '../../hooks/useAuth'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

function Users() {
  const axiosPrivat=useAxiosPrivate();
  const {token} =useAuth();
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    async function getUsers(){
      try{
        const tokenId=token();
        const response=await axiosPrivat.get("/users",{
          withCredentials:true,
          headers:{
            Authorization:'Bearer '+tokenId
          }
        })
        
        setUsers(response.data);
      }catch(error){
        console.log("error from users "+error)
      }
    }
    getUsers();
  },[])
  const attr=["UserName","Email","created_at"];
  return (
    <div className='h-full '>
      <Table data={users} attributes={attr} disableDelete={true} disableEdit={true}/>
      {/* <Table2 data={users} disableDelete={true} disableEdit={true} attributes={attr} imageIndex={3} normal={true}/> */}
    </div>
  )
}

export default Users
