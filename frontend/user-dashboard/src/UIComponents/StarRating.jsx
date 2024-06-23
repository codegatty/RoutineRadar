import {useState,useContext} from 'react'
import axios from 'axios';
import {axios_user} from '../axios_config/axiosConfig'
import { UserContext } from '../context/userContext';


const StarRating = () => {
  const userCtx=useContext(UserContext)
  const [star,setStar]=useState(userCtx.userData?.appRate?userCtx.userData.appRate:0)
  const [exp,setExp]=useState("")
  

 async  function selectStartHandler(index){
    setStar(index+1)
    try{
    await axios_user.put(`/rating/${userCtx.userId}`,{star:index+1})
    }catch(e){
      console.log("")
    }
  }

  return (
    <div className='flex flex-col '>
    <div className="flex-2 flex ">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-10 w-10  ${i < star ? 'text-app-blue' : 'text-secondary'} hover:border-1 hover:border-app-blue`}
          viewBox="0 0 25 25"
          fill="currentColor"
          onClick={selectStartHandler.bind(this,i)}
          onMouseOver={()=>{
            switch(i){
              case 0:setExp("worst")
              break
              case 1:setExp("good")
              break
              case 2:setExp("better")
              break
              case 3:setExp("best")
              break
              case 4:setExp("super")
              break
            }
          }}
          onMouseLeave={()=>{
            setExp("")
          }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.429 4.409a1 1 0 00.95.69h4.631c.969 0 1.371 1.24.588 1.81l-3.75 2.72a1 1 0 00-.364 1.118l1.429 4.409c.3.921-.755 1.688-1.54 1.118l-3.75-2.72a1 1 0 00-1.175 0l-3.75 2.72c-.784.57-1.84-.197-1.54-1.118l1.429-4.409a1 1 0 00-.364-1.118l-3.75-2.72c-.783-.57-.381-1.81.588-1.81h4.631a1 1 0 00.95-.69l1.429-4.409z" />
        </svg>
      ))}
    </div>
    <div className='flex-1 flex justify-center capitalize '>
    <span className='text-app-blue text-sm text-center'>{exp}</span>
    </div>
    </div>
  ); 
};

export default StarRating;
