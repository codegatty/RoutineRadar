import { useContext } from 'react'
import ProfileForm from '../components/ProfileForm'
import ProgressViewer from '../components/ProgressViewer'
import { UserContext } from '../context/userContext'
import { axios_user } from '../axios_config/axiosConfig'
import { useNavigate } from 'react-router-dom'
import StarRating from '../UIComponents/StarRating'

function ProfilePage() {
  const inputClasses = 'p-2 m-5 bg-primary rounded-2xl text-primary text-sm font-semibold'
  const buttonClasses =
    'p-2 m-5 bg-app-blue hover:bg-primary hover:text-primary rounded-xl text-secondary font-semibold'

  const userCtx = useContext(UserContext)
  const currentUser = userCtx.userData
  const navigate = useNavigate()

  async function updateHandler(formData) {
    try{
    const response=await axios_user.put(`/${userCtx.userId}`,formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    userCtx.updateUser(response.data.userName,response.data.profilePic)
  }catch(err){
    console.log("something went wrong while updating profile")
    console.log(err)
  }
  }

  async function deleteHandler() {
    try {
      const response = await axios_user.delete(`/${userCtx.userId}`)
      userCtx.logout()
      navigate('/', { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-row  bg-primary h-screen capitalize">
      <div className="flex-1  flex justify-center items-center ">
        <img
          className=" rounded-full object-cover w-72 h-72 "
          src={`http://localhost:5002/profile/${currentUser?.profilePic}`}
        />
      </div>
      <div className=" flex-1 flex flex-col items-center justify-center gap-10">
        <div className=' '>
          <ProfileForm userData={currentUser} onUpdate={updateHandler} onDelete={deleteHandler} />
        </div>
        <div className="  ">
          <div>
          <p className=' text-md text-app-blue'>Rate the experience of the application</p>
          <div className='flex justify-center'>
          <StarRating />
          </div>
          
          </div>
        </div>
      </div>
      <div className='flex-1 '>
      <ProgressViewer className="" userData={currentUser} />
      </div>
    </div>
  )
}

export default ProfilePage
