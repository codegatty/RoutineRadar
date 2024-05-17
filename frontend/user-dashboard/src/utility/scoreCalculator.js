import {baseScore} from '../constants/baseTaskScore'
export function scoreCalculator(weightage){
    return (weightage/100)*baseScore
}

export function scoreCalculatorFromTask(sel_task,curr_score){
    let up_score=0
    if(sel_task.subTasks.length===0 ){
        up_score=scoreCalculator(sel_task.weightage)+state.score
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