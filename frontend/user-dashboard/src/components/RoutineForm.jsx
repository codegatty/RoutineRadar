import { useForm } from "react-hook-form";
import { useContext } from "react";
import InputErrorDisplay from "../UIComponents/InputErrorDisplay";
import { RoutineContext } from "../context/RoutineProvider";
import {UserContext} from '../context/userContext'
import {axios_user} from '../axios_config/axiosConfig'


function RoutineForm() {

  const inputClasses="p-2 m-5 bg-secondary rounded-2xl text-primary text-sm font-semibold"
  const buttonClasses="p-2 m-5 bg-app-blue hover:bg-secondary hover:text-primary rounded-xl text-secondary font-semibold"
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();
      const routineCtx=useContext(RoutineContext)
      const userCtx=useContext(UserContext)

      async function submitHandler(data) {
        const {goal,type}=data
        const userId=userCtx.userId
        const finalData={
            goal,
            type,
            userId,
            tasks:[],
        }
        

        try{
          const response=await axios_user.post(`/routine`,finalData)
          routineCtx.storeRoutine(finalData)
        }catch(error){
          console.log("Something went wrong")
        }
      }
  return (
    <form
    className="flex flex-col w-96 "
    onSubmit={handleSubmit(submitHandler)}
  >
    <h1 className="text-center text-2xl mt-5 font-bold text-primary">
      Create New Routine
    </h1>

    <input
      {...register("goal", {
        required: "Goal required",
        minLength: {
          value: 5,
          message: "Goal should be at least 5 characters",
        },
      })}
      className={inputClasses}
      type="text"
      placeholder="Enter the Goal for routine"
    />
    {errors.goal && (
      <InputErrorDisplay>{errors.goal.message}</InputErrorDisplay>
    )}

    <input
      {...register("type", {
        required: "type required",
      })}
      className={inputClasses}
      type="text"
      placeholder="Enter the type of routine"
    />
    {errors.type && (
      <InputErrorDisplay>{errors.type.message}</InputErrorDisplay>
    )}

    <button
      className={buttonClasses}
      type="submit"
    >
      {isSubmitting ? "Loading.." : "Next"}
    </button>

    <InputErrorDisplay className="text-2xl">{}</InputErrorDisplay>
  </form>
  )
}

export default RoutineForm
