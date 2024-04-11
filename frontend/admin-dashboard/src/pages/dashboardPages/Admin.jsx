import {useEffect, useState} from 'react'
import classNames from "classnames"
import { useForm } from 'react-hook-form'
import {useLocation,useNavigate} from 'react-router-dom'


import Button from "../../UIComponents/Button"
import InputErrorDisplay from '../../components/InputErrorDisplay'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth'

function Admin() {

    const formSection="flex flex-row  my-10 mx-10 p-5 items-center justify-center gap-10"
    const label="flex-2 text-xl font-bold "
    const input="flex-1 border-neutral-500 border text-xl p-1 rounded-md"

    const {state}=useLocation()
    const [visibility,setVisiblity]=useState("visible");

    const {register,handleSubmit,watch,formState:{errors,isSubmitting}} =useForm({defaultValues:{
      adminName:state?.admin?state.admin.adminName:"",
      email:state?.admin?state.admin.email:"",
      password:state?.admin?state.password:""
    }});
    const axiosPrivate=useAxiosPrivate();
    const {token} =useAuth();
    const [error,setError]=useState(null)
    const navigate=useNavigate();
  
    
    useEffect(()=>{
      if(state?.admin){
      setVisiblity("visible")
      }
    },[state])
 
    async function submitHandler({adminName,email,password}){
      const tokenId=token();
        try{
          if(state.operation==="create"){
            
          const response=await axiosPrivate.post("http://localhost:5000/admin/auth/register",{adminName,email,password},{
            withCredentials:true,
            headers:{
              Authorization: "Bearer "+tokenId
            }
          })
          navigate("/dashboard/admins");
        }else if(state.operation === "edit"){
          const response=await axiosPrivate.post("http://localhost:5000/admin/auth/",{adminName,email,password},{
            withCredentials:true,
            headers:{
              Authorization: "Bearer "+tokenId
            }
          })
        }
        }catch(err){
          console.log(err);
          setError(err.message)
        }
    }

  return (
    <div className="w-full h-full">
    <form className='' onSubmit={handleSubmit(submitHandler)}>
        <div className={classNames(formSection)}>
        <label className={classNames(label)}>Name of Admin</label>
        <input {...register("adminName",{
          required: "Please enter your name",
        })}className={classNames(input)} type="text" />
        </div>
        {errors.adminName&&<InputErrorDisplay>{errors.adminName.message}</InputErrorDisplay>}
        <div className={classNames(formSection)}>
        <label className={classNames(label)}>Email of admin</label>
        <input {...register("email",{
          required:"Please enter your email address",
          pattern: {
            value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email"
        },
        disabled:state.operation==="edit"?true:false
        })}className={classNames(input)} type="email" />
        </div>
        {errors.email&&<InputErrorDisplay>{errors.email.message}</InputErrorDisplay>}
        <div className={classNames(formSection,visibility)}>
        <label className={classNames(label)}>Password</label>
        <input {...register("password",{
          required:"Please enter your password",
          minLength:{
            value:8,
            message:"Password must be at least 8 characters long"
          }
        })}className={classNames(input)} type="password" />
        </div>
        {errors.password&&<InputErrorDisplay>{errors.password.message}</InputErrorDisplay>}
        <div className={classNames(formSection,visibility)}>
        <label className={classNames(label)}>Confirm password</label>
        <input {...register("cnfPassword",{
          required:"Please confirm your confirm password",
          minLength:{
            value:8,
            message:"Password must be at least 8 characters long"
          },
          validate:(value)=>{
            if (watch("password") !== value) {
              return "passwords do not match";
            }
            return true;
          }
        })}className={classNames(input)} type="password"/>
        </div>
        {errors.cnfPassword&&<InputErrorDisplay>{errors.cnfPassword.message}</InputErrorDisplay>}
        <div className="flex items-center justify-around">
        <Button className="bg-red-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">clear</Button>
            <Button className="bg-neutral-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold " >{isSubmitting?"Loading":state.operation==="edit"?"Edit":"Create"}</Button>

            <Button className="bg-red-800 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">Cancel</Button>
        </div>
        <InputErrorDisplay>{error}</InputErrorDisplay>
    </form>
</div>
  )
}

export default Admin
