const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const axios=require("axios");

const User=require("../model/userModel");

//@desc create a new user 
//@route POST /user/auth/register
//@access public
const registerUser=asyncHandler(async (req,res)=>{
    const profilePic=req.file.filename
    const {userName,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    if(!userName||!email||!password){
        return res.status(400).json({msg:"Please fill all the fields"});
    }

    const isUserExist=await User.findOne({email});

    if(isUserExist){
        return res.status(400).json({msg:"Admin already exists"});
    }

    const newUser=await User.create({
        userName,
        email,
        password:hashedPassword,
        profilePic,
    })

    if(newUser){
        res.status(201).json({msg:"User created successfully"});   
    }else{
        res.status(400).json({msg:"Something went wrong"});
    }
})

//@desc login a admin
//@route POST /user/auth/login
//@access public
const loginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({msg:"Please fill all the fields"});
    }
    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({msg:"User not found"});
    }else if(!await bcrypt.compare( password,user.password)){
        return res.status(400).json({msg:"Invalid password"});
    }else{
        
        const token=jwt.sign({user:{
            id:user.id,
            userName:user.userName,
            email:user.email,
        }},process.env.SECRET_KEY,{expiresIn:"30m"})
        res.status(200).json({token:token});
    }
})


//@desc delete a challenge
//@route DELETE /user/id
//@access private
const deleteUser=asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({msg:"user not found"});
    }

    await User.deleteOne({_id:req.params.id});
    
   
    res.status(200).json({message:"deletion successful"});
})

//@desc update a challenge
//@route PUT /user/id
//@access private
const updateUser=asyncHandler(async(req,res)=>{
    const {userName,email}=req.body;

    if(!userName || !email){
        return res.status(400).json({msg:"Please fill all the fields"});
    }

    const user=await User.findByIdAndUpdate(req.params.id,{
        userName,
        email,
    },{new:true});
    if(!user){
        return res.status(404).json({msg:"no such user"});
    }
    return res.status(200).json(user);

})


//@desc get all users availabe for only admin service
//@route PUT /user/getAllUsers
//@access private
const getAllUsers=asyncHandler(async (req,res)=>{
    const data=await User.find({},"-password -experience -__v -badges");
    if(!data){
        res.status(404).json({msg:"Something went wrong"});
    }
    res.status(200).json(data);
})

//@desc get all users availabe for only admin service
//@route PUT /user/getAllUsers
//@access private
const getUserCount=asyncHandler(async (req,res)=>{
    const userCount=await User.estimatedDocumentCount();

    if(!userCount)
    return res.status(400).send({message: "bad request"})

    res.status(200).json({userCount:userCount});
})

const getUser=asyncHandler(async (req,res)=>{
    const accessToken=req.headers.authorization.split(' ')[1]

    const response= await axios.get("https://dev-4jfiy6jgo6zsib84.us.auth0.com/userinfo",{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
        
    })
    const currentUser=response.data

    const user=await User.findOne({email:currentUser.email});
    
    if(!user ) {
        const newUser=await User.create({
            userName:currentUser.nickname,
            email:currentUser.email,
            profilePic:currentUser.picture,
        })
        return res.status(200).json(newUser);
    }else{
        return res.status(200).json(user);
    }
   
   
    res.status(200).json(response.data);
});


module.exports={registerUser,
    loginUser,
    deleteUser,
    updateUser,
    getAllUsers,
    getUserCount,
    getUser
}