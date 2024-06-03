export function rangeValidator(value){
    if(value<=0){
        return "value must be grater than zero"
    }else{
        return true
    }
}

export function rangeValidator2(value){
    if(value<1000 && value>2999){
        return "value should be within 1000 and 2999"
    }else{
        return true
    }
}

