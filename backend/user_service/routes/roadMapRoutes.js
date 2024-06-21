const express=require('express');
const route=express.Router();

const {createRoadMap,deleteRoadMap,getRoadMapsByUserId,updateIsCompleted,addPaths}=require('../controller/roadMapController');
const tokenValidator=require("../middleware/tokenValidator")
// Specific routes with parameters should come first
route.put('/update_isCompleted/:id',tokenValidator, updateIsCompleted);
route.put('/add_path/:id',tokenValidator, addPaths);
route.delete('/:id',tokenValidator, deleteRoadMap);

// General routes without parameters come after
route.post('/',tokenValidator, createRoadMap);
route.get('/:userId',tokenValidator, getRoadMapsByUserId);

// route.post('/',createRoadMap);

// route.put('/update_isCompleted/:id',updateIsCompleted);

// route.put('/add_path/:id',addPaths)

// route.delete('/:id',deleteRoadMap);

// route.get('/:userId',getRoadMapsByUserId);



module.exports=route;