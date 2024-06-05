const express=require('express');
const route=express.Router();

const {createRoadMap,deleteRoadMap,getRoadMapsByUserId,updateIsCompleted,addPaths}=require('../controller/roadMapController');

// Specific routes with parameters should come first
route.put('/update_isCompleted/:id', updateIsCompleted);
route.put('/add_path/:id', addPaths);
route.delete('/:id', deleteRoadMap);

// General routes without parameters come after
route.post('/', createRoadMap);
route.get('/:userId', getRoadMapsByUserId);

// route.post('/',createRoadMap);

// route.put('/update_isCompleted/:id',updateIsCompleted);

// route.put('/add_path/:id',addPaths)

// route.delete('/:id',deleteRoadMap);

// route.get('/:userId',getRoadMapsByUserId);



module.exports=route;