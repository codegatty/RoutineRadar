import {useEffect, useState} from 'react'
import classNames from "classnames"
import { useForm } from 'react-hook-form'
import { useNavigate,useLocation } from 'react-router-dom'

import Button from "../../UIComponents/Button"
import TypeList from "../../UIComponents/TypeList"
import { typesOfChallange } from "../../constants/challengeTypes"
import InputErrorDisplay from "../../components/InputErrorDisplay"
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import useAuth from '../../hooks/useAuth'
import { rangeValidator } from '../../util/rangeValidator'




function Badge(){
    const formSection="flex flex-row  my-10 mx-10 p-5 items-center justify-center gap-10"
    const label="flex-2 text-xl font-bold "
    const input="flex-1 border-neutral-500 border text-xl p-1 rounded-md"

     const axiosPrivate=useAxiosPrivate();
     const {token} =useAuth();
     const navigate=useNavigate()
     const {state}=useLocation()
     const shouldCreate=state.operation==="create"?true:false;

    const {register,handleSubmit,formState:{errors,isLoading}}=useForm({
        defaultValues:{
            title:shouldCreate?"":state.badge.title,
            description:shouldCreate?0:state.badge.description,
            badgeNo:shouldCreate?0:state.badge.badgeNo,
        }
    });

    async function submitHandler(data){
        const tokenId=token();
        console.log(data)
        // if(state.operation==="create"){
        //     try{
                
        //         const response=await axiosPrivate.post("http://localhost:5000/admin/challenges",newData,{
        //             withCredentials:true,
        //             headers:{
        //                 Authorization:"Bearer "+tokenId
        //             }
        //         })
        //        navigate("/dashboard/challenges");

        //     }catch(e){
                
        //         setError(e.message);
        //     }
        // }else if(state.operation==="update"){
        //     try{
        //         const response=await axiosPrivate.put("http://localhost:5000/admin/challenges/"+state.challenge._id,newData,{
        //             withCredentials:true,
        //             headers:{
        //                 Authorization:"Bearer "+tokenId
        //             }
        //         })
        //         console.log(response.status)
        //         if(response.status==200){
        //             navigate("/dashboard/challenges");
        //         }
        //     }catch(e){
        //       setError(e.message)
        //     }
            
        // }
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
                <input className={classNames(input)} type="number"  {...register("badgeNo",{
                    required: "Please enter the badge number",
                    
                })}/>
                <InputErrorDisplay>{errors.weightage&&errors.weightage.message}</InputErrorDisplay>
                </div>

                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Badge Image</label>
                <input className={classNames(input)} type="file" {...register("Image",{
                    required: "Please enter your description",
                    minLength:{
                        value:8,
                        message:"Name must be at least 8 characters long"
                    }
                })}/>

                <InputErrorDisplay>{errors.description&&errors.description.message}</InputErrorDisplay>
                </div>

                <div className='flex items-center justify-around'>
                <Button className="bg-neutral-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">
                        {isLoading?"Loading":shouldCreate===false?"Update":"create"}
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