const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../model/adminModel");

//@desc create a new admin by existing admin
//@route POST /admin/auth/register
//@access private
const registerAdmin = asyncHandler(async (req, res) => {
  const { adminName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!adminName || !email || !password) {
    return res.status(400).json({ msg: "Please fill all the fields" });
  }

  const isAdminExist = await Admin.findOne({ email });

  if (isAdminExist) {
    return res.status(400).json({ msg: "Admin already exists" });
  }

  const newAdmin = await Admin.create({
    adminName,
    email,
    password: hashedPassword,
    createdBy: req.admin.id,
  });

  if (newAdmin) {
    res.status(201).json({ msg: "Admin created successfully" });
  } else {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

//@desc login a admin
//@route POST /admin/auth/login
//@access public
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill all the fields" });
  }
  const admin = await Admin.findOne({ email });

  if (!admin) {
    return res.status(400).json({ msg: "Admin not found" });
  } else if (!(await bcrypt.compare(password, admin.password))) {
    return res.status(400).json({ msg: "Invalid password" });
  } else {
    const accessToken = jwt.sign(
      {
        admin: {
          id: admin.id,
          adminName: admin.adminName,
          email: admin.email,
          createdBy: admin.createdBy,
        },
      },
      process.env.ACCESSTOKEN_SECRET_KEY,
      { expiresIn: "1m" }
    );

    const refreshToken = jwt.sign(
      {
        admin: {
          id: admin.id,
          adminName: admin.adminName,
          email: admin.email,
          createdBy: admin.createdBy,
        },
      },
      process.env.REFRESHTOKEN_SECRET_KEY,
      { expiresIn: "30m" }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 60 * 1000,
    });

    res.status(200).json({ accessToken: accessToken });
  }
});

//@desc refreshes the access token
//@route POST /admin/auth/refresh
//@access public
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies.refreshToken;

  if (!cookies)
    return res.status(401).json({ message: "authantication expired" });

  const refreshToken = req.cookies.refreshToken;

  jwt.verify(
    refreshToken,
    process.env.REFRESHTOKEN_SECRET_KEY,
    async (err, decodedInfo) => {
      
      if (err) {
        res.status(400);
      }
      
       const admin = await Admin.findOne({ email: decodedInfo?.admin.email });
      

      if (!admin) {
        return res.status(401).json({ msg: "Unautharized" });
      }

      const accessToken = jwt.sign(
        {
          admin: {
            id: admin.id,
            adminName: admin.adminName,
            email: admin.email,
            createdBy: admin.createdBy,
          },
        },
        process.env.ACCESSTOKEN_SECRET_KEY,
        { expiresIn: "1m" }
      );

      return res.status(200).json({ accessToken: accessToken });
    }
  );
 
});

//@desc refreshes the access token
//@route POST /admin/auth/current
//@access private

const currentAdmin = (req, res) => {
  const admin=req.admin
  res.json(admin);
};

//@desc refreshes the access token
//@route POST /admin/auth/current
//@access private

const getAllAdmins=asyncHandler(async (req,res)=>{
    const admins=await Admin.find({},'-password -__v -createdBy');
    res.json(admins);
})

//@desc logs out the current admin
//@route POST /admin/auth/logout
//@access public

const logOut=asyncHandler(async(req,res)=>{

  const cookie = req.cookies;

  if (!cookie?.refreshToken)
    return res.status(401).json({ message: "unautharized" });
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
  res.json({ message: "Log Out success" });
  
})

module.exports = {
  registerAdmin,
  loginAdmin,
  currentAdmin,
  refresh,
  getAllAdmins,
  logOut
};
