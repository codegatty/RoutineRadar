import { useForm } from "react-hook-form";
import { useContext } from "react";
import InputErrorDisplay from "../UIComponents/InputErrorDisplay";
import { RoutineContext } from "../context/RoutineProvider";


function RoutineForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();
      const routineCtx=useContext(RoutineContext)

      async function submitHandler(data) {
        const {goal,type}=data
        const finalData={
            goal,
            type,
            tasks:[],
            subTasks:[]
        }
        routineCtx.storeRoutine(finalData)
      }
  return (
    <form
    className="flex flex-col w-96 bg-primary rounded-md shadow-sm shadow-secondary "
    onSubmit={handleSubmit(submitHandler)}
  >
    <h1 className="text-center text-2xl mt-5 font-bold text-primary">
      Create Account
    </h1>

    <input
      {...register("goal", {
        required: "Goal required",
        minLength: {
          value: 5,
          message: "Goal should be at least 5 characters",
        },
      })}
      className="p-2 m-5 bg-neutral-300 "
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
      className="p-2 m-5 bg-neutral-300 "
      type="text"
      placeholder="Enter the type of routine"
    />
    {errors.type && (
      <InputErrorDisplay>{errors.type.message}</InputErrorDisplay>
    )}

    <button
      className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold"
      type="submit"
    >
      {isSubmitting ? "Loading.." : "Login"}
    </button>

    <InputErrorDisplay className="text-2xl">error</InputErrorDisplay>
  </form>
  )
}

export default RoutineForm
