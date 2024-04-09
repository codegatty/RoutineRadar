import {useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {useNavigate} from "react-router-dom"

function ProtectedRoute({children}) {
    const {authState} =useAuth();
    const navigate=useNavigate();
    useEffect(()=>{
        if(authState()==false){
            navigate("/login",{replace:true});
        }    
    },[navigate,authState]);

return children;
}

export default ProtectedRoute
