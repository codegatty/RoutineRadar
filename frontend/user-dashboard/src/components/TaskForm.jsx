import { useForm } from "react-hook-form";
import InputErrorDisplay from "../UIComponents/InputErrorDisplay";
import { RoutineContext } from "../context/RoutineProvider";
import { useContext,useEffect,useState } from "react";

function TaskForm({defaultValue,selectedIndex}) {
  const [isUpdate,setIsUpdate]=useState(false)
  useEffect(()=>{
    if(defaultValue!==undefined) {
      setIsUpdate(true);
    }else{
      setIsUpdate(false);
    }
  },[defaultValue])

  const routineCtx=useContext(RoutineContext)
  
  const {register,handleSubmit,formState: { errors, isSubmitting, } } = useForm({values:{
    title:isUpdate?defaultValue.title:"",
    startsAt:isUpdate?defaultValue.startsAt:"",
    endsAt:isUpdate?defaultValue.endsAt:"",
    weightage:isUpdate?defaultValue.weightage:""
  }});
  
  
  function submitHandler(data) {
    if(isUpdate){
      routineCtx.updateTask(selectedIndex,data);
    }else{
      routineCtx.addTask({...data,subTasks:[]});
    }

    //TODO:send data to backend
    
  }

  function deleteHandler(){
    routineCtx.deleteTask(selectedIndex);
    setIsUpdate(false)
  }

  function handleAddNewTask(){
    defaultValue=null
    setIsUpdate(false)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col w-96 bg-primary rounded-md shadow-sm shadow-secondary">
      <input
        {...register("title", {
          required: "Title required",
          minLength: {
            value: 5,
            message: "title should be at least 5 characters",
          },
        })}
        className="p-2 m-5 bg-neutral-300 "
        type="text"
        placeholder="Enter the title for task"
      />
      
      {errors.title && (
        <InputErrorDisplay>{errors.title.message}</InputErrorDisplay>
      )}

      <input
        {...register("startsAt", {
          required: "starts at required",
        })}
        className="p-2 m-5 bg-neutral-300 "
        type="time"
        aria-label="Time"
        placeholder="Enter the title for task"
      />
      {errors.startsAt && (
        <InputErrorDisplay>{errors.startsAt.message}</InputErrorDisplay>
      )}

      <input
        {...register("endsAt", {
          required: "ends at required",
          minLength: {
            value: 5,
            message: "title should be at least 5 characters",
          },
        })}
        className="p-2 m-5 bg-neutral-300 "
        type="time"
        aria-label="Time"
        placeholder="Enter the title for task"
      />

      {errors.endsAt && (
        <InputErrorDisplay>{errors.endsAt.message}</InputErrorDisplay>
      )}

      <input
        {...register("weightage", {
          required: " weightage required",
        })}
        className="p-2 m-5 bg-neutral-300 "
        type="number"
        aria-label="Time"
        placeholder="Enter the weightage for task"
      />

      {errors.weightage && (
        <InputErrorDisplay>{errors.weightage.message}</InputErrorDisplay>
      )}



      {
        isUpdate?<div className="flex flex-row justify-around">
          <button
        className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold"
        type="submit"
      >
        {isSubmitting ? "Loading.." : "update Task"}
      </button>

      <button
        className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold"
        onClick={deleteHandler}
      >
        {isSubmitting ? "Loading.." : "Delete Task"}
      </button>

      <button
        className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold"
        onClick={handleAddNewTask}
      >
        {isSubmitting ? "Loading.." : "Add Task"}
      </button>

        </div>
        :<button
        className="p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold"
        type="submit"
      >
        {isSubmitting ? "Loading.." : "Add Task"}
      </button>
      }
   
    </form>
  );
}

export default TaskForm;
