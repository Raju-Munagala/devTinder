const mongoose = require("mongoose");


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
        trim: true
    },
    password: {
        type:String,
        required: true,
        minLength: 5,
        maxLength: 50
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

const User = mongoose.model("user", userSchema);

module.exports = User;