import { createContext,useReducer } from "react";
import { dummy_data } from "../dummy_data";

export const RoutineContext=createContext({
    routine:null,
    storeRoutine:(routine)=>{},
    updateRoutine:(routine)=>{},
    deleteRoutine:()=>{},
    addTask:(task)=>{},
    updateTask:(index,task)=>{},
    deleteTask:(index)=>{},
    updateTaskIsCompleted:(taskId)=>{},
    addSubTask:(index,subtask)=>{},
    updateSubTask:(taskIndex,subtaskIndex,subTask)=>{},
    deleteSubTask:(taskIndex,subtaskIndex)=>{},
    updateSubTaskIsCompleted:(subTaskId,taskId)=>{},
    

})

function routineReducer(state,action){
    switch(action.type){
        case 'UPDATE':
            return action.payload
        case 'STORE':
            return action.payload
        case 'DELETE':
            return null;
        case 'ADDTASK':
            return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };

    case 'UPDATETASK':
        const selectedTask=state.tasks[action.payload.index]
        const updatedTask={...selectedTask,...action.payload.task}
        const updateTasks=state.tasks.map((task,index)=>{
            if(index===action.payload.index){
                return updatedTask;
            }
            return task;
        })


        return {...state,tasks:updateTasks}; 

    case  'DELETETASK':
        const uTasks=state.tasks.filter((task,index)=>index!=action.payload)
        
        return {...state,tasks:uTasks};

    case 'UPDATETASKISCOMPLETE':
        const sel_task=state.tasks.find(task=>task._id===action.payload)
        const up_task={...sel_task,isCompleted:!sel_task.isCompleted}
        const up_tasks=state.tasks.map((task,index)=>{
            if(task._id==action.payload){
                return up_task
            }
            return task
        })
        
        return {...state,tasks:up_tasks}
        
      case 'ADDSUBTASK':

        const updatedTasks=state.tasks.map((task,index)=>{
            if(index==action.payload.index){
                const oldSubTasks=task.subTasks;
                const newSubTasks=[...oldSubTasks,action.payload.subTask];
                return {
                   ...task,
                    subTasks:newSubTasks
                }
            }
            return task;
        });
        return {
            ...state,
            tasks: updatedTasks
          };

          case 'UPDATESUBTASK':
            const selected_task=state.tasks[action.payload.taskIndex]
        
            const selected_sub_tasks=selected_task.subTasks
            const selected_sub_task=selected_sub_tasks[action.payload.subtaskIndex]
            const updated_sub_task={...selected_sub_task,...action.payload.subTask}
            const updated_sub_tasks=selected_sub_tasks.map((subTask,index)=>{
                if(index===action.payload.subtaskIndex){
                    return updated_sub_task;
                }
                return subTask
            })
            
            const updated_task={...selected_task,subTasks:updated_sub_tasks}

            

            const updated_tasks=state.tasks.map((task,index)=>{
                if(index===action.payload.taskIndex){
                    return updated_task
                }
                return task
            })
            
            return {...state,tasks:updated_tasks};  
        case 'DELETESUBTASK':
            const task=state.tasks[action.payload.taskIndex].subTasks
            const newSubTasks=task.filter((subTask,index)=>index!==action.payload.subtaskIndex)
            const updated_Task={...state.tasks[action.payload.taskIndex],subTasks:newSubTasks}
            const updated_Tasks=state.tasks.map((task,index)=>{
                if(index===action.payload.taskIndex){
                    return updated_Task
                }
                return task
            })
            
            return {...state,tasks:updated_Tasks};  

        case 'UPDATESUBTASKISCOMPLETE':
            const sele_task=state.tasks.find(task=>task._id===action.payload.taskId)
            const sel_subTask=sele_task.subTasks.find(subtask=>subtask._id===action.payload.subTaskId)
        
            const up_subTask={...sel_subTask,isCompleted:!sel_subTask.isCompleted}

            const up_subTasks=sele_task.subTasks.map((subTask,index)=>{
                if(subTask._id===action.payload.subTaskId)
                    return up_subTask
                return subTask
            })
            const new_updated_task={...sele_task,subTasks:up_subTasks}
            const new_updated_tasks=state.tasks.map((task)=>{
                if(task._id===action.payload.taskId)
                    return new_updated_task
                return task
            })

            return {...state,tasks:new_updated_tasks};

    }
}

function RoutineContextProvider({children}){
    const [routineState,dispatch]=useReducer(routineReducer,null);


    function updateRoutine(routine){
        dispatch({type:'UPDATE',payload:routine})

    }

    function deleteRoutine(){
        dispatch({type:'DELETE'})

    }

    function storeRoutine(routine){
        dispatch({type:'STORE',payload:routine});
    }

    function addTask(task){
        dispatch({type:'ADDTASK',payload:task});
    }

    function updateTask(index,task){
        dispatch({type:'UPDATETASK',payload:{index:index,task:task}});
    }

    function deleteTask(index){
        dispatch({type:'DELETETASK',payload:index});
    }

    function addSubTask(index,subTask){
        dispatch({type:'ADDSUBTASK',payload:{index:index,subTask:subTask}});
    }

    function updateSubTask(taskIndex,subtaskIndex,subTask){
        dispatch({type:'UPDATESUBTASK',payload:{taskIndex:taskIndex,subtaskIndex:subtaskIndex,subTask:subTask}});
    }

    function deleteSubTask(taskIndex,subtaskIndex){
        dispatch({type:'DELETESUBTASK',payload:{taskIndex:taskIndex,subtaskIndex:subtaskIndex}});
    }

    function updateTaskIsCompleted(taskId){
        dispatch({type:'UPDATETASKISCOMPLETE',payload:taskId});
    }

    function updateSubTaskIsCompleted(taskId,subTaskId){
        dispatch({type:'UPDATESUBTASKISCOMPLETE',payload:{taskId,subTaskId}});
    }


    

    const values={
        routine:routineState,
        updateRoutine:updateRoutine,
        deleteRoutine:deleteRoutine,
        storeRoutine:storeRoutine,
        addTask:addTask,
        updateTask:updateTask,
        deleteTask:deleteTask,
        updateTaskIsCompleted:updateTaskIsCompleted,
        addSubTask:addSubTask,
        updateSubTask:updateSubTask,
        deleteSubTask:deleteSubTask,
        updateSubTaskIsCompleted:updateSubTaskIsCompleted,
    }

    return (
        <RoutineContext.Provider value={values}>
            {children}
        </RoutineContext.Provider>
    )
}

export default RoutineContextProvider;