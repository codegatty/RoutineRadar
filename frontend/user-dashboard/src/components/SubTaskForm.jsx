import {useForm} from 'react-hook-form'
import ListOfTasks from './ListOfTasks';
import ListOfSubTasks from './ListOfSubTasks';

function SubTaskForm() {

    const {register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();
    
      function submitHandler(data){
        console.log(data);
        //TODO:send data to backend
      }
  return (
    <div>
        <div className='flex flex-row border border-1 '>
        <ListOfTasks/>
        <ListOfSubTasks/>
        </div>
        
      <form onSubmit={handleSubmit(submitHandler)} className="border ">
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
      {errors.goal && (
        <InputErrorDisplay>{errors.title.message}</InputErrorDisplay>
      )}

<input
        {...register("description", {
          required: "description required",
          minLength: {
            value: 5,
            message: "description should be at least 5 characters",
          },
        })}
        className="p-2 m-5 bg-neutral-300 "
        type="text"
        placeholder="Enter the title for task"
      />
      {errors.goal && (
        <InputErrorDisplay>{errors.description.message}</InputErrorDisplay>
      )}

      
      <button className='p-2 m-5 bg-neutral-300 hover:bg-neutral-500 font-bold'type='submit' >{isSubmitting?"Loading..":"create"}</button> 

    </form>



    </div>
  )
}

export default SubTaskForm
