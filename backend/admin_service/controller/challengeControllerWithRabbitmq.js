const asyncHandler = require("express-async-handler");
const { challengeCREDProducer } = require("../rabbitMq/challenge_cred_producer");
const { challengeResponseConsumer } = require("../rabbitMq/challenge_response_consumer");


//@desc get all chellanges based on admin
//@route GET /challenge
//@access private

const getChallenges = asyncHandler(async (req, res) => {
    challengeCREDProducer("getAll", {})
    challengeResponseConsumer()
     new Promise((resolve, reject) => {
        try {
            process.once('responseReceived', (receivedData) => {
                resolve(receivedData);
            });
        } catch (e) {
            reject(e);
        }
    }).then((response) => {
        return res.status(200).json(response);
    }).catch((err) => {
        console.log(err)
        return res.status(400).json({msg:"something went wrong"});
    });
    
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
    challengeCREDProducer("create", challenge)
    challengeResponseConsumer()
    new Promise((resolve, reject) => {
        try {
            process.once('responseReceived', (receivedData) => {
                resolve(receivedData);
            });
        } catch (e) {
            reject(e);
        }
    }).then((response) => {
        return res.status(201).json(response);
    }).catch((err) => {
        return res.status(400).json({msg:"couldn't create new challenge"});
    });

    // return res.status(201).json("chellange created successfully");
})

//@desc delete a challenge
//@route DELETE /challenge/id
//@access public
const deleteChallenge = asyncHandler(async (req, res) => {

    challengeCREDProducer("delete", { id: req.params.id })

    challengeResponseConsumer()
    new Promise((resolve, reject) => {
        try {
            process.once('responseReceived', (receivedData) => {
                resolve(receivedData);
            });
        } catch (e) {
            reject(e);
        }
    }).then((response) => {
        if(!response ||response==null){
            return res.status(400).json({msg:"couldn't delete challenge"});
        }else{
            return res.status(200).json(response);
        }
        
    }).catch((err) => {
        return res.status(400).json({msg:"couldn't delete challenge"});
    });
})

//@desc update a challenge
//@route PUT /challenge
//@access public
const updateChallenge = asyncHandler(async (req, res) => {
    const { name, type, duration, weightage, description } = req.body;

    if (!name || !type || !duration || !weightage || !description) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }



    const challenge = {
        id: req.params.id, challenge: {
            name,
            type,
            duration,
            weightage,
            description,
        }
    }
    challengeCREDProducer("update", challenge)

    challengeResponseConsumer()
    new Promise((resolve, reject) => {
        try {
            process.once('responseReceived', (receivedData) => {
                resolve(receivedData);
            });
        } catch (e) {
            reject(e);
        }
    }).then((response) => {
        if(!response ||response==null){
            return res.status(400).json({msg:"couldn't update challenge"});
        }else{
            return res.status(200).json(response);
        }
        
    }).catch((err) => {
        return res.status(400).json({msg:"couldn't update challenge"});
    });
})

const test = asyncHandler(async (req, res) => {
    return res.send("all fine");
})


module.exports = { getChallenges, createChallenge, updateChallenge, deleteChallenge, test }




