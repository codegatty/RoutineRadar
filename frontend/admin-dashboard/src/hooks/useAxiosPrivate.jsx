import {axios_private} from '../axios_config/axiosConfig'
import { useEffect } from 'react'
import useRefresh from '../hooks/useRefresh'
function useAxiosPrivate() {

    const tokenRefresher=useRefresh();

    useEffect(()=>{
        const responseInterceptor=axios_private.interceptors.response.use((response)=>{
            return response;
        },
        async (error)=>{
            const prevRequest=error?.config
            console.log("intercepting response...");
            if(error?.response?.status===401 && !prevRequest?.sent){
                prevRequest.sent = true;
                const accessToken=await tokenRefresher();
                prevRequest.headers['Authorization']=`Bearer ${accessToken}`;
                return axios_private(prevRequest);
            }
            return Promise.reject(error);
        })

        return ()=>{
            axios_private.interceptors.response.eject(responseInterceptor)
        }
    },[tokenRefresher])

  return axios_private
}

export default useAxiosPrivate
