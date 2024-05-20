import { useForm } from "react-hook-form";
import InputErrorDisplay from "../UIComponents/InputErrorDisplay";
import { RoutineContext } from "../context/RoutineProvider";
import { useContext,useEffect,useState } from "react";
import { axios_public,axios_user } from "../axios_config/axiosConfig";

function TaskForm({defaultValue,selectedIndex}) {
  const inputClasses="p-2 m-5 bg-secondary rounded-2xl text-primary text-sm font-semibold"
  const buttonClasses="p-2 m-5 bg-app-blue hover:bg-secondary hover:text-primary rounded-xl text-secondary font-semibold"
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
  
  
  async function submitHandler(data) {
    

    const userId=routineCtx.routine.userId;
    try{

      if(isUpdate){
        const taskId=routineCtx.routine.tasks[selectedIndex]._id
        //?convert the weightage to number
        const finalData={...data,taskId};

        const response=await axios_public.put(`/task/update/${userId}`,finalData);
        routineCtx.updateTask(selectedIndex,{...data,weightage:parseInt(data.weightage)});
      }else{
          const response=await axios_public.put(`/task/add/${userId}`,{...data,weightage:100});
          //const finalData={...data,weightage:parseInt(data.weightage)}
          const finalData={...data,weightage:100}
          routineCtx.addTask({...finalData,subTasks:[],_id:response.data._id});
      }
      
    }catch(error){
      console.log(error.message);
    }
    
  }

  async function deleteHandler(){
    const userId=routineCtx.routine.userId;
    const taskId=routineCtx.routine.tasks[selectedIndex]._id
    try{
       await axios_public.put(`/task/delete/${userId}`,{taskId});
        routineCtx.deleteTask(selectedIndex);
        setIsUpdate(false);
    }catch(error){
      console.log(error);
    }
    
    setIsUpdate(false)
  }

  function handleAddNewTask(){
    defaultValue=null
    setIsUpdate(false)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col w-96 bg-primary h-full " >
      <h1 className="text-primary text-3xl text-center mt-5">Task</h1>
    <h2 className="text-primary text-md text-center ">({defaultValue?.title})</h2>
      <input
        {...register("title", {
          required: "Title required",
          minLength: {
            value: 5,
            message: "title should be at least 5 characters",
          },
        })}
        className={inputClasses}
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
        className={inputClasses}
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
        className={inputClasses}
        type="time"
        aria-label="Time"
        placeholder="Enter the title for task"
      />

      {errors.endsAt && (
        <InputErrorDisplay>{errors.endsAt.message}</InputErrorDisplay>
      )}

      {/* <input
        {...register("weightage", {
          required: " weightage required",
        })}
        className={inputClasses}
        type="number"
        aria-label="Time"
        placeholder="Enter the weightage for task"
      /> */}

      {errors.weightage && (
        <InputErrorDisplay>{errors.weightage.message}</InputErrorDisplay>
      )}



      {
        isUpdate?<div className="flex flex-row justify-around">
          <button
        className={buttonClasses}
        type="submit"
      >
        {isSubmitting ? "Loading.." : "update"}
      </button>

      <button
        className={buttonClasses}
        onClick={deleteHandler}
      >
        {isSubmitting ? "Loading.." : "Delete"}
      </button>

      <button
        className={buttonClasses}
        onClick={handleAddNewTask}
      >
        {isSubmitting ? "Loading.." : "Add"}
      </button>

        </div>
        :<button
        className={buttonClasses}
        type="submit"
        
      >
        {isSubmitting ? "Loading.." : "Add"}
      </button>
      }
   
    </form>
  );
}

export default TaskForm;
