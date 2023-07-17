const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
//desc Register a user
//desc POST /api/users/register
//access public
const registerUser = asyncHandler(async (req,res) =>{
    const {username , email , password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All firlds are mandatory");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400).json({message: "User already registered"});
    }
    else{
    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password: ",hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log("User Created: ",user);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400);
        throw new Error("User data not valid");
    }
    res.json({message: "Register the user"});
}
});

//desc Login a user
//desc POST /api/users/login
//access public
const loginUser = asyncHandler(async (req,res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({messgae: "All fields are mandotory"});
    }
    const user = await User.findOne({email});
    //compare password with hash password
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
        );
        res.status(200).json({ accessToken });
    }
    else{
        res.status(401).json({ message: "Email or Password is invalid"});
    }
});

//desc current user info
//desc GET /api/users/current
//access private
const currentUser = asyncHandler(async (req,res) =>{
    res.json(req.user);
});



module.exports = { registerUser , loginUser , currentUser };