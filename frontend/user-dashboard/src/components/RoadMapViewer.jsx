import { Fragment, useEffect, useState,useContext } from 'react'
import { RoadmapContext } from '../context/RoadmapProvider'
import classNames from 'classnames'

export const RoadMapViewer = ({ roadMapId }) => {
  const [selectedRoadMapPath,setSelectedRoadMapPath]=useState(null)
  const roadMapCtx = useContext(RoadmapContext)

  useEffect(()=>{
    if(roadMapId){
      setSelectedRoadMapPath(roadMapCtx.roadMaps.find(roadMap=>roadMap._id===roadMapId)?.paths)
    }else{
      setSelectedRoadMapPath(null)
    }
  },[roadMapId,roadMapCtx.roadMaps])
  return (
    <div className="flex flex-col  w-full h-screen my-4  overflow-scroll scrollbar-thin scrollbar-thumb-secondary scrollbar-track-primary ">
      {selectedRoadMapPath ? (
        selectedRoadMapPath.map((path, key) => {
          return (
            <Fragment key={key}>
              <div className="flex flex-col items-center mx-auto">
              <span className='text-primary capitalize font-semibold text-md my-1'>{path.name}</span>
                <Circle />
                {key !== selectedRoadMapPath.length - 1 && <Pillar />}
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
  return <div className="rounded-full w-6 h-6 bg-secondary mx-auto mb-3 flex justify-center content-center "></div>
}

const Pillar = () => {
  return <div className="rounded-t-full rounded-b-full w-2 h-20 bg-secondary  mx-auto"></div>
}

const EventCard = ({ heading, subHeading }) => {
  return (
    <div className="flex flex-col gap-y-2  border shadow-md rounded-xl p-4">
      <div className="text-blue-800 font-bold text-lg border-b">{heading}</div>
      <div className="text-sm text-gray-700">{subHeading}</div>
    </div>
  )
}
