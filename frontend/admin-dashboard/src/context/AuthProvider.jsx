import { createContext,useState } from "react";


export const AuthContext = createContext({
    tokenId:null,
    currentAdmin:null,
    isAuth:false,
    stroreToken:(token)=>{},
    logout:()=>{},
    current:(current)=>{}
});


function AuthContextProvider({children}){
    const [tokenId,setTokenId] = useState(null);
    const [currentAdmin,setCurrtentAdmin]=useState(null);

    function stroreToken(token){
        setTokenId(token);
    }

    function logout(){
        setTokenId(null);
        setCurrtentAdmin(null);
    }

    function current(current){
        setCurrtentAdmin(current)
    }

    const values={
        tokenId,
        currentAdmin,
        isAuth:tokenId!==null,
        stroreToken,
        logout,
        current
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthContextProvider;