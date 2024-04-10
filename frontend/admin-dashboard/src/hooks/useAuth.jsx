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
        return authCtx.isAuth;
    }

    function token(){
        return authCtx.tokenId;
    }

    return {login, logout, authState,token}
}

export default useAuth
