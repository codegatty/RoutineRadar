import {useForm} from 'react-hook-form'
import InputErrorDisplay from '../UIComponents/InputErrorDisplay';
import classNames from 'classnames';

function ProfileForm({className,userData,onUpdate,onDelete}) {

    const inputClasses="p-2  bg-secondary rounded-2xl text-primary text-sm font-semibold"
    const labelClasses=" ml-1 text-primary   font-thin text-sm"
    const inputContainerClasses="flex flex-col"
    const buttonClasses="p-2 m-5 bg-app-blue hover:bg-secondary hover:text-primary rounded-xl text-secondary font-semibold"
    
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
    <form className='flex flex-col w-96  ' onSubmit={handleSubmit(submitHandler)}>

        <div className='flex items-center justify-center bg-neutral-300 '>

        </div>

        <h1 className='text-center text-2xl mt-5 font-bold text-primary capitalize'>{userData?.userName}</h1>

        <div className={inputContainerClasses}>
        <label className={labelClasses}>User Name</label>
        <input  {...register("username",{
            required: "username required",
            minLength:{
                value:5,
                message:"user name should be at least 5 characters"
            }
        })}className={inputClasses}type='text' placeholder='Enter the username'/> 
        {errors.username&&<InputErrorDisplay>{errors.username.message}</InputErrorDisplay>}   
        </div>

        <div>

        <div className={inputContainerClasses}>
        <label className={labelClasses}>E-mail</label>
        <input  {...register("email",{
            required: "email required",
            pattern: {
                value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email"
            }
        })}className={inputClasses} type='email' placeholder='Enter the email' disabled/> 
        {errors.email&&<InputErrorDisplay>{errors.email.message}</InputErrorDisplay>}   
        </div>
        </div>
        <div>
        <div className={inputContainerClasses}>
        <label className={labelClasses}>Profile Pic</label>
        <input  {...register("profilePic",{
        
        })}className={inputClasses} type='file' accept='image/*' placeholder='upload a profile pic'/> 
        {errors.profilePic&&<InputErrorDisplay>{errors.profilePic.message}</InputErrorDisplay>}   
        </div>
        </div>

        {/* <input  {...register("password",{
            required: "password required"
        })}className='p-2 m-5 bg-neutral-300' type='password' placeholder='Enter the password' disabled/>
        {errors.password&&<InputErrorDisplay>{errors.password.message}</InputErrorDisplay>} */}
        <div>
        <button className={buttonClasses} type='submit' >{isSubmitting?"Loading..":"Update Account"}</button>
        <button className={classNames(buttonClasses,'text-red-500')} onClick={deleteHandler} >{isSubmitting?"Loading..":"Delete Account"}</button>
        </div>
 
        <InputErrorDisplay className="text-2xl">{}</InputErrorDisplay>     
    </form>

    </div>
  )
}

export default ProfileForm
