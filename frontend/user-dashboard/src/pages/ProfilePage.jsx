import { useContext } from 'react'
import ProfileForm from '../components/ProfileForm'
import ProgressViewer from '../components/ProgressViewer'
import {UserContext} from '../context/userContext'
import {axios_user} from '../axios_config/axiosConfig'
import { useNavigate } from 'react-router-dom'

function ProfilePage() {

  const inputClasses="p-2 m-5 bg-primary rounded-2xl text-primary text-sm font-semibold"
  const buttonClasses="p-2 m-5 bg-app-blue hover:bg-primary hover:text-primary rounded-xl text-secondary font-semibold"

  const userCtx=useContext(UserContext)
  const currentUser = userCtx.userData
  const navigate=useNavigate()


  function updateHandler(formData){
    //!pending profile update feature
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
      <div className='flex-2  flex justify-center items-center '>
        <img className=' rounded-full object-cover w-52 h-52 ' src={`http://localhost:5002/profile/${currentUser?.profilePic}`}/>
      </div>

      <ProfileForm className="flex-1 " userData={currentUser} onUpdate={updateHandler} onDelete={deleteHandler}/>

      <ProgressViewer className="flex-1" userData={currentUser}/>
    </div>
  )
}

export default ProfilePage
