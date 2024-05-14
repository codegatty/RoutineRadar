
import ProfileForm from '../components/ProfileForm'
import ProgressViewer from '../components/ProgressViewer'

function ProfilePage() {
  return (
    
    <div className='flex flex-row  bg-primary h-screen'>
      <div className='flex-2  flex justify-center items-center'>
        <img className=' rounded-full object-cover' width={300} height={300} src="../../public/vite.svg"/></div>
      <ProfileForm className="flex-1" />
      <ProgressViewer/>
    </div>
  )
}

export default ProfilePage
