import {useEffect,useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {axios_user} from '../axios_config/axiosConfig'
import {UserContext} from '../context/userContext'
import Title from '../UIComponents/Title'
import {RoutineContext} from '../context/RoutineProvider'

function ArchivedRoutine(){ 
    const userCtx=useContext(UserContext)
    const routineCtx=useContext(RoutineContext)
    const navigator=useNavigate();
    const [routines,setRoutines]=useState([])
    let score=0;
    let noOfBadges=-1;
const [bestRoutineIndex,setBestRoutineIndex]=useState(-1)
    useEffect(()=>{
        async function fetchArchivedRoutines(){
            try{
                const response =await axios_user.get(`/archived_routine/${userCtx?.userId}`)
                setRoutines(response.data)

                for(let i=0;i<routines.length;i++){
                    if(routines[i].score>score){
                        if(routines[i].badges.length>noOfBadges || noOfBadges==-1){
                            setBestRoutineIndex(i)
                        }
                    }
                }

            }catch(e){
                console.log("something went wrong while fetching archived routines")
            }
        }
        fetchArchivedRoutines()
    },[])

    async function reUseHandler(routineId){
        try{
            const response=await axios_user.post(`/archived_routine/re_use/${routineId}`,{userId:userCtx.userId})
            routineCtx.storeRoutine(response.data)
            navigator("/routine",{replace:true})
            
        }catch(er)
        {
            console.log("something wrong while reusing the routine"+er)
        }

    }

    async function deleteHandler(routineId){
    
        try{
            const response=await axios_user.delete(`/archived_routine/delete/${routineId}`)
            navigator("/archived_routine",{replace:true})
            
        }catch(er)
        {
            console.log(er)
            console.log("something wrong while deleting the routine"+er)
        }

    }

    return(
        <div className='w-screen h-screen bg-primary flex flex-col justify-center items-center gap-5'>
            <Title className="text-primary text-center mt-5 text-xl">Archived Routines</Title>
            {routines.length>0?
            <ul className='text-primary text-md h-full my-10  overflow-y-scroll scrollbar-thin scrollbar-thumb-primary scrollbar-track-secondary '>
                {
                    routines.map((ele,index)=>{

                        return (
                            <li key={ele._id} className='className=" cursor-pointer flex flex-row m-10 p-5 bg-secondary capitalize gap-4 rounded-md'>
                            <div className=' flex flex-col'>
                                <span>goal: <span className='font-semibold'>{ele.goal}</span></span>
                                <span>type: <span className='font-semibold'>{ele.type}</span></span>
                                <span>score: <span className='font-semibold'>{ele.score}</span> </span>
                            </div>
                            <div className='flex flex-col'>
                                <span>createdAt: <span className='font-semibold'>{ele.createdAt}</span></span>
                                <span>badges: <span className='font-semibold'>{ele.badges.join(',')}</span></span>
                                <span className='text-blue-800 font-semibold'>{index===bestRoutineIndex&&"best routine for choice"}</span>
                            </div>
                            <div className=''>
                            <button className='p-1 m-3 bg-app-blue hover:bg-primary hover:text-primary rounded-xl text-secondary font-semibold' onClick={reUseHandler.bind(this,ele._id)}>Reuse</button>
                            <button className='p-1 m-3 bg-app-blue hover:bg-primary hover:text-primary rounded-xl text-secondary font-semibold' onClick={deleteHandler.bind(this,ele._id)}>Delete</button>
                            </div>
                        </li>
                        )

                    })
                }

            </ul>
       :<div className='h-full flex justify-center items-center'>
       <h1 className='flex-1 font-bold text-secondary text-xl'>No Routine Found in Archive</h1> 
       </div>
       } 
       
        </div>
    )
}

export default ArchivedRoutine