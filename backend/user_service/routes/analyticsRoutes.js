const express= require('express');
const router=express.Router();
const tokenValidator=require("../middleware/tokenValidator")

const {fetchAnalytics,updatedAnalytics}=require("../controller/analyticsController")

router.get("/:id",tokenValidator,fetchAnalytics)
router.put("/:id",updatedAnalytics)

module.exports=router;