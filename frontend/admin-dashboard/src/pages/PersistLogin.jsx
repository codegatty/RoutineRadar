import {Outlet} from 'react-router-dom';
import { useState,useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useRefresh from '../hooks/useRefresh';
import {useNavigate} from 'react-router-dom'

function PersistLogin(){
    const {login,token}=useAuth();
    const tokenRefresher=useRefresh();
    const navigate=useNavigate();
    const [isLoading, setLoading] = useState(true);
    
    useEffect(()=>{
        const tokenId=token()
        const verifyRefreshToken=async ()=>{
            try{
                const response=await tokenRefresher();
                console.log("response persist login"+response)
                if(response===401 || response===500){
                    navigate("/login",{replace:true});
                }
            }catch(e){
                console.log(e);
            }finally{
                setLoading(false);
            }
        }

        !tokenId?verifyRefreshToken():setLoading(false);
    },[])
    return <>
    {
        isLoading?<div>Loading...</div>:
        <Outlet/>
    }
    </>
}

export default PersistLogin;