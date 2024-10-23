const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true,
        minLength: 3,
        maxLenght: 50
    },
    lastName: {
        type:String,
        minLength: 3,
        maxLength: 50
    },
    gender: {
        type:String,
        minLength: 3,
        maxLenght: 50,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("enter valid gender");
            }
        }
    },
    age: {
        type:Number,
        min: 18,
        max: 100
    },
    emailId: {
        type:String,
        required: true,
        unique: true,
        minLength: 10,
        maxLenght: 100,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("enter valid email")
            }
        }
    },
    password: {
        type:String,
        required: true,
        minLength: 5,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter strong password");
            }
        }
    },
    skills: {
        type: [String],
    },
    about:{
        type:String,
        default: "it's about section"
    }
},{
    timestamps: true
});

userSchema.methods.getJWT = async function(){
    const user = this;
    const token = await jwt.sign({_id: user._id},"devTinder@123",{expiresIn:"1h"});
    return token;
}


const User = mongoose.model("user", userSchema);

module.exports = User;