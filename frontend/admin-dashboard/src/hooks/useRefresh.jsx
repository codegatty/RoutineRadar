import useAuth from '../hooks/useAuth';
import {axios_public } from '../axios_config/axiosConfig';

function useRefresh(){
    const {login}=useAuth();
    async function tokenRefresher(){
            try{
                const res=await axios_public.post('/auth/refresh',{},{withCredentials:true});
                login(res?.data.accessToken)
                return res?.status
            }catch(err){
                return res.status
            }     
        
    }
    return tokenRefresher;
}

export default useRefresh;