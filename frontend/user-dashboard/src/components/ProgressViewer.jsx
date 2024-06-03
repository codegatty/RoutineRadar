import { useEffect, useState } from 'react'
import { axios_user } from '../axios_config/axiosConfig'
import classNames from 'classnames'
import { Popover } from 'flowbite-react'

function ProgressViewer({ className, userData }) {
  const [badges, setBadges] = useState([])

  useEffect(() => {
    async function fetchBadges() {
      const response = await axios_user.get(`badge/${userData._id}`)
      setBadges(response.data)
    }
    fetchBadges()
  }, [])

  return (
    <div className={classNames(className, 'flex items-center justify-center flex-col py-10')}>
      <div className="flex flex-col w-96  rounded-md shadow-sm shadow-secondary flex-1">
        <div className="flex flex-row my-3 mx-1">
          <label className="flex-1 text-center font-bold text-primary">Experience: </label>
          <span className="flex-1 bg-app-blue text-center rounded-lg font-bold text-secondary">
            {userData?.experience}
          </span>
        </div>

        <div className="flex flex-row my-3 mx-1">
          <label className="flex-1 text-center font-bold text-primary">Is Routine in use: </label>
          <span className="flex-1 bg-app-blue text-center rounded-lg font-bold text-secondary">
            {userData?.isRoutineCreated ? 'yes' : 'No'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2 my-3 mx-1  bg-secondary   p-1   rounded-md shadow-sm shadow-secondary fill-emerald-50 flex-1 ">
        <label className=" text-center font-bold text-primary">Badges </label>
        <div className="flex-1 flex flex-row justify-center items-center">
        <label className="flex-2 text-center font-bold text-primary">profile Badges </label>
          {badges.length === 0 ? (
            <span className="font-bold text-slate-900 text-xl text-center">No Badges attained</span>
          ) : (
            <BadgeViewer badges={badges} type="profile" />
          )}
        </div>
        <div className="flex-1 flex flex-row justify-center items-center">
        <label className=" text-center font-bold text-primary">Routine Badges </label>
          {badges.length === 0 ? (
            <span className="font-bold text-slate-900 text-xl text-center">No Badges attained</span>
          ) : (
            <BadgeViewer badges={badges} type="routine" />
          )}
        </div>
      </div>
    </div>
  )
}

const BadgeViewer = ({ badges, type }) => {
  let filtered_badges = []
  if (type == 'profile') {
    filtered_badges = badges.filter((badge) => badge.badgeno >= 2000 && badge.badgeno <= 2999)
  } else if (type == 'routine') {
    filtered_badges = badges.filter((badge) => badge.badgeno >= 1000 && badge.badgeno <= 1999)
  }
  return (
    <div className="flex flex-row h-full w-full gap-5 ">
      {filtered_badges?.map((badge) => {
        return (
          <Popover
            aria-labelledby="default-popover"
            trigger="hover"
            content={
              <div className="w-64 text-sm text-gray-500 dark:text-gray-400 border border-1 border-app-blue">
                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                  <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">
                    {badge.title}
                  </h3>
                </div>
                <div className="px-3 py-2 text-app-blue font-semibold">
                  <p>{badge.description}</p>
                </div>
              </div>
            }
          >
            <div className="flex flex-col border border-1 border-app-blue p-1 rounded-lg">
              <img src={badge.image} className="rounded-full border border-1 border-app-blue" />
              <span className="text-center font-semibold text-sm capitalize text-app-blue">{badge.title}</span>
            </div>
          </Popover>
        )
      })}
    </div>
  )
}

export default ProgressViewer
