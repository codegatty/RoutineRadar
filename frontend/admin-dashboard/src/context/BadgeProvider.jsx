import { createContext,useReducer } from "react";
import {badgeData} from '../dummyData'

export const BadgeContext=createContext({
    badges:[],
    addBadge:(badge)=>{},
    updateBadge:(id,badge)=>{},
    deleteBadge:(id)=>{},
    storeBadges:(badges)=>{},
})

function badgeReducer(state,action){
    switch(action.type){
        case 'ADD':
            return [...state,action.payload]
        case 'UPDATE':
            const updateBadgeIndex=state.findIndex((badge)=>badge.id===action.payload.id);
            const updateBadge = state[updateBadgeIndex];
            const updatedBadge={...updateBadge,...action.payload.badgeData};
            const updateBadgeData = [...state];
            updateBadgeData[updateBadgeIndex]=updatedBadge;
            return updateBadgeData;
        case 'STORE':
            const inverted=action.payload.reverse();
            return inverted;
        case 'DELETE':
            const newState=state.filter((ele)=>ele.id!==action.payload)
            return newState;
    }
}

function BadgeContextProvider({children}){
    const [badgeState,dispatch]=useReducer(badgeReducer,badgeData);

    function addBadge(badge){
        dispatch({type:'ADD',payload:badge})

    }

    function updateBadge(id,badge){
        dispatch({type:'UPDATE',payload:{id:id,badgeData:badge}})

    }

    function deleteBadge(id){
        dispatch({type:'DELETE',payload:id})

    }

    function storeBadge(badges){
        dispatch({type:'STORE',payload:badges});
    }

    const values={
        badges:badgeState,
        addBadge,
        updateBadge,
        deleteBadge,
        storeBadge
    }

    return (
        <BadgeContext.Provider value={values}>
            {children}
        </BadgeContext.Provider>
    )
}

export default BadgeContextProvider;