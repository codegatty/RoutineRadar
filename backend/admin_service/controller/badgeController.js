const asyncHandler = require("express-async-handler");
const axios=require("axios");

const getBadges=asyncHandler(async (req,res)=>{
    const result=await axios.get("http://localhost:5008/badges");
    console.log(result.status);
    return res.json(result.data);
});

const getBadgeByBadgeNo=asyncHandler(async (req,res)=>{
    const badgeNo=req.params.badgeNo;
    const result=await axios.get(`http://localhost:5008/badges/:${badgeNo}`);
    return res.json(result.data);
});

const createBadge=asyncHandler(async (req,res)=>{
    const result=await axios.get("http://localhost:5008/badges");
    return res.json(result.data);
});

const updateBadge=asyncHandler(async (req,res)=>{
    const result=await axios.get("http://localhost:5008/badges");
    return res.json(result.data);
});

const deleteBadge=asyncHandler(async (req,res)=>{
    const result=await axios.get("hhttp://localhost:5008/badges");
    return res.json(result.data);
});

module.exports = { getBadges, createBadge, updateBadge, deleteBadge, getBadgeByBadgeNo }




