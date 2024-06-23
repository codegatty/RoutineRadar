import {useContext} from 'react'
import {axios_user} from '../axios_config/axiosConfig'
import {useAuth} from '../context/AuthContext'
import {UserContext} from '../context/userContext'
import LoadingSpinner from '../UIComponents/LoadingSpinner'
import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'

function Logout() {
 
  const {token,setToken}=useAuth()
  const userCtx=useContext(UserContext)
  const navigate = useNavigate();
  const fetcher = url => axios_user.get(url)
.then(res => {
    console.log("logout completed")
    userCtx.logout()
    setToken(null)
    navigate('/login',{replace:true})
    return res.data}
  )
.catch((err)=>{
  console.log(err)
  console.log("something went wrong while logout")

})

const { data, error } = useSWR('/logout', fetcher)

  return (
    <div>
      <LoadingSpinner/>
    </div>
  )
}

export default Logout
