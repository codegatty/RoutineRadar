// WeekStreak.js
import {useContext}from 'react'
import {AnalyticsContext} from '../context/AnalyticsContext'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const WeekStreak = () => {
  const analyticsCtx=useContext(AnalyticsContext)
  return (
    <div className="flex justify-center items-center space-x-2 p-4 ">
      {daysOfWeek.map((day, index) => (
        <div
          key={index}
          className={`w-10 h-10 flex justify-center items-center rounded-full font-bold border border-1 border-primary ${
            analyticsCtx.analytics.weeklyTaskData[index]>0 ? 'bg-app-blue text-white' : 'bg-gray-300 text-primary'
          }`}
        >
          <span className="">{day.charAt(0)}</span>
        </div>
      ))}
    </div>
  );
};

export default WeekStreak;
