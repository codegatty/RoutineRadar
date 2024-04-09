import { createContext,useState } from "react";


export const AuthContext = createContext({
    tokenId:null,
    isAuth:false,
    stroreToken:(token)=>{},
    logout:()=>{}
});


function AuthContextProvider({children}){
    const [tokenId,setTokenId] = useState(null);

    function stroreToken(token){
        setTokenId(token);
    }

    function logout(){
        setTokenId(null);
    }

    const values={
        tokenId,
        isAuth:tokenId!==null,
        stroreToken,
        logout
    }
    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
    
}

export default AuthContextProvider;