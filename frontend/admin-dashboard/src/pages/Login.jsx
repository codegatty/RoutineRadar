import { useState } from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import { GiRadarCrossSection } from 'react-icons/gi'
import { IconContext } from 'react-icons'
import InputErrorDisplay from '../components/InputErrorDisplay';
import useAuth from '../hooks/useAuth'

import { axios_public } from '../axios_config/axiosConfig'

function Login() {
    
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({defaultValues:{
        email:"admin123@gmail.com",password:"admin"
    }});

    const [error, setError] = useState("");
    const  {login}=useAuth();
    const navigate=useNavigate();
    
    async function submitHandler(data){
        try{
            const res=await axios_public.post('/auth/login',data,{withCredentials:true});
            login(res.data.accessToken)
            navigate("/dashboard",{replace:true});
        }catch(err){
            console.log(err.response);
            setError(err.response);
        }
    }

  return (
    <div className='w-screen h-screen bg-neutral-900 flex items-center justify-center'>
    <form className='flex flex-col w-96 bg-neutral-100 rounded-md shadow-sm shadow-neutral-300' onSubmit={handleSubmit(submitHandler)}>

        <div className='flex items-center justify-center bg-neutral-300 '>
        <IconContext.Provider value={{ color: 'black', size: '50px' }}>
          <GiRadarCrossSection />
    </IconContext.Provider>
        </div>

        <h1 className='text-center text-2xl mt-5 font-bold'>Admin Login</h1>
        
        <input  {...register("email",{
            required: "email required",
            pattern: {
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email"
            }
        })}className='p-5 m-5 bg-neutral-300 'type='email' placeholder='Enter the email'/> 
        {errors.email&&<InputErrorDisplay>{errors.email.message}</InputErrorDisplay>}   
        

        <input  {...register("password",{
            required: "password required"
        })}className='p-5 m-5 bg-neutral-300' type='password' placeholder='Enter the password'/>
        {errors.password&&<InputErrorDisplay>{errors.password.message}</InputErrorDisplay>}

        <button className='p-5 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold'type='submit' >{isSubmitting?"Loading..":"Login"}</button> 
        
        <InputErrorDisplay className="text-2xl">{error}</InputErrorDisplay>     
    </form>
    </div>
  )
}

export default Login
