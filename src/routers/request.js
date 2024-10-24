const express = require("express");
const {userAuth} = require("../middleware/auth.js");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const requestRouter = express.Router();

requestRouter.post("/connection/send/:status/:userId",userAuth,async (req,res)=>{
    
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.userId;
        const connectionStatus = req.params.status;
        if(connectionStatus!="interested" && connectionStatus!="ignored"){
            throw new Error("Invalid Request");
        }
        
        const existingRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId,toUserId},
                {fromUserId: toUserId,toUserId: fromUserId}
            ]    
        });

        if(existingRequest){
            throw new Error("connection already sent");
        }

        const toUser = await User.findOne({_id:toUserId});

        if(!toUser){
            throw new Error("user not found");
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            connectionStatus
        });
        const data = await connectionRequest.save();
        res.json({
            message:"request send successfully",
            data
        });
    }catch(error){
        res.status(400).send("error: "+error.message);
    }
});


requestRouter.post("/connection/recieved/:status/:requestId",userAuth,async (req,res)=>{
    try{
        const presentUser = req.user;
        const {status,requestId} = req.params;

        const validRequests = ["accepted","rejected"];

        if(!validRequests.includes(status)){
            throw new Error("request not valid");
        }

        const connectionRequest = await ConnectionRequest.findOne({
            _id:requestId,
            toUserId:presentUser._id,
            connectionStatus:"interested"
        });

        if(!connectionRequest){
            throw new Error("request not found");
        }

        connectionRequest.connectionStatus = status;
        const data = await connectionRequest.save();
        res.json({
            message:`request ${status} successfully`,
            data
        });
    }catch(error){
        res.send("error: "+error.message);
    }
});

module.exports = requestRouter;