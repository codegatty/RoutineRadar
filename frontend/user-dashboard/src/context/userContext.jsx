import { createContext,useState } from "react";


export const UserContext = createContext({
    userId:null,
    userData:null,
    storeUser:(user)=>{},
    logout:()=>{}
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

    const values={
        userId,
        userData,
        storeUser,
        logout
    }
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )
    
}

export default UserContextProvider;