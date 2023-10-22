const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//@desc Register new user
//@route POST /api/auth
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        res.status(400).send({message: "Please enter all fields"});
        return;
    }
    const user = await User.findOne({email});
    if (user) {
        res.status(400).send({message: "User already exists"});
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(newUser);
    if (newUser) {
        res.status(201).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateJWT(newUser._id),
        });
    } else {
        res.status(400).send({message: "Something went wrong"});
    }
    return;
});

//@desc Login user
//@route POST /api/auth/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400).send({message: "Please enter all fields"});
        return;
    }
    const user = await User.findOne({email});
    if (!user) {
        res.status(400).send({message: "User not found"});
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).send({message: "Invalid password"});
        return;
    }
    res.status(200).json({id: user._id, username: user.username, email: user.email, token: generateJWT(user._id)});
    return;
});

//@desc Get user data
//@route GET /api/auth/me
//@access Public
const getMe = asyncHandler(async (req, res) => {
    const {_id, username, email} = await User.findById(req.user.id);
    res.status(200).json({id: _id, username, email});
});

const generateJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
};

module.exports = {registerUser, loginUser, getMe};
