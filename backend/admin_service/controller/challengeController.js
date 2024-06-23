const axios=require('axios')
const asyncHandler=require('express-async-handler')
const Admin=require("../model/adminModel")


const challenge_service_url=process.env.CHALLENGE_SERVICE

//@desc get all chellanges based on admin
//@route GET /challenge
//@access private

const getChallenges = asyncHandler(async (req, res) => {
    axios.get(challenge_service_url + "/challenge/detailed").then(async (response) => {
        const data=response.data;
            const enrichedData = await Promise.all(data.map(async (ele) => {
                
                 const adminName = await Admin.findOne({ _id: ele.createdBy }, { adminName: 1, _id: 0 });
                    
                return { ...ele, 
                    createdBy: adminName?.adminName?adminName.adminName:"Removed admin",createdAt:new Date(ele.createdAt).toLocaleDateString('en-CA') ,
                    updatedAt:new Date(ele.updatedAt).toLocaleDateString('en-CA')
                };
                
            }));
        
            return res.status(200).json(enrichedData);

   }).catch((err)=>{
       console.log(err)
       return res.status(400).json({message:"couldn't fetch challenges"})
    })
    
})


//@desc create a new challenge
//@route POST /challenge
//@access public
const createChallenge = asyncHandler(async (req, res) => {

    const { name, type, duration, weightage, description } = req.body;

    if (!name || !type || !duration || !weightage || !description) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }
    const challenge = {
        name,
        type,
        duration,
        weightage,
        description,
        createdBy: req.admin.id
    }

    axios.post(challenge_service_url + "/challenge",challenge).then((response) => {
        return res.status(201).json(response.data);

    }).catch((err)=>{
        return res.status(400).json({message:"couldn't create challenges"})
    })

})

//@desc delete a challenge
//@route DELETE /challenge/id
//@access public
const deleteChallenge = asyncHandler(async (req, res) => {

    axios.delete(`${challenge_service_url}/challenge/${req.params.id}`).then((response) => {
        return res.status(200).json(response.data);

    }).catch((err)=>{
        return res.status(400).json({message:"couldn't create challenges"})
    })

})

//@desc update a challenge
//@route PUT /challenge
//@access public
const updateChallenge = asyncHandler(async (req, res) => {
    const { name, type, duration, weightage, description } = req.body;

    if (!name || !type || !duration || !weightage || !description) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }
    const challenge ={
            name,
            type,
            duration,
            weightage,
            description,
        }
    
    axios.put(`${challenge_service_url}/challenge/${req.params.id}`,challenge).then((response) => {
        return res.status(200).json(response.data);

    }).catch((err)=>{
        console.log(err)
        return res.status(400).json({message:"couldn't update challenge"})
    })

})




module.exports = { getChallenges, createChallenge, updateChallenge, deleteChallenge }




