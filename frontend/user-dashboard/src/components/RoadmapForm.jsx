import { useForm } from "react-hook-form";
import { useContext,useRef,useState,useEffect} from "react";
import InputErrorDisplay from "../UIComponents/InputErrorDisplay";
import {RoadmapContext} from '../context/RoadmapProvider'
import {UserContext} from '../context/userContext';
import classNames from "classnames";
import {axios_user} from '../axios_config/axiosConfig'


function RoadmapForm({defaultValues,onDisSelect}) {

  const inputClasses="p-2 m-5 bg-secondary rounded-2xl text-primary text-sm font-semibold"
  const buttonClasses="p-2 m-5 bg-app-blue hover:bg-secondary hover:text-primary rounded-xl text-secondary font-semibold"
  const labelClasses=" ml-5 text-primary  font-thin text-sm"
  const buttonRef=useRef(null)
  const btnRef=useRef(null)
  const delBtnRef=useRef(null)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm({values:{
        title:defaultValues?defaultValues[0]?.title:"",
        description:defaultValues?defaultValues[0]?.description:"",
      }});
      const roadMapCtx=useContext(RoadmapContext)
      const userCtx=useContext(UserContext)
      const [isUpdate,setIsUpdate]=useState(defaultValues?true:false)
     useEffect(()=>{
      if(defaultValues){
        setIsUpdate(true);
      }else{
        setIsUpdate(false)
      }

      if(!isUpdate){
       btnRef.current.style.display="none"
       buttonRef.current.style.display="block"
       delBtnRef.current.style.display="none"
       
      }
     },[defaultValues,onDisSelect])

     if(isUpdate){
      buttonRef.current.style.display="none"
      btnRef.current.style.display="block"
      delBtnRef.current.style.display="block"
    }

      async function submitHandler(data) {
        const {title,description}=data
        const userId=userCtx.userId
        const finalData={
            title,
            description,
            userId,
            paths:[],
        }
        try{
        const response=await axios_user.post("/roadmap",finalData)
         roadMapCtx.addRoadMap({_id:response.data._id,...finalData})
         console.log("response"+response.data)
        }catch(err){
          console.log(err)
        }
      }


      function newRoadMapHandler(){
        setIsUpdate(false)
        onDisSelect()
      }

      async function deleteHandler(){
        if(defaultValues){
          const roadMapId=defaultValues[0]._id
          roadMapCtx.deleteRoadMap(roadMapId)
          try{
            await axios_user.delete("roadMap/"+roadMapId)
          }catch(error){
            console.log(error)
          }
        }
        onDisSelect()
      }



  return (
    <>
    <form
    className="flex flex-col w-96 "
    onSubmit={handleSubmit(submitHandler)}
  >
    <h1 className="text-center text-2xl mt-5 font-bold text-primary">
      {defaultValues?"Add new Path":"Create New RoadMap"}
    </h1>
    {defaultValues && <label className={labelClasses}>Title</label>}
    <input
      {...register("title", {
        required: "Title required",
        minLength: {
          value: 5,
          message: "Title should be at least 5 characters",
        },
        disabled:defaultValues?true:false
      })}
      className={inputClasses}
      type="text"
      placeholder="Enter the title for the road map"
      
    />
    {errors.goal && (
      <InputErrorDisplay>{errors.title.message}</InputErrorDisplay>
    )}
 {defaultValues && <label className={labelClasses}>Description</label>}
    <input
      {...register("description", {
        required: "description required",
        disabled:defaultValues?true:false
      })}
      className={inputClasses}
      type="text"
      placeholder="Enter the description fro road map"
    />
    {errors.type && (
      <InputErrorDisplay>{errors.description.message}</InputErrorDisplay>
    )}

    <button
      className={buttonClasses}
      type="submit"
      ref={buttonRef} 
    >
      {isSubmitting ? "Loading.." : "Next"}
    </button>


    <InputErrorDisplay className="text-2xl">{}</InputErrorDisplay>
  </form>
  <div className="flex flex-row">
      <button
      className={buttonClasses}
      ref={btnRef}
      onClick={newRoadMapHandler}
    >
      Add new Roadmap
    </button>

    <button
      className={classNames(buttonClasses,"hover:bg-red-500")}
      ref={delBtnRef}
      onClick={deleteHandler}
    >
      Delete RoadMap
    </button>
    </div>
    </>
  )
}

export default RoadmapForm
