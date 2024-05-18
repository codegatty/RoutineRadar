import { useContext } from 'react'
import { useActionData } from 'react-router-dom'
import ProfileForm from '../components/ProfileForm'
import ProgressViewer from '../components/ProgressViewer'
import {UserContext} from '../context/userContext'

function ProfilePage() {
  const userCtx=useContext(UserContext)
  const currentUser = userCtx.userData
  return (
    
    <div className='flex flex-row  bg-primary h-screen'>
      <div className='flex-2  flex justify-center items-center'>
        <img className=' rounded-full object-cover' width={300} height={300} src={currentUser?.profilePic}/></div>
      <ProfileForm className="flex-1" userData={currentUser}/>
      <ProgressViewer/>
    </div>
  )
}

export default ProfilePage
