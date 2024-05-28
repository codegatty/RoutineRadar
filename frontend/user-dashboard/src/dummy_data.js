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

export const roadMap=[
  {
      "_id": "66529343a3016784a7a28aae",
      "title": "full stack developer",
      "description": "hello ",
      "paths": [
          {name:"frontend",isCompleted:false},
          {name:"backend",isCompleted:false},
          {name:"deployment",isCompleted:false},
          {name:"managment",isCompleted:false}
      ],
      "userId": "664b27854996d0f0839223ea",
      "__v": 0
  },
  {
    "_id": "66529343a3016784a7a28aaf",
    "title": "half stack developer",
    "description": "hello ",
    "paths": [
      {name:"electronics",isCompleted:true},
      {name:"physics",isCompleted:false},
      {name:"biology",isCompleted:false}
    ],
    "userId": "664b27854996d0f0839223eg",
    "__v": 0
},
{
  "_id": "66529343a3016784a7a28aag",
  "title": "empty stack developer",
  "description": "hello ",
  "paths": [
    {name:"html",isCompleted:true},
    {name:"css",isCompleted:false},
    {name:"javascript",isCompleted:false},
  ],
  "userId": "664b27854996d0f0839223ea",
  "__v": 0
}
]