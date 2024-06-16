const asyncHandler=require("express-async-handler")

const Rating=require("../model/ratingsModel")

const getRating=asyncHandler(async(req,res)=>{

    const result=await Rating.findOne({})

    res.status(200).json(result);

})

const updateRating=asyncHandler(async (req,res)=>{
    const selectedStar=parseInt(req.params.star);
    
    const result=await Rating.updateOne({},{
        $inc:{[`stars.${selectedStar-1}`]:1}
        },{new:true})
    res.status(200).json(result);

})

module.exports={getRating,updateRating}

