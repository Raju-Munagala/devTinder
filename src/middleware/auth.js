const jwt = require("jsonwebtoken");
const User = require("../models/user.js");


const userAuth = async (req,res,next)=>{
    try{
        const cookie = req.cookies;
        const {token} = cookie;
        if(!token){
            throw new Error("no token");
        }
        const decoded = await jwt.verify(token,"devTinder@123");
        const {_id} = decoded;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("user not found");
        }
        req.user = user;
        next();
    }catch(error){
        res.status(400).send("error :"+error.message);
    }
    
};

module.exports = {userAuth};