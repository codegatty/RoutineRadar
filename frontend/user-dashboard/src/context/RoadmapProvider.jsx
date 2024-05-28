import {createContext,useReducer} from 'react'
import {roadMap} from '../dummy_data'

export const RoadmapContext=createContext({
    roadMaps:[],
    storeRoadMaps:(roadMaps)=>{},
    addRoadMap:(roadMap)=>{},
    updateRoadMap:(id,roadMap)=>{},
    addPath:(id,path)=>{},
    deleteRoadMap:(id)=>{},
    updateIsCompleted:(id,isCompleted)=>{},
})


function RoadmapReducer(state,action){
    switch(action.type){
        case 'STORE':
            return action.payload;
        case 'ADD':
            return [...state,action.payload];
        case 'UPDATE':
            return state;
        case 'ADDPATH':
            
             const currentRoadMap=state.filter((roadMap)=>roadMap._id==action.payload.id)
            let updatedPaths=[{name:action.payload.path,isCompleted:false},...currentRoadMap[0].paths]
            const updatedRoadMap={...currentRoadMap[0],paths:updatedPaths}
            const updatedState=state.map((roadMap)=>{
                if(roadMap._id===action.payload.id){
                    return updatedRoadMap
                }
                return roadMap
            })
            
            return updatedState
        case 'DELETE':
            
            const newState=state.filter((ele)=>ele._id!==action.payload)
            return newState;
        case 'UPDATEISCOMPLETED':
            const index=action.payload.index;
            const isCompleted=action.payload.isCompleted;
            const id=action.payload.id;
    
             const cur_RoadMap=state.filter((roadMap)=>roadMap._id==id)[0]
            const up_paths=cur_RoadMap.paths.map((path,idx)=>{
                if(idx===index){
                    return {...path,isCompleted:isCompleted}
                }
                return path;
            })
            const up_roadMap={...cur_RoadMap,paths:up_paths}
            const new_state=state.map((ele)=>{
                if(ele._id===id){
                    return up_roadMap
                }
                return ele
            })
            console.log(new_state)
            
            return new_state;
        
    }
}

function RoadmapContextProvider({children}){

    const [roadmapState, dispatch] = useReducer(RoadmapReducer, roadMap)

    function storeRoadMaps(roadMaps) {
        dispatch({ type: 'STORE', payload: roadMaps })
    }

    function addRoadMap(roadMap) {
        dispatch({ type: 'ADD', payload: roadMap })
    }

    function updateRoadMap(id, roadMap) {
        dispatch({ type: 'UPDATE', payload: { id: id, roadMapData: roadMap } })
    }

    function addPath(id, path) {
        dispatch({ type: 'ADDPATH', payload: { id: id, path: path } })
    }

    function deleteRoadMap(id) {
        dispatch({ type: 'DELETE', payload: id })
    }

    function updateIsCompleted(id,index,isCompleted) {
        dispatch({ type: 'UPDATEISCOMPLETED', payload:{id,index,isCompleted} })
    }


    const value={
        roadMaps: roadmapState,
        storeRoadMaps,
        addRoadMap,
        updateRoadMap,
        deleteRoadMap,
        addPath,
        updateIsCompleted
    }

    return <RoadmapContext.Provider value={value}>
        {children}
    </RoadmapContext.Provider>
}

export default RoadmapContextProvider;