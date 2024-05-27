import { useForm } from "react-hook-form";
import { useContext,useRef} from "react";
import InputErrorDisplay from "../UIComponents/InputErrorDisplay";
import {RoadmapContext} from '../context/RoadmapProvider'
import {UserContext} from '../context/userContext';
import { RoadMapViewer } from "./RoadMapViewer";


function RoadmapForm({defaultValues}) {

  const inputClasses="p-2 m-5 bg-secondary rounded-2xl text-primary text-sm font-semibold"
  const buttonClasses="p-2 m-5 bg-app-blue hover:bg-secondary hover:text-primary rounded-xl text-secondary font-semibold"
  const labelClasses=" ml-5 text-primary   font-thin text-sm"
const buttonRef=useRef(null)
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
     

      async function submitHandler(data) {
        const {title,description}=data
        const userId=userCtx.userId
        const finalData={
            title,
            description,
            userId,
            map:[],
        }

         roadMapCtx.addRoadMap(finalData)
        //TODO:connect with the backend
      }

      if(defaultValues){
        buttonRef.current.style.display="none"
       
      }


  return (
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
      })}
      className={inputClasses}
      type="text"
      placeholder="Enter the title for the road map"
    />
    {errors.goal && (
      <InputErrorDisplay>{errors.goal.message}</InputErrorDisplay>
    )}
 {defaultValues && <label className={labelClasses}>Description</label>}
    <input
      {...register("description", {
        required: "description required",
      })}
      className={inputClasses}
      type="text"
      placeholder="Enter the description fro road map"
    />
    {errors.type && (
      <InputErrorDisplay>{errors.type.message}</InputErrorDisplay>
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
  )
}

export default RoadmapForm
