import { useEffect,useState } from 'react';
import Table from '../../UIComponents/Table';
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
  const attr=["UserName","Email","profile pic","is Routine created","created_at","updated_at"];
  console.log(users)
  return (
    <div>
      <Table data={users} attributes={attr} disableDelete={true} disableEdit={true}/>
    </div>
  )
}

export default Users
