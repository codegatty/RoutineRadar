const async_handler=require("express-async-handler")
const axios=require('axios')
const User=require("../model/userModel")


const badge_service_url=process.env.BADGE_SERVICE
const routine_service_url=process.env.ROUTINE_SERVICE

const getBadgesByUserId=async_handler(async (req,res)=>{
    const userId=req.params.id;
    const promise1=await User.findOne({_id:userId})
    
    const promise2=await axios.get(`${routine_service_url}/routine/${userId}`)


    const [user,routine]=await Promise.all([promise1,promise2])

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    let badges=[]
    user.badges.forEach((badgeNo)=>{
        badges.push(badgeNo)
    })

    routine.data[0].badges.forEach((badgeNo)=>{
        badges.push(badgeNo)
    })
    

    const response = await axios.get(`${badge_service_url}/badges/fetchBadges`, {
        params: { ids: badges.join(',') } 
    });
    res.status(200).json(response.data)
    
})

module.exports={getBadgesByUserId}


