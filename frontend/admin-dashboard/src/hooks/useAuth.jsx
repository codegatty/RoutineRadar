import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function useAuth() {
    const authCtx = useContext(AuthContext);
    function login(token){
        authCtx.stroreToken(token)
    }   

    function logout(){
        authCtx.logout();
    }

    function authState(){
        console.log(authCtx.tokenId)
        return authCtx.isAuth;
    }

    return {login, logout, authState}
}

export default useAuth
