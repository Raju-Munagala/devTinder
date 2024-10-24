const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true
    },
    toUserId:{
        type: mongoose.Schema.ObjectId,
        ref:"user",
        required: true
    },
    connectionStatus:{
        type: String,
        required: true,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message: "{VALUE} is invalid"
        }
    }
},{timestamps:true})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("invalid request");
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;
