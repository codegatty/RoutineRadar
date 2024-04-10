import useAuth from '../hooks/useAuth';
import {axios_public } from '../axios_config/axiosConfig';
import axios from "axios"

function useRefresh(){
    const {login}=useAuth();
    async function tokenRefresher(){
        try{
            try{
                const res=await axios_public.post('/auth/refresh',{},{withCredentials:true});
                login(res.data.accessToken)
            }catch(err){
                console.log(err.response.msg);
            }

        }catch(err){
            console.log(err)
        }        
        
    }
    return tokenRefresher;
}

export default useRefresh;