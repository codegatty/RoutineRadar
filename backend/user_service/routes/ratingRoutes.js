
const express=require("express")
const router=express.Router()

// Import controller
const {updateRating}=require("../controller/ratingController")

// Define routes
router.put("/:id", updateRating)

module.exports=router