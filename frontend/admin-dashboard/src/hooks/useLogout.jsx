import useAuth from './useAuth';
import {axios_public} from '../axios_config/axiosConfig'

function useLogout() {
    const {logout}=useAuth();
    async function logOut(){
        try{
            const response=await axios_public.get("http://localhost:5000/admin/auth/logout",{withCredentials:true});
            logout();
        }catch(err){
            console.log(err);
        }
    }
  return logOut;
}

export default useLogout
