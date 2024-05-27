import { Fragment, useEffect, useState,useContext,useCallback } from 'react'
import { RoadmapContext } from '../context/RoadmapProvider'
import classNames from 'classnames'

export const RoadMapViewer = ({ roadMap }) => {
  const [selectedRoadMap, setSelectedRoadMap] = useState()
  const [id,setId]=useState();
  const roadMapCtx = useContext(RoadmapContext)
  useEffect(() => {
    if (roadMap) {
      setSelectedRoadMap(roadMap[0].paths)
      setId(roadMap[0]._id)
      refreshViewer()
    }
  }, [roadMap,roadMapCtx.roadMaps])

  const refreshViewer=useCallback(() =>{
    const currentRoadMap = roadMapCtx.roadMaps.filter((roadMap) =>roadMap._id === id)
    if(currentRoadMap[0]){    
      setSelectedRoadMap(currentRoadMap[0].paths)
    }
  },[roadMapCtx.roadMaps])
  return (
    <div className="flex flex-col  w-full my-4 text-red-400">
      {selectedRoadMap ? (
        selectedRoadMap.map((path, key) => {
          return (
            <Fragment key={key}>
              <div className="flex flex-col items-center mx-auto">
                <span>{path}</span>
                <Circle />
                {key !== selectedRoadMap.length - 1 && <Pillar />}
              </div>
            </Fragment>
          )
        })
      ) : <div className={classNames('h-screen flex justify-center items-center')}>
    <h1 className=' flex-1 font-bold text-secondary text-xl text-center'>Select a RoadMap</h1>
          </div>}
      {/* <Circle/> */}
    </div>
  )
}

const Circle = () => {
  return <div className="rounded-full w-4 h-4 bg-blue-500 mx-auto mb-3 flex justify-center content-center"></div>
}

const Pillar = () => {
  return <div className="rounded-t-full rounded-b-full w-2 h-20 bg-blue-500 mx-auto"></div>
}

const EventCard = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col gap-y-2  border shadow-md rounded-xl p-4">
      <div className="text-blue-800 font-bold text-lg border-b">{heading}</div>
      <div className="text-sm text-gray-700">{subHeading}</div>
    </div>
  )
}
