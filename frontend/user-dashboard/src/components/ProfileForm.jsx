import {useForm} from 'react-hook-form'
import InputErrorDisplay from '../UIComponents/InputErrorDisplay';
import classNames from 'classnames';

function ProfileForm({className,userData,onUpdate,onDelete}) {
    
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm({defaultValues:{
        username:userData?userData.userName:"",
        email:userData?userData.email:"",
        
    }});
    
    async function submitHandler(data){
        
        const finalData=new FormData();
        finalData.append("userName",data.username);
        finalData.append("email",data.email);
        
        
        if(data.profilePic.length==0){
            finalData.append("profilePic","");
        }else{
            finalData.append("profilePic",data.profilePic[0]);
            console.log(data.profilePic[1])
        }

        onUpdate(finalData)
    }

    function deleteHandler(){
        onDelete()
    }

  return (
    <div className={classNames(className,' flex items-center justify-center')}>
    <form className='flex flex-col w-96 bg-secondary rounded-md shadow-sm shadow-secondary ' onSubmit={handleSubmit(submitHandler)}>

        <div className='flex items-center justify-center bg-neutral-300 '>

        </div>

        <h1 className='text-center text-2xl mt-5 font-bold text-primary'>Create Account</h1>

        <input  {...register("username",{
            required: "username required",
            minLength:{
                value:5,
                message:"user name should be at least 5 characters"
            }
        })}className='p-2 m-5 bg-neutral-300 'type='text' placeholder='Enter the username'/> 
        {errors.username&&<InputErrorDisplay>{errors.username.message}</InputErrorDisplay>}   
        
        <input  {...register("email",{
            required: "email required",
            pattern: {
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email"
            }
        })}className='p-2 m-5 bg-neutral-300 'type='email' placeholder='Enter the email' disabled/> 
        {errors.email&&<InputErrorDisplay>{errors.email.message}</InputErrorDisplay>}   

        <input  {...register("profilePic",{
            
        })}className='p-2 m-5 bg-neutral-300 'type='file' accept='image/*' placeholder='upload a profile pic'/> 
        {errors.profilePic&&<InputErrorDisplay>{errors.profilePic.message}</InputErrorDisplay>}   


        {/* <input  {...register("password",{
            required: "password required"
        })}className='p-2 m-5 bg-neutral-300' type='password' placeholder='Enter the password' disabled/>
        {errors.password&&<InputErrorDisplay>{errors.password.message}</InputErrorDisplay>} */}
        <div>
        <button className='p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold' type='submit' >{isSubmitting?"Loading..":"Update Account"}</button>
        <button className='p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold' onClick={deleteHandler} >{isSubmitting?"Loading..":"Delete Account"}</button>
        </div>
 
        <InputErrorDisplay className="text-2xl">error</InputErrorDisplay>     
    </form>

    </div>
  )
}

export default ProfileForm
