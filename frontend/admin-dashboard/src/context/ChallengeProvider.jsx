import { createContext,useReducer } from "react";

export const ChallengeContext=createContext({
    challenges:[],
    addChallenge:(challenge)=>{},
    updateChallenge:(id,challenge)=>{},
    deleteChallenge:(id)=>{},
    storeChallenges:(challenges)=>{},
})

function challengeReducer(state,action){
    switch(action.type){
        case 'ADD':
            return [...state,action.payload]
        case 'UPDATE':
            const updateChallengeIndex=state.findIndex((challenge)=>challenge.id===action.payload.id);
            const updateChallenge = state[updateChallengeIndex];
            const updatedChallenge={...updateChallenge,...action.payload.challengeData};
            const updateChallengeData = [...state];
            updateChallengeData[updateChallengeIndex]=updatedChallenge;
            return updateChallengeData;
        case 'STORE':
            const inverted=action.payload.reverse();
            return inverted;
        case 'DELETE':
            const newState=state.filter((ele)=>ele._id!==action.payload)
            return newState;
    }
}

function ChallengeContextProvider({children}){
    const [challengeState,dispatch]=useReducer(challengeReducer,[]);

    function addChallenge(challenge){
        dispatch({type:'ADD',payload:challenge})

    }

    function updateChallenge(id,challenge){
        dispatch({type:'UPDATE',payload:{id:id,challengeData:challenge}})

    }

    function deleteChallenge(id){
        dispatch({type:'DELETE',payload:id})

    }

    function storeChallenges(challenges){
        dispatch({type:'STORE',payload:challenges});
    }

    const values={
        challenges:challengeState,
        addChallenge,
        updateChallenge,
        deleteChallenge,
        storeChallenges
    }

    return (
        <ChallengeContext.Provider value={values}>
            {children}
        </ChallengeContext.Provider>
    )
}

export default ChallengeContextProvider;