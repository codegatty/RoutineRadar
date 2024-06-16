import {useState,useContext} from 'react'
import axios from 'axios';
import {axios_user} from '../axios_config/axiosConfig'
import { UserContext } from '../context/userContext';


const StarRating = () => {
  const userCtx=useContext(UserContext)
  const [star,setStar]=useState(userCtx.userData?.appRate?userCtx.userData.appRate:0)
  

 async  function selectStartHandler(index){
    setStar(index+1)
    try{
    await axios_user.put(`/rating/${userCtx.userId}`,{star:index+1})
    }catch(e){
      console.log("error went in handling stars")
    }
  }

  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${i < star ? 'text-yellow-500' : 'text-gray-300'}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={selectStartHandler.bind(this,i)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.429 4.409a1 1 0 00.95.69h4.631c.969 0 1.371 1.24.588 1.81l-3.75 2.72a1 1 0 00-.364 1.118l1.429 4.409c.3.921-.755 1.688-1.54 1.118l-3.75-2.72a1 1 0 00-1.175 0l-3.75 2.72c-.784.57-1.84-.197-1.54-1.118l1.429-4.409a1 1 0 00-.364-1.118l-3.75-2.72c-.783-.57-.381-1.81.588-1.81h4.631a1 1 0 00.95-.69l1.429-4.409z" />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
