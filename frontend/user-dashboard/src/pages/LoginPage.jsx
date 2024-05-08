import {useForm} from 'react-hook-form'
import InputErrorDisplay from '../UIComponents/InputErrorDisplay';

function LoginPage() {
    
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({defaultValues:{
        email:"admin123@gmail.com",password:"admin"
    }});
    
    async function submitHandler(data){

        //TODO:send data to backend
    }

  return (
    <div className='w-screen h-screen bg-primary flex items-center justify-center'>
    <form className='flex flex-col w-96 bg-secondary rounded-md shadow-sm shadow-secondary ' onSubmit={handleSubmit(submitHandler)}>

        <div className='flex items-center justify-center bg-neutral-300 '>

        </div>

        <h1 className='text-center text-2xl mt-5 font-bold text-primary'>Login Account</h1>

        
        <input  {...register("email",{
            required: "email required",
            pattern: {
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email"
            }
        })}className='p-2 m-5 bg-neutral-300 'type='email' placeholder='Enter the email'/> 
        {errors.email&&<InputErrorDisplay>{errors.email.message}</InputErrorDisplay>}   

 


        <input  {...register("password",{
            required: "password required"
        })}className='p-2 m-5 bg-neutral-300' type='password' placeholder='Enter the password'/>
        {errors.password&&<InputErrorDisplay>{errors.password.message}</InputErrorDisplay>}

        <button className='p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold'type='submit' >{isSubmitting?"Loading..":"Login"}</button> 
        
        <InputErrorDisplay className="text-2xl">error</InputErrorDisplay>     
    </form>
    </div>
  )
}

export default LoginPage
