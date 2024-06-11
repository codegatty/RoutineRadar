import { useState} from 'react'
import classNames from "classnames"
import { useForm } from 'react-hook-form'
import { useNavigate,useLocation } from 'react-router-dom'

import Button from "../../UIComponents/Button"
import InputErrorDisplay from "../../components/InputErrorDisplay"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { imageToBase64 } from '../../util/imageToBas64'
import { rangeValidator2 } from '../../util/rangeValidator'




function Badge(){
    const formSection="flex flex-row  my-10 mx-10 p-5 items-center justify-center gap-10"
    const label="flex-2 text-xl font-bold "
    const input="flex-1 border-neutral-500 border text-xl p-1 rounded-md"

     const axiosPrivate=useAxiosPrivate();
     const {token} =useAuth();
     const navigate=useNavigate()
     const {state}=useLocation()
     const shouldCreate=state.operation==="create"?true:false;
     const [error,setError]=useState(null)

    const {register,handleSubmit,formState:{errors,isLoading}}=useForm({
        defaultValues:{
            title:shouldCreate?"":state.badge.title,
            description:shouldCreate?"":state.badge.description,
            badgeno:shouldCreate?"":state.badge.badgeno,
        }
    });



    async function submitHandler(data){
        const tokenId=token();
    
         if(state.operation==="create"){
            try{
                const imgString=await imageToBase64(data.image[0])
                const newData={...data,image:imgString}
            
                console.log(newData)
                const response=await axiosPrivate.post("/badges",newData,{
                    withCredentials:true,
                    headers:{
                        Authorization:"Bearer "+tokenId,
                    }
                })
               navigate("/dashboard/badges");
            }catch(e){
                console.log(e)
                setError(e.message);
            }
        }else if(state.operation==="update"){

            let newData={}
            if(data.image.length==0){
                newData={...data,image:state.badge.image}
            }else{
                const imgString=await imageToBase64(data.image[0])
               newData={...data,image:imgString}
            }
            try{

                const response=await axiosPrivate.put("/badges/"+state.badge.id,newData,{
                    withCredentials:true,
                    headers:{
                        Authorization:"Bearer "+tokenId
                    }
                })
                if(response.status==200){
                    navigate("/dashboard/badges");
                }
            }catch(e){
              setError(e.message)
            }
            
       }
    }


    return (
        <div className="w-full h-full overflow-auto">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Title of Badge</label>
                <input className={classNames(input)} type="text" {...register("title",{
                    required: "Please enter Title of Badge",
                    minLength:{
                        value:3,
                        message:"Name must be at least 3 characters long"
                    }
                })}
                />
                <InputErrorDisplay>{errors.title&&errors.title.message}</InputErrorDisplay>
                </div>


                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Description</label>
                <input className={classNames(input)} type="text" {...register("description",{
                    required: "Please enter badge description",
                })}/>
                <InputErrorDisplay>{errors.description&&errors.description.message}</InputErrorDisplay>
                </div>

                <div className="flex flex-col  mx-10 px-5 text-sm font-bold text-blue-500">
                    <span>1000-1999: Routine badges</span>
                    <span>2000-2999: Profile badges</span>
                </div>
                <div className={classNames(formSection,"mt-1")}>
                <label className={classNames(label)}>Badge No.</label>
                <input className={classNames(input)} type="number"  {...register("badgeno",{
                    required: "Please enter the badge number",
                    validate:(value)=>rangeValidator2(value)
                    
                })}/>
                <InputErrorDisplay>{errors.badgeno&&errors.badgeno.message}</InputErrorDisplay>
                </div>

                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Badge Image</label>
                <input className={classNames(input)} type="file" accept='image/*' {...register("image",{
                    required:false,
                })}/>

                <InputErrorDisplay>{errors.image&&errors.image.message}</InputErrorDisplay>
                </div>

                <div className='flex items-center justify-around'>
                <Button className="bg-neutral-950 text-white text-center hover:bg-green hover:text-neutral-950 font-bold ">
                        {isLoading?"Loading":state.operation==="update"?"Update":"create"}
                    </Button>

                    <Button className="bg-neutral-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">
                        clear
                    </Button>
                </div>


                <InputErrorDisplay>{}</InputErrorDisplay>
            </form>
        </div>
    )
}


export default Badge;