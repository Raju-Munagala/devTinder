const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js")
const app = express();

app.post("/signup",async (req,res)=>{
    const userData = {
        firstName:"satya",
        lastName:"nallam",
        emailId:"satya@gmail.com",
        password:"satya123"
    };
    const user = new User(userData);
    try{
        await user.save();
        res.send("user added successfullt");
    }
    catch(error){
        res.status(500).send("something went wrong");
    }
    
})

connectDB()
    .then(()=>{
        console.log("connection successfully done");
        app.listen(3333, ()=>{
            console.log("server is successfully listening...");
        });
    })
    .catch((error)=>{
        console.log("database not connected")
    });
