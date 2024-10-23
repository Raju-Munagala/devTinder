const express = require("express");
const requestRouter = express.Router()
const User = require("../models/user.js")

requestRouter.get("/feed", async (req,res)=>{
    const feed = await User.find({});
    try{
        res.send(feed);
    }
    catch(error){
        res.status(400).send("something went wrong");
    }
});

module.exports = requestRouter;