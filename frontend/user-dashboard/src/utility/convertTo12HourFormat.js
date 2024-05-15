export function convertTo12HourFormat(time) {
    // Split the input time into hours and minutes
    let [hour, minute] = time.split(':').map(Number);
  
    // Determine the period (AM/PM)
    const period = hour >= 12 ? 'PM' : 'AM';
  
    // Adjust the hour for 12-hour format
    hour = hour % 12 || 12;
  
    // Format the minute to always be two digits
    minute = minute.toString().padStart(2, '0');
  
    // Return the formatted time
    return `${hour}:${minute} ${period}`;
  }
  
 

  