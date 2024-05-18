import { useEffect } from 'react'
import Layout from './pages/Layout'
import {useAuth0} from '@auth0/auth0-react'


function App() {
  const {
    loginWithRedirect,
    isAuthenticated} =useAuth0()

  return (
    <>
   {
    isAuthenticated?<Layout/>:<div><button className='bg-red-500' onClick={loginWithRedirect}>Sign up or login</button></div>
   }
   </>
  )
}

export default App
