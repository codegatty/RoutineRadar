const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const Admin=require("../model/adminModel");


//@desc create a new admin by existing admin
//@route POST /admin/auth/register
//@access private
const registerAdmin=asyncHandler(async (req,res)=>{
    const {adminName,email,password}=req.body;
    const hashedPassword=await bcrypt.hash(password,10);

    if(!adminName||!email||!password){
        return res.status(400).json({msg:"Please fill all the fields"});
    }

    const isAdminExist=await Admin.findOne({email});

    if(isAdminExist){
        return res.status(400).json({msg:"Admin already exists"});
    }

    const newAdmin=await Admin.create({
        adminName,
        email,
        password:hashedPassword,
        createdBy:req.admin.id
    })

    if(newAdmin){
        res.status(201).json({msg:"Admin created successfully"});   
    }else{
        res.status(400).json({msg:"Something went wrong"});
    }
})

//@desc login a admin
//@route POST /admin/auth/login
//@access public
const loginAdmin=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.status(400).json({msg:"Please fill all the fields"});
    }
    const admin=await Admin.findOne({email});

    if(!admin){
        return res.status(400).json({msg:"Admin not found"});
    }else if(!await bcrypt.compare( password,admin.password)){
        return res.status(400).json({msg:"Invalid password"});
    }else{
        
        const token=jwt.sign({admin:{
            id:admin.id,
            adminName:admin.adminName,
            email:admin.email,
            createdBy:admin.createdBy
        }},process.env.SECRET_KEY,{expiresIn:"30m"})
        res.status(200).json({token:token});
    }
})


const test=(req,res)=>{
    res.send("test");
}
module.exports={
    registerAdmin,
    loginAdmin,test
}