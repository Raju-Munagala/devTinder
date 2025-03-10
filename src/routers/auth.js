const express = require("express");
const authRouter = express.Router(); 
const User = require("../models/user.js")
const bcrypt = require("bcrypt");
const {userSignUpValidation} = require("../utils/validation.js");


authRouter.post("/signup",async (req,res)=>{
    
    try{
        userSignUpValidation(req);
        const{firstName,lastName,emailId,password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });
        await user.save();
        res.send("user added successfullt");
    }
    catch(error){
        res.status(500).send("Error: "+error.message);
    }
    
});

authRouter.post("/login",async (req,res)=>{
    const {emailId, password} = req.body;
    try{
        const user = await User.findOne({emailId});
        if(!user){
            throw new Error("invalid credentials")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error("invalid credentials");
        }
        else{
            const token = await user.getJWT();
            res.cookie("token",token,{expires:
                new Date(Date.now()+5*86400000)
            });
            res.send(user);
        }
    }catch(error){
        res.status(400).send("error: "+error.message);
    }
});

authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    });
    res.send("user logged out successfully");
});

module.exports = authRouter;