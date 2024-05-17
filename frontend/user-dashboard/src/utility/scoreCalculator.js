import {baseScore} from '../constants/baseTaskScore'
export function scoreCalculator(weightage){
    return (weightage/100)*baseScore
}

//?calculate score from subtask and adding to current score
export function scoreCalculatorFromTask(sel_task,curr_score){
    let up_score=0
    if(sel_task.subTasks.length===0 ){
        up_score=scoreCalculator(sel_task.weightage)+curr_score
    }else{
        const total_weightage=sel_task.subTasks.reduce((acc,curr)=>{
            if(curr.isCompleted){
                return acc+curr.weightage;
            }else{
                return acc;
            }
        },0)
        up_score=scoreCalculator(total_weightage)+curr_score
    }
    return up_score;
}

//?calculate score from subtask without adding to current score
export function scoreCalculatorFromTasks(sel_task){
    let up_score=0
    
    if(sel_task.subTasks.length===0){
        if(sel_task.isCompleted){
            up_score=scoreCalculator(sel_task.weightage)
        }else{
            return 0;
        }
        
    }else{
        const total_weightage=sel_task.subTasks.reduce((acc,curr)=>{
            if(curr.isCompleted){
                return acc+curr.weightage;
            }else{
                return acc;
            }
        },0)
        up_score=scoreCalculator(total_weightage)
    }
    return up_score;
}

export function scoreProvider(sel_task){
    let up_score=0
    
    if(sel_task.subTasks.length===0){
        
            up_score=scoreCalculator(sel_task.weightage)

        
    }else{
        const total_weightage=sel_task.subTasks.reduce((acc,curr)=>{
            if(curr.isCompleted){
                return acc+curr.weightage;
            }else{
                return acc;
            }
        },0)
        up_score=scoreCalculator(total_weightage)
    }
    return up_score;
}

