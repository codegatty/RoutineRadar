import {useForm} from 'react-hook-form'
import InputErrorDisplay from '../UIComponents/InputErrorDisplay';
import {axios_open} from '../axios_config/axiosConfig'
import {Link} from 'react-router-dom'
import { useContext,useState} from 'react';
import {UserContext} from '../context/userContext'
import {useNavigate } from 'react-router-dom'
import {useAuth} from '../context/AuthContext'
import LazyLoading from '../UIComponents/LazyLoading';

function LoginPage() {
    const {token,setToken}=useAuth()
    const inputClasses="p-2 m-5 bg-primary rounded-2xl text-primary text-sm font-semibold"
    const buttonClasses="p-2 m-5 bg-app-blue hover:bg-primary hover:text-primary rounded-xl text-secondary font-semibold"
    const userCtx=useContext(UserContext);
    const navigate=useNavigate()
    const [error,setError]=useState(null)
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({defaultValues:{
        email:"nnm22mc069@nmamit.in",password:"password"
    }});
    
    async function submitHandler(data){
        try{
       const response=await axios_open.post("/login",data);
            //userCtx.storeUser(response.data)
            setToken(response.data.accessToken)
            navigate("/",{replace:true})
        }catch(error){
            console.log(error);
            setError(error)
        }
    }

  return (
    <div className='w-screen h-screen bg-primary flex items-center justify-center'>
    <form className='flex flex-col w-96 bg-secondary rounded-md shadow-sm shadow-secondary justify-center ' onSubmit={handleSubmit(submitHandler)}>

        <div className='flex items-center justify-center bg-neutral-300 '>

        </div>

        <h1 className='text-center text-2xl mt-5 font-semibold text-primary'>Login</h1>

        
        <input  {...register("email",{
            required: "email required",
            pattern: {
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email"
            }
        })}className={inputClasses}type='email' placeholder='Enter the email'/> 
        {errors.email&&<InputErrorDisplay>{errors.email.message}</InputErrorDisplay>}   

 


        <input  {...register("password",{
            required: "password required"
        })}className={inputClasses} type='password' placeholder='Enter the password'/>
        {errors.password&&<InputErrorDisplay>{errors.password.message}</InputErrorDisplay>}
        <Link className='ml-5 text-primary text-sm' to="/register">No account?register</Link>
        <button className={buttonClasses} type='submit' >{isSubmitting?"Loading..":"Login"}</button> 
        
        <InputErrorDisplay className="text-2xl">{error?.response?.status===500&&"Please connect to internet"}</InputErrorDisplay>     
        
    </form>
    </div>
    
  )
}

export default LoginPage
