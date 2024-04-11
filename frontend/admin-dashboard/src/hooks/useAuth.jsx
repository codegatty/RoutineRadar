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

    function getCurrentAdmin(){
        return authCtx.currentAdmin;
    }

    function setCurrentAdmin(admin){
        authCtx.current(admin);
    }

    return {login, logout, authState,token,getCurrentAdmin,setCurrentAdmin}
}

export default useAuth
