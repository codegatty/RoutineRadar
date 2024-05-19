import {useContext } from 'react'
import {UserContext} from './context/userContext'
import Layout from './pages/Layout'
import LoginPage from './pages/LoginPage'


function App() {
  const userCtx=useContext(UserContext)
  return (
    <>
   {
    userCtx.userId?<Layout/>:<LoginPage/>
   }
   </>
  )
}

export default App
