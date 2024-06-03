const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/userModel");
const {addExpBadge} =require("../utils/BadgeFunctions"); 

//@desc create a new user
//@route POST /user/auth/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const profilePic = req.file.filename;
  const { userName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!userName || !email || !password) {
    return res.status(400).json({ msg: "Please fill all the fields" });
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ msg: "Admin already exists" });
  }

  const newUser = await User.create({
    userName,
    email,
    password: hashedPassword,
    profilePic,
  });

  if (newUser) {
    res.status(201).json({ msg: "User created successfully" });
  } else {
    res.status(400).json({ msg: "Something went wrong" });
  }
});

//@desc login a admin
//@route POST /user/auth/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please fill all the fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  } else if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: "Invalid password" });
  } else {
    //?adding badges & increasing experience level
    const newExperience = user.experience + 5;
    addExpBadge(user._id);
    const response = await User.findByIdAndUpdate(
      user._id,
      {
        experience: newExperience,
      },
      { new: true }
    );

    const token = jwt.sign(
      {
        user: {
          id: user.id,
          userName: user.userName,
          email: user.email,
        },
      },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );
    res.status(200).json(response);
  }
});

//@desc delete a challenge
//@route DELETE /user/id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "user not found" });
  }
  const response = await User.deleteOne({ _id: req.params.id });

  res.status(200).json(response);
});

//@desc update a challenge
//@route PUT /user/id
//@access private
const updateUser = asyncHandler(async (req, res) => {
  const { userName } = req.body;
  const profilePic = req.file?.filename;

  if (!userName) {
    return res.status(400).json({ msg: "Please fill all the fields..." });
  }
  let user;
  if (profilePic) {
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        userName,
        profilePic,
      },
      { new: true }
    );
  } else {
    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        userName,
      },
      { new: true }
    );
  }
  if (!user) {
    return res.status(404).json({ msg: "no such user" });
  }
  return res.status(200).json(user);
});

//@desc get all users availabe for only admin service
//@route PUT /user/getAllUsers
//@access private
const getAllUsers = asyncHandler(async (req, res) => {
  const data = await User.find({}, "-password -experience -__v -badges");
  if (!data) {
    res.status(404).json({ msg: "Something went wrong" });
  }
  res.status(200).json(data);
});

//@desc get all users availabe for only admin service
//@route PUT /user/getAllUsers
//@access private
const getUserCount = asyncHandler(async (req, res) => {
  const userCount = await User.estimatedDocumentCount();

  if (!userCount) return res.status(400).send({ message: "bad request" });

  res.status(200).json({ userCount: userCount });
});

const getUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).send({ message: "user not found" });
  }

  return res.status(200).json({ message: "user" });
});

//?experience based badges


module.exports = {
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserCount,
  getUser,
};
