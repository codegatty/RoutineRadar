import { Fragment, useEffect, useState, useContext, useCallback } from 'react'
import { RoadmapContext } from '../context/RoadmapProvider'
import { Select, Checkbox } from '@headlessui/react'
import classNames from 'classnames'
import { UserContext } from '../context/userContext'
import { axios_user } from '../axios_config/axiosConfig'

export const RoadMapViewerAdv = () => {
  const [selectedRoadMap, setSelectedRoadMap] = useState(null)
  const [arrayOfComplete, setArrayOfComplete] = useState(null)

  const roadMapCtx = useContext(RoadmapContext)
  const userCtx = useContext(UserContext)

  function optionChangeHandler(e) {
    if (e.target.value) {
      const currentRoadMap = roadMapCtx.roadMaps.filter((ele) => ele._id === e.target.value)
      const newPath = currentRoadMap[0]?.paths?.map((ele) => {
        return ele.isCompleted
      })
      setSelectedRoadMap(currentRoadMap[0])
      setArrayOfComplete(newPath)
    } else {
      setSelectedRoadMap(null)
      setPath(null)
    }
  }

  async function isCompleteHandler(updatedData) {
    try {
      console.log(updatedData)
      const finalData = {
        isCompleted: updatedData.isEnabled,
        userId: userCtx.userId,
        pathId: selectedRoadMap.paths[updatedData.index]._id
      }
      await axios_user.put('roadMap/update_isCompleted/' + selectedRoadMap._id, finalData)
      roadMapCtx.updateIsCompleted(selectedRoadMap._id, updatedData.index, updatedData.isEnabled)
      const updatedArrayOfCompletion = arrayOfComplete.map((ele, idx) => {
        if (idx == updatedData.index) return updatedData.isEnabled
        return ele
      })
      setArrayOfComplete(updatedArrayOfCompletion)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-72 px-4 py-4 flex flex-col">
      <div className=" w-full flex gap-1 justify-center items-center">
        {/* <span className='flex-1 text-sm text-white font-bold text-center'>Select Road Map</span> */}
        <Select
          name="status"
          aria-label="Project status"
          className="flex-1 bg-primary text-white text-sm border border-1 border-white m-2 rounded-lg p-2"
          onChange={optionChangeHandler}
        >
          <option value={null}>Select a roadMap</option>
          {roadMapCtx?.roadMaps?.map((roadMap, idx) => {
            return (
              <option value={roadMap._id} key={idx}>
                {roadMap.title}
              </option>
            )
          })}
        </Select>
      </div>

      <div className="  pb-32 flex flex-col  h-screen w-full my-4  overflow-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary ">
        {selectedRoadMap ? (
          selectedRoadMap.paths.map((path, key) => {
            return (
              <Fragment key={key}>
                <div className="flex flex-col items-center mx-auto">
                  <span className="text-white capitalize font-semibold text-sm my-1">{path.name}</span>
                  <Circle arrayOfComplete={arrayOfComplete} index={key} onUpdateIsComplete={isCompleteHandler} />
                  {key !== selectedRoadMap.paths.length - 1 && <Pillar isEnabled={arrayOfComplete[key]} />}
                </div>
              </Fragment>
            )
          })
        ) : (
          <div className={classNames('h-screen flex justify-center items-center')}>
            <h1 className=" flex-1 font-bold text-secondary text-xl text-center">Select a RoadMap</h1>
          </div>
        )}

        {/* <Circle/> */}
      </div>
    </div>
  )
}

const Circle = ({ arrayOfComplete, index, onUpdateIsComplete }) => {
  const [isEnabled, setEnabled] = useState(arrayOfComplete[index])
  useEffect(() => {
    setEnabled(arrayOfComplete[index])
  }, [arrayOfComplete, index])

  function changeHandler() {
    if (index == 0 || arrayOfComplete[index - 1] === true) {
      const updatedData = { index, isEnabled: !isEnabled }
      setEnabled(updatedData.isEnabled)
      onUpdateIsComplete(updatedData)
    }
  }

  return (
    <div
      className={classNames(
        'rounded-full w-6 h-6 p-1   hover:bg-secondary mx-auto mb-3 flex justify-center content-center',
        isEnabled ? 'bg-secondary' : 'bg-primary'
      )}
    >
      <Checkbox
        className=" flex-1 group block w-full h-full rounded-full border bg-white data-[checked]:bg-secondary"
        checked={isEnabled}
        onChange={changeHandler}
      ></Checkbox>
    </div>
  )
}

const Pillar = ({ isEnabled }) => {
  return (
    <div
      className={classNames(
        'rounded-t-full rounded-b-full w-1 h-20 border border-5 border-secondary  mx-auto',
        isEnabled ? 'bg-app-blue animate-ping_once ' : 'bg-primary'
      )}
    ></div>
  )
}

const EventCard = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col gap-y-2  border shadow-md rounded-xl p-4">
      <div className="text-blue-800 font-bold text-lg border-b">{heading}</div>
      <div className="text-sm text-gray-700">{subHeading}</div>
    </div>
  )
}
