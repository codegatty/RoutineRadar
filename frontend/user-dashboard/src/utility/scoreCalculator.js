import {baseScore} from '../constants/baseTaskScore'
export function scoreCalculator(weightage){
    return (weightage/100)*baseScore
}