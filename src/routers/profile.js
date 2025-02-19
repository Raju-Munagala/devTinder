const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth.js");
const {validateUserEditData} = require("../utils/validation.js");

profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }catch(error){
        res.status(400).send("error: "+error.message);
    }
});

profileRouter.put("/profile/edit",userAuth,async (req,res)=>{
    try{
        if(!validateUserEditData(req)){
            throw new Error("invalid edit operation");
        }
        const updatableUser = req.user;
        Object.keys(req.body).forEach(key=>updatableUser[key]=req.body[key]); 
        await updatableUser.save()
        res.json({
            message:"user data updated successfully",
            user: updatableUser
        });
    }
    catch(error){
        res.status(400).send("Error: "+error.message);
    }
});

profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
    try{
        const {password} = req.body;
        const user = req.user;
        user[password] = password;
        await user.save();
        res.json({
            message:"password changed successfully",
            user: user
        });
    }catch(error){
        res.status(400).send("error: "+error.message);
    }
});

module.exports = profileRouter;