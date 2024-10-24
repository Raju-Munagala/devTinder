const express = require("express");
const userRouter = express.Router()
const User = require("../models/user.js");
const {userAuth} = require("../middleware/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const { ConnectionStates } = require("mongoose");

userRouter.get("/user/requests",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        console.log(loggedInUser._id);
        const requestsRecieved = await ConnectionRequest.find({
            toUserId:loggedInUser._id,
            connectionStatus: "interested"
        }).populate("fromUserId","firstName lastName");
        console.log(requestsRecieved);
        if(requestsRecieved.length===0){
            return res.send("no connection requests recieved");
        }
        res.json({
            message:"data fetched successfully",
            data: requestsRecieved
        })
    }catch(error){
        res.status(400).send("error: "+error.message);
    }    
});

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser = req.user;
        
        const userConnections =await ConnectionRequest.find({
            $or: [
                {fromUserId:loggedInUser._id,connectionStatus:"accepted"},
                {toUserId:loggedInUser._id,connectionStatus:"accepted"}
            ]
        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");
        
        const data = userConnections.map(connection=>{
            if(connection.fromUserId.toString()===loggedInUser._id.toString()){
                return connection.toUserId;
            }
            return connection.fromUserId;
        });

        res.json({
            message:"these are your connections",
            data
        })

    }catch(error){
        res.status(400).send("Error: "+error.message);
    }
});


userRouter.get("/user/feed",userAuth, async (req,res)=>{
    try{
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50?50:limit;
        const skip = (page-1)*limit;

        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("fromUserId toUserId");
        console.log(connectionRequests);

        const ignoreUsers = new Set();
        connectionRequests.forEach(connection => {
            ignoreUsers.add(connection.fromUserId.toString());
            ignoreUsers.add(connection.toUserId.toString());
        });


        const feedUsers = await User.find({
            $and:[
                {_id: {$nin: Array.from(ignoreUsers)}},
                {_id: {$ne: loggedInUser._id}}
            ]
            
        }).select("firstName lastName").skip(skip).limit(limit);

        if(feedUsers.length===0){
            throw new Error("no feed available");
        }

        res.send(feedUsers);

    }
    catch(error){
        res.status(400).send("Error: "+error.message);
    }
});

module.exports = userRouter;