import {useContext,useEffect } from 'react'
import {UserContext} from './context/userContext'
import Layout from './pages/Layout'
import LoginPage from './pages/LoginPage'


function App() {
  const userCtx=useContext(UserContext)
  useEffect(()=>{
    if(!("Notification" in window)){
      alert("This browser does not support desktop notification");
    }else if(Notification.permission==="denied"){
      Notification.requestPermission().then(()=>{
        
      }).catch((error)=>{
        console.log(error);
      })
    }
  })
  return (
    <>
   {
    userCtx.userId?<Layout/>:<LoginPage/>
   }
   </>
  )
}

export default App
