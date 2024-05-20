import classNames from 'classnames'

function ProgressViewer({ className, userData }) {
  return (
    <div className={classNames(className, 'flex items-center justify-center flex-col')}>
      <div className="flex flex-col w-96 bg-secondary rounded-md shadow-sm shadow-secondary ">
        <div className="flex flex-row my-3 mx-1">
          <label className="flex-1 text-center font-bold text-primary">Experience: </label>
          <span className="flex-1 bg-app-blue text-center rounded-lg font-bold text-secondary">{userData?.experience}</span>
        </div>

        <div className="flex flex-row my-3 mx-1">
          <label className="flex-1 text-center font-bold text-primary">Is Routine in use: </label>
          <span className="flex-1 bg-app-blue text-center rounded-lg font-bold text-secondary">{userData?.isRoutine?"yes":"No"}</span>
        </div>

      </div>
      <div className="flex flex-row gap-2 my-3 mx-1 bg-secondary w-96 h-20 p-1  rounded-md shadow-sm shadow-secondary">
          <label className="flex-2 text-center font-bold text-primary">Badges </label>
          <div className='flex-1'>
            {userData?.badges.length>=0?<span className='font-bold text-slate-900 text-xl text-center' >No Badges attained</span>:"badges are coming soon"}
          </div>
        </div>

    </div>
  )
}

export default ProgressViewer
