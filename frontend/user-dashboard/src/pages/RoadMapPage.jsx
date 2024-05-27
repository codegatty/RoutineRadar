import {useContext} from 'react'
import { RoadmapProvider } from '../context/RoadmapProvider'
function RoadMapPage() {
    const roadmapCtx=useContext(RoadmapProvider)
    function fetchRoadMap(){
        //TODO:connect with backend
    }

  return (
    <div>
      
    </div>
  )
}

export default RoadMapPage
