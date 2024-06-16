const express=require("express")
const router=express.Router()

const {getRating,updateRating}=require("../controller/ratingController")

router.get("/", getRating)
router.put("/:star", updateRating)

module.exports=router