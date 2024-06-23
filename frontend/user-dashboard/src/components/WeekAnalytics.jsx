import { useContext, useEffect } from 'react'
import LineGraph from '../UIComponents/Analytics/LineGraph'
import PieGraph from '../UIComponents/Analytics/PieGraph'
import ProductivityViewer from './ProductivityViewer'
import classNames from 'classnames'
import { axios_user } from '../axios_config/axiosConfig'
import { UserContext } from '../context/userContext'
import { AnalyticsContext } from '../context/AnalyticsContext'
import WeekStreak from './WeekStreak'

function WeekAnalytics({ className, isRoutineExist }) {
  const userCtx = useContext(UserContext)
  const analyticsCtx = useContext(AnalyticsContext)

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await axios_user.get(`/analytics/${userCtx.userId}`)

        analyticsCtx.storeAnalytics(response.data)
      } catch (err) {
        console.log('Something error while fetching analytics')
      }
    }

    fetchAnalytics()
  }, [])

  return (
    <div
      className={classNames(
        'h-full p-2 overflow-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary mb-5 border border-b-0 border-t-2 border-l-0 border-r-0  border-gray-600',
        className
      )}
    >
      {analyticsCtx.analytics && 
        <div className="grid grid-cols-2 gap-1">
          <div className="">{isRoutineExist && <ProductivityViewer />}</div>
          <div className="">{isRoutineExist && <WeekStreak />}</div>
          <div>{isRoutineExist && <LineGraph />}</div>
          <div>{isRoutineExist && <PieGraph />}</div>
        </div>
      }
    </div>
  )
}

export default WeekAnalytics
