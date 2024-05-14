import SubTaskItem from "../UIComponents/SubTaskItem"
import Hr from "../UIComponents/Hr"

function TaskItem({task}){
  
  return (
    <div className='flex flex-col hover:bg-secondary' >
      <div className='flex flex-row justify-around'>
        <input className="flex-2" type="checkbox"  checked={task.isCompleted}/>
        <h4 className='flex-1'>{task.title}</h4>
      </div>

      <div className='flex flex-row justify-around'>
          <span>{task.startsAt}</span>
          <span>{task.endsAt}</span>
      </div>
      <div>
        {
          task.subTasks.map((subTask,index)=>{
            return <SubTaskItem key={index} subTask={subTask}/>
          })
        }

      </div>
    <Hr/>
    </div>
  )
}

export default TaskItem
