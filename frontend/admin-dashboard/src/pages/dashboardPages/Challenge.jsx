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




function Challenge(){
    const formSection="flex flex-row  my-10 mx-10 p-5 items-center justify-center gap-10"
    const label="flex-2 text-xl font-bold "
    const input="flex-1 border-neutral-500 border text-xl p-1 rounded-md"

    const [type,setType]=useState(typesOfChallange[0]);
    const [error,setError]=useState(null)
    const axiosPrivate=useAxiosPrivate();
    const {token} =useAuth();
    const navigate=useNavigate()
    const {state}=useLocation()
    const shouldCreate=state.operation==="create"?true:false;

    const {register,handleSubmit,formState:{errors,isLoading}}=useForm({
        defaultValues:{
            name:shouldCreate?"":state.challenge.name,
            duration:shouldCreate?0:state.challenge.duration,
            weightage:shouldCreate?0:state.challenge.weightage,
            description:shouldCreate?"":state.challenge.description
        }
    });


    function typeChangeHandler(type){
        setType(type)
    }
    console.log(state.operation)
    async function submitHandler(data){
        const tokenId=token();
        const newData={...data,type};
        if(state.operation==="create"){
            try{
                
                const response=await axiosPrivate.post("/challenges",newData,{
                    withCredentials:true,
                    headers:{
                        Authorization:"Bearer "+tokenId
                    }
                })
               navigate("/dashboard/challenges");

            }catch(e){
                
                setError(e.message);
            }
        }else if(state.operation==="update"){
            try{
                const response=await axiosPrivate.put("/challenges/"+state.challenge._id,newData,{
                    withCredentials:true,
                    headers:{
                        Authorization:"Bearer "+tokenId
                    }
                })
                console.log(response.status)
                if(response.status==200){
                    navigate("/dashboard/challenges");
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
                <label className={classNames(label)}>Name of Challenge</label>
                <input className={classNames(input)} type="text" {...register("name",{
                    required: "Please enter your name",
                    minLength:{
                        value:8,
                        message:"Name must be at least 8 characters long"
                    }
                })}
                />
                <InputErrorDisplay>{errors.name&&errors.name.message}</InputErrorDisplay>
                </div>

                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Type of Challenge</label>
                <div className={classNames(input,"border-0")}>
                <TypeList types={typesOfChallange} onChange={typeChangeHandler} defaultValue={shouldCreate?typesOfChallange[0]:state.challenge.type}/>
                </div>
                </div>

                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Duration (in hours)</label>
                <input className={classNames(input)} type="text" {...register("duration",{
                    required: "Please enter your duration",
                    validate:(value)=>rangeValidator(value)
            
                })}/>
                <InputErrorDisplay>{errors.duration&&errors.duration.message}</InputErrorDisplay>
                </div>

                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Experience gained</label>
                <input className={classNames(input)} type="number"  {...register("weightage",{
                    required: "Please enter your weightage",
                    validate:(value)=>rangeValidator(value)
                })}/>
                <InputErrorDisplay>{errors.weightage&&errors.weightage.message}</InputErrorDisplay>
                </div>

                <div className={classNames(formSection)}>
                <label className={classNames(label)}>Descritpion of Challenge</label>
                <textarea className={classNames(input)} {...register("description",{
                    required: "Please enter your description",
                    minLength:{
                        value:8,
                        message:"Name must be at least 8 characters long"
                    }
                })}></textarea>

                <InputErrorDisplay>{errors.description&&errors.description.message}</InputErrorDisplay>
                </div>
                <div className="flex items-center justify-around">

                    <Button className="bg-neutral-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">
                        {isLoading?"Loading":state.operation==="update"?"Update":"create"}
                    </Button>

                    <Button className="bg-neutral-950 text-white text-center hover:bg-white hover:text-neutral-950 font-bold ">
                        clear
                    </Button>
                </div>
                <InputErrorDisplay>{error?error:""}</InputErrorDisplay>
            </form>
        </div>
    )
}


export default Challenge;