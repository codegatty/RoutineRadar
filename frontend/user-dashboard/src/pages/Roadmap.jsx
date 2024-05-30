import { useEffect, useState,useContext} from "react"
import ListOfRoadmap from "../components/ListOfRoadmap"
import RoadmapForm from "../components/RoadmapForm"
import {RoadmapContext} from '../context/RoadmapProvider'

import { RoadMapViewer } from "../components/RoadMapViewer"
import PathForm from "../components/PathForm"
function Roadmap() {

  const [roadMaps,setRoadMaps]= useState([]);
  const [selectedRoadMap,setSelectedRoadMap] = useState(null)
  const roadMapCtx=useContext(RoadmapContext);

  useEffect(()=>{
      setRoadMaps(roadMapCtx.roadMaps)
  },[roadMapCtx.roadMaps])

  function selectHandler(id){
    const sel_roadmap=roadMapCtx.roadMaps.filter((ele)=>ele._id==id)
    setSelectedRoadMap(sel_roadmap)
    
  }

  function newRoadMapHandler(){
    setSelectedRoadMap(false)
  }
  return (
    <div className="w-full h-screen  bg-primary flex flex-row overflow-hidden">
      <div className="flex-1">
      <RoadmapForm defaultValues={selectedRoadMap} onDisSelect={newRoadMapHandler}/>
     {selectedRoadMap && <PathForm roadMap={selectedRoadMap}/>} 
      </div>
      <div className="flex-1">
      <RoadMapViewer roadMapId={selectedRoadMap?selectedRoadMap[0]._id:null}/>
      </div>
      <div className="flex-1 ">
      <ListOfRoadmap maps={roadMaps} onSelect={selectHandler} />  
      </div>
     
    </div>
  )
}

export default Roadmap
