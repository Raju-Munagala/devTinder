const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js")
const app = express();

app.use(express.json());

app.post("/signup",async (req,res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.send("user added successfullt");
    }
    catch(error){
        res.status(500).send("something went wrong"+error.message);
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

app.patch("/user",async (req,res)=>{
    const userId = req.body.userId;
    const user = req.body;
    try{
        const updatedUser = await User.findByIdAndUpdate(userId,user,{runValidators:true}); 
        res.send("user updated successfully");
    }catch(error){
        res.status(400).send("something went wrong");
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
