import {createContext,useReducer} from 'react'
import {roadMap} from '../dummy_data'

export const RoadmapContext=createContext({
    roadMaps:[],
    storeRoadMaps:(roadMaps)=>{},
    addRoadMap:(roadMap)=>{},
    updateRoadMap:(id,roadMap)=>{},
    addPath:(id,path)=>{},
    deleteRoadMap:(id)=>{},
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
            let updatedPaths=[action.payload.path,...currentRoadMap[0].paths]
            const updatedRoadMap={...currentRoadMap[0],paths:updatedPaths}
            const updatedState=state.map((roadMap)=>{
                if(roadMap._id===action.payload.id){
                    return updatedRoadMap
                }
                return roadMap
            })
            
            return updatedState
        case 'DELETE':
            return state;
        
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

    const value={
        roadMaps: roadmapState,
        storeRoadMaps,
        addRoadMap,
        updateRoadMap,
        deleteRoadMap,
        addPath,
    }

    return <RoadmapContext.Provider value={value}>
        {children}
    </RoadmapContext.Provider>
}

export default RoadmapContextProvider;