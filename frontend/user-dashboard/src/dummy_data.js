export const dummy_data = {
  goal: 'Improve coding skills',
  type: 'Study',
  tasks: [
    {
      title: 'Morning Coding Session',
      startsAt: '08:00',
      endsAt: '10:00',  
      weightage: '70',
      isCompleted: true,
      subTasks: [
        {
          description: 'Practice algorithms',
          weightage: '40',
          isCompleted: true
        },
        {
          description: 'Work on coding projects',
          weightage: '30',
          isCompleted: false
        }
      ]
    },
    {
      title: 'Afternoon Study Break',
      startsAt: '13:00',
      endsAt: '13:30',
      weightage: '10',
      isCompleted: false,
      subTasks: [
        {
          description: 'Take a short walk',
          weightage: '10',
          isCompleted: false
        }
      ]
    },
    {
      title: 'Evening Coding Session',
      startsAt: '18:00',
      endsAt: '20:00',
      weightage: '20',
      isCompleted: false,
      subTasks: [
        {
          description: 'Review code from morning session',
          weightage: '10',
          isCompleted: false
        },
        {
          description: 'Read coding blogs/articles',
          weightage: '10',
          isCompleted: false
        }
      ]
    }
  ]
}


export let lineChartData={
  labels: ["Monday", "Tuesday", "Wednesday","Thursday", "Friday", "Saturday", "Sunday"], 
  datasets:[
      {
          label:"steps",
          data:[100, 200, 300, 400, 500, 600, 700],
          borderColor:"rgba(0,0,0)", 
      },
      {
          label:"run",
          data:[60, 130, 200, 630, 50, 200, 340],
          borderColor:"rgba(255,0,0)", 
      }
  ]
}