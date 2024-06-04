import { createContext,useState } from "react";


export const UserContext = createContext({
    userId:null,
    userData:null,
    storeUser:(user)=>{},
    updateExperience:(val)=>{},
    deleteRoutine:()=>{},
    createRoutine:()=>{},
    logout:()=>{},
    updateChallengeId:(challengeId)=>{},
    updateParticipatedChallengeIds:(challengeId)=>{}
});


function UserContextProvider({children}){
    const [userId,setUserId] = useState(null);
    const [userData,setUserData] = useState(null);

    function storeUser(user){
        setUserId(user._id);
        setUserData(user);
    }

    function logout(){
        setUserId(null);
        setUserData(null);
    }

    function updateExperience(value){
        const currentExperience =userData.experience
        setUserData({...userData,experience:currentExperience+value})
    }

    function createRoutine(){
        const currentExperience =userData.experience
        setUserData({...userData,isRoutineCreated:true,experience:currentExperience+20})
        
    }

    function deleteRoutine(){
        const currentExperience =userData.experience
        setUserData({...userData,isRoutineCreated:false,experience:currentExperience+10})
      
    }

    function updateChallengeId(challengeId){
        setUserData({...userData,challengeId:challengeId})
      
    }

    function updateParticipatedChallengeIds(challengeId){
        const oldParticipatedChallenges=userData.participatedChallengeIds
        const currentExperience =userData.experience
        const updatedParticipatedChallengeIds=[challengeId,...oldParticipatedChallenges]
        setUserData({...userData,
            participatedChallengeIds:updatedParticipatedChallengeIds,
            challengeId:null,
            experience:currentExperience+10
        })
    }

    const values={
        userId,
        userData,
        storeUser,
        logout,
        updateExperience,
        createRoutine,
        deleteRoutine,
        updateChallengeId,
        updateParticipatedChallengeIds
    }
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
    
}

export default UserContextProvider;