const asyncHandler = require("express-async-handler");
const axios=require("axios");

const badgeIp="172.18.0.5:5008"
const getBadges=asyncHandler(async (req,res)=>{
    try{
    const result=await axios.get(`http://${badgeIp}/badges`);
    return res.json(result.data);
    }catch(e){
        console.log(e);
        return res.status(500).json({message:"Internal server error"});
    }
});

const getBadgeByBadgeNo=asyncHandler(async (req,res)=>{
    const badgeNo=req.params.badgeNo;
    const result=await axios.get(`http://${badgeIp}/badges/${badgeNo}`);
    return res.json(result.data);
});

const createBadge=asyncHandler(async (req,res)=>{
    const data=req.body
    axios.post(`http://${badgeIp}/badges`,data).then((response)=>{
        return res.status(201).json(response.data)
    }).catch((error)=>{
        return res.status(400).json(error.message)
    });
    
});

const updateBadge=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    const body=req.body;
    
    axios.put(`http://${badgeIp}/badges/${id}`,body).then((result)=>{
        return res.json(result.data);
    }).catch((err)=>{
        res.status(400).json({message: err.message});
    });
    
});

const deleteBadge=asyncHandler(async (req,res)=>{
    const id=req.params.id
    axios.delete(`http://${badgeIp}/badges/${id}`).then((result)=>{
        return  res.json(result.data);
    }).catch((error)=>{
        return res.status(400).json({message: error.message});
    }); 
});

module.exports = { getBadges, createBadge, updateBadge, deleteBadge, getBadgeByBadgeNo }




