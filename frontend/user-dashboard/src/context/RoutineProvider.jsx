import { createContext,useReducer } from "react";

export const RoutineContext=createContext({
    routine:null,
    storeRoutine:(routine)=>{},
    updateRoutine:(routine)=>{},
    deleteRoutine:()=>{},
    addTask:(task)=>{},
    addSubTask:(index,subtask)=>{},
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

    function addSubTask(index,subTask){
        dispatch({type:'ADDSUBTASK',payload:{index:index,subTask:subTask}});
    }

    const values={
        routine:routineState,
        updateRoutine:updateRoutine,
        deleteRoutine:deleteRoutine,
        storeRoutine:storeRoutine,
        addTask:addTask,
        addSubTask:addSubTask,
    }

    return (
        <RoutineContext.Provider value={values}>
            {children}
        </RoutineContext.Provider>
    )
}

export default RoutineContextProvider;