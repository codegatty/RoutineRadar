
import {createDateFromString} from './createDateFromString'

export function triggerNotifications(data){
    const permission=Notification.permission;
    if(permission==="granted"){
      new Notification(data);
    }
  }
export function taskNotifier(routine){
    if(routine){
    const tasks=routine.tasks
    
    tasks.forEach(task => {
        
        const currentDate=new Date();
        const startTime=createDateFromString(task.startsAt)
        const endTime=createDateFromString(task.endsAt)

        const diff=startTime-currentDate
        if(diff>=0){
            setTimeout(()=>{
                triggerNotifications(`Task ${task.title} started`)
            },diff)
        }
    });

    }
}