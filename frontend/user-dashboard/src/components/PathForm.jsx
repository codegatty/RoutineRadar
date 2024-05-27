import { useForm } from "react-hook-form";
import { useContext,useEffect,useRef, useState} from "react";
import InputErrorDisplay from "../UIComponents/InputErrorDisplay";
import {RoadmapContext} from '../context/RoadmapProvider'
import {UserContext} from '../context/userContext';


function PathForm({roadMap}) {

  const inputClasses="p-2 m-5 bg-secondary rounded-2xl text-primary text-sm font-semibold"
  const buttonClasses="p-2 m-5 bg-app-blue hover:bg-secondary hover:text-primary rounded-xl text-secondary font-semibold"
  const [selectedId,setSelectedId]=useState(roadMap)

  useEffect(()=>{
    if(roadMap){
        setSelectedId(roadMap[0]._id)
    }
  },[roadMap])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();
      const roadMapCtx=useContext(RoadmapContext)
      const userCtx=useContext(UserContext)
     

      async function submitHandler(data) {
        roadMapCtx.addPath(selectedId,data.path)
        
        //TODO:connect with the backend
      }


  return (
    <form
    className="flex flex-col w-96 "
    onSubmit={handleSubmit(submitHandler)}
  >
    {/* <h1 className="text-center text-2xl mt-5 font-bold text-primary">
      Create New RoadMap
    </h1> */}

    <input
      {...register("path", {
        required: "Title required",
        minLength: {
          value: 5,
          message: "add new item ",
        },
      })}
      className={inputClasses}
      type="text"
      placeholder="Enter the title for the road map"
    />
    {errors.goal && (
      <InputErrorDisplay>{errors.goal.message}</InputErrorDisplay>
    )}

    <button
      className={buttonClasses}
      type="submit"
    >
      {isSubmitting ? "Loading.." : "Add"}
    </button>

    <InputErrorDisplay className="text-2xl">{}</InputErrorDisplay>
  </form>
  )
}

export default PathForm
