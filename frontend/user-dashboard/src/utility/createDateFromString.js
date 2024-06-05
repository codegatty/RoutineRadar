export function createDateFromString(timeInString){
  if(timeInString){
    const [hour,minute]=timeInString?.split(':').map(Number);
    const date=new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  }
  }

  