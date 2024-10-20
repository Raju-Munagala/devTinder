const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect(
        "mongodb+srv://raju:LkYp1oIZMLQIP6so@learnmongodb.xghca.mongodb.net/devTinder"
    );
};

module.exports = connectDB;