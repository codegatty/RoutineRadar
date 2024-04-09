import useAuth from '../hooks/useAuth';
import {axios_public } from '../axios_config/axiosConfig';
import axios from "axios"

function useRefresh(){
    const {login}=useAuth();
    async function tokenRefresher(){
        try{
            const response=await axios_public.post("auth/refresh",null)
            
            login(response.data.accessToken);
            console.log(response.data.accessToken);

        }catch(err){
            console.log(err)
        }        
        
    }
    return tokenRefresher;
}

export default useRefresh;