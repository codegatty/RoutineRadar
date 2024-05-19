import { useContext } from 'react'
import ProfileForm from '../components/ProfileForm'
import ProgressViewer from '../components/ProgressViewer'
import {UserContext} from '../context/userContext'
import {axios_user} from '../axios_config/axiosConfig'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {
  const userCtx=useContext(UserContext)
  const currentUser = userCtx.userData
  const navigate=useNavigate()


  function updateHandler(formData){
    consol
  }

  async function deleteHandler(){
    try{
    const response=await axios_user.delete(`/${userCtx.userId}`)
     userCtx.logout();
     navigate("/",{replace:true});
     }catch(err){
      console.log(err)
    }
  }

  return (
    
    <div className='flex flex-row  bg-primary h-screen'>
      <div className='flex-2  flex justify-center items-center'>
        <img className=' rounded-full object-cover' width={300} height={300} src={`http://localhost:5002/profile/${currentUser?.profilePic}`}/></div>
      <ProfileForm className="flex-1" userData={currentUser} onUpdate={updateHandler} onDelete={deleteHandler}/>
      <ProgressViewer/>
    </div>
  )
}

export default ProfilePage
