const asyncHandler = require("express-async-handler");
const axios=require("axios");

const getBadges=asyncHandler(async (req,res)=>{
    const result=await axios.get("http://localhost:5008/badges");
    console.log(result.status);
    return res.json(result.data);
});

const getBadgeByBadgeNo=asyncHandler(async (req,res)=>{
    const badgeNo=req.params.badgeNo;
    const result=await axios.get(`http://localhost:5008/badges/${badgeNo}`);
    return res.json(result.data);
});

const createBadge=asyncHandler(async (req,res)=>{
    const data=req.body
    axios.post("http://localhost:5008/badges",data).then((response)=>{
        return res.status(201).json(response.data)
    }).catch((error)=>{
        return res.status(400).json(error.message)
    });
    
});

const updateBadge=asyncHandler(async (req,res)=>{
    const id=req.params.id;
    const body=req.body;
    
    axios.put(`http://localhost:5008/badges/${id}`,body).then((result)=>{
        return res.json(result.data);
    }).catch((err)=>{
        res.status(400).json({message: err.message});
    });
    
});

const deleteBadge=asyncHandler(async (req,res)=>{
    const id=req.params.id
    axios.delete(`http://localhost:5008/badges/${id}`).then((result)=>{
        return res.json(result.data);
    }).catch((error)=>{
        res.status(400).json({message: error.message});
    });
    
});

module.exports = { getBadges, createBadge, updateBadge, deleteBadge, getBadgeByBadgeNo }




