const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName: {
        type:String
    },
    lastName: {
        type:String
    },
    gender: {
        type:String
    },
    age: {
        type:Number
    },
    emailId: {
        type:String
    },
    password: {
        type:String
    }
});

const User = mongoose.model("user", userSchema);

module.exports = User;