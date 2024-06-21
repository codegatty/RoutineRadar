
const express=require("express")
const router=express.Router()

// Import controller
const {updateRating}=require("../controller/ratingController")
const tokenValidator=require("../middleware/tokenValidator")

// Define routes
router.put("/:id",tokenValidator, updateRating)

module.exports=router