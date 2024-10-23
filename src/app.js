const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js")
const app = express();
const bcrypt = require("bcrypt");
const validator = require("./utils/validation.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middleware/auth.js")

app.use(express.json());
app.use(cookieParser());

app.post("/signup",async (req,res)=>{
    
    try{
        validator(req);
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

app.post("/login",async (req,res)=>{
    const {emailId, password} = req.body;
    try{
        const user = await User.findOne({emailId});
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!user){
            throw new Error("invalid credentials")
        }
        if(!isPasswordValid){
            throw new Error("invalid credentials");
        }
        else{
            const token = await user.getJWT();
            res.cookie("token",token,{expires:
                new Date(Date.now()+8*3600000)
            });
            res.send("login successful");
        }
    }catch(error){
        res.status(400).send("error: "+error.message);
    }
});

app.get("/profile",userAuth, async (req,res)=>{
    try{
        const user = req.user;
        
        res.send(user);
    }catch(error){
        res.status(400).send("error: "+error.message);
    }
    
});

app.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    const user = await User.find({emailId:userEmail});
    try{
        res.send(user);
    }
    catch(error){
        res.status(400).send("something went wrong");
    }
});

app.get("/feed", async (req,res)=>{
    const feed = await User.find({});
    try{
        res.send(feed);
    }
    catch(error){
        res.status(400).send("something went wrong");
    }
});

app.delete("/user",async (req,res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user deleted successfully");
    }catch(error){
        res.status(400).send("something went wrong");
    }
});

app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params?.userId;
    const user = req.body;
    try{
        const updatableData = ["firstName","lastName","age","gender","about","skills"];
        const isUpdateAllowed = Object.keys(user).every((k)=>updatableData.includes(k));
        if(!isUpdateAllowed){
            throw new Error("update not allowed");
        }
        if(user.skills.length>10){
            throw new Error("max skills:10");
        }
        const updatedUser = await User.findByIdAndUpdate(userId,user,{runValidators:true}); 
        res.send("user updated successfully");
    }catch(error){
        res.status(400).send("something went wrong"+error.message);
    }
});

connectDB()
    .then(()=>{
        console.log("connection successfully done");
        app.listen(3333, ()=>{
            console.log("server is successfully listening...");
        });
    })
    .catch((error)=>{
        console.log(error.message)
    });
